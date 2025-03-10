package cloud.pomoku.fileservice.mappers;

import cloud.pomoku.fileservice.dto.responses.FileDTO;
import cloud.pomoku.fileservice.entites.FileMetadata;
import cloud.pomoku.fileservice.exceptions.FileNotFoundException;
import cloud.pomoku.fileservice.exceptions.FileNotReadableException;
import cloud.pomoku.fileservice.exceptions.FileStreamingException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Mapper(componentModel = "spring")
public interface FileMapper {
    @Mapping(target = "originalFilename", source = "metadata.originalFilename")
    @Mapping(target = "contentType", source = "metadata.contentType")
    @Mapping(target = "size", source = "metadata.size")
    @Mapping(target = "stream", expression = "java(createStreamingResponseBody(metadata, storageLocation))")
    FileDTO toDto(FileMetadata metadata, @Context Path storageLocation);

    default StreamingResponseBody createStreamingResponseBody(FileMetadata metadata, Path storageLocation) {
        Path filePath = storageLocation.resolve(metadata.getRelativePath());

        if (!Files.exists(filePath)) {
            throw new FileNotFoundException(filePath);
        }

        if (!Files.isReadable(filePath)) {
            throw new FileNotReadableException(filePath);
        }

        return outputStream -> {
            try (FileInputStream inputStream = new FileInputStream(filePath.toFile())) {
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                    outputStream.flush();
                }
            }catch (IOException ex) {
                throw new FileStreamingException(filePath);
            }
        };
    }
}
