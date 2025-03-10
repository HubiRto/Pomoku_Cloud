package cloud.pomoku.fileservice.services;

import cloud.pomoku.fileservice.config.FileStorageProperties;
import cloud.pomoku.fileservice.dto.responses.FileDTO;
import cloud.pomoku.fileservice.entites.FileMetadata;
import cloud.pomoku.fileservice.entites.FileReference;
import cloud.pomoku.fileservice.exceptions.FileReferenceNotFoundException;
import cloud.pomoku.fileservice.exceptions.FileStorageException;
import cloud.pomoku.fileservice.mappers.FileMapper;
import cloud.pomoku.fileservice.repository.FileMetadataRepository;
import cloud.pomoku.fileservice.repository.FileReferenceRepository;
import cloud.pomoku.fileservice.utils.HashGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final FileMetadataRepository fileMetadataRepository;
    private final FileReferenceRepository fileReferenceRepository;
    private final FileStorageProperties fileStorageProperties;
    private final FileMapper fileMapper;

    @Value("${file.base-url}")
    private String fileBaseUrl;

    private Path getFileStorageLocation() {
        Path fileStorageLocation = Paths.get(fileStorageProperties.getLocation()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(fileStorageLocation);
            return fileStorageLocation;
        } catch (IOException ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored");
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new FileStorageException("Failed to store empty file");
            }

            String originalFilename = StringUtils.cleanPath(Optional.ofNullable(file.getOriginalFilename()).orElse("unknown"));

            if (originalFilename.contains("..")) {
                throw new FileStorageException("Filename contains invalid path sequence: " + originalFilename);
            }

            String fileHash = HashGenerator.generateHash(file);

            Optional<FileMetadata> fileMetadata = fileMetadataRepository.findByHash(fileHash);
            if (fileMetadata.isPresent()) {
                FileReference reference = fileReferenceRepository.save(new FileReference(fileMetadata.get()));
                return fileBaseUrl + "/" + reference.getId();
            }

            String relativePath = HashGenerator.generatePathFromHash(
                    fileHash,
                    fileStorageProperties.getHashSections(),
                    fileStorageProperties.getSectionSize()
            );

            Path targetLocation = getFileStorageLocation().resolve(relativePath);
            Files.createDirectories(targetLocation.getParent());
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            FileMetadata metadata = FileMetadata.builder()
                    .originalFilename(originalFilename)
                    .contentType(file.getContentType())
                    .hash(fileHash)
                    .uploadedAt(LocalDateTime.now())
                    .relativePath(relativePath)
                    .size(file.getSize())
                    .build();

            metadata = fileMetadataRepository.save(metadata);
            FileReference reference = fileReferenceRepository.save(new FileReference(metadata));
            return fileBaseUrl + "/" + reference.getId();
        } catch (IOException ex) {
            throw new FileStorageException("Failed to store file");
        }
    }

    public FileDTO getFile(UUID fileReferenceId) {
        FileReference fileReference = fileReferenceRepository.findById(fileReferenceId)
                .orElseThrow(() -> new FileReferenceNotFoundException(fileReferenceId));

        FileMetadata metadata = fileReference.getFileMetadata();
        return fileMapper.toDto(metadata, getFileStorageLocation());
    }

    public void deleteFile(UUID fileReferenceId) {
        FileReference fileReference = fileReferenceRepository.findById(fileReferenceId)
                .orElseThrow(() -> new FileReferenceNotFoundException(fileReferenceId));

        FileMetadata metadata = fileReference.getFileMetadata();
        String fileHash = metadata.getHash();

        fileReferenceRepository.deleteById(fileReferenceId);

        long remainingReferences = fileReferenceRepository.countByFileMetadataHash(fileHash);

        if (remainingReferences == 0) {
            Path parent = getFileStorageLocation().resolve(metadata.getRelativePath()).getParent();
            while (parent != null && !parent.equals(getFileStorageLocation())) {
                try (Stream<Path> entries = Files.list(parent)) {
                    if (entries.findFirst().isEmpty()) {
                        Files.delete(parent);
                        parent = parent.getParent();
                    } else {
                        break;
                    }
                } catch (IOException e) {
                    break;
                }
            }
            fileMetadataRepository.deleteById(metadata.getId());
        }
    }
}
