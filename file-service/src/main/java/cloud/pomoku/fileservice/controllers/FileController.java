package cloud.pomoku.fileservice.controllers;

import cloud.pomoku.fileservice.annotations.ValidConfigurableFile;
import cloud.pomoku.fileservice.dto.responses.FileDTO;
import cloud.pomoku.fileservice.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.UUID;

@RequestMapping("/api/v1/files")
@RestController
@RequiredArgsConstructor
@Validated
public class FileController {
    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @ValidConfigurableFile
            @RequestParam(value = "file") MultipartFile file
    ) {
        return ResponseEntity.ok(fileStorageService.storeFile(file));
    }


    @GetMapping("/{id}")
    public ResponseEntity<StreamingResponseBody> downloadFile(
            @PathVariable UUID id,
            @RequestParam(required = false) boolean inline
    ) {
        FileDTO dto = fileStorageService.getFile(id);

        String contentDisposition = inline
                ? "inline; filename=\"" + dto.originalFilename() + "\""
                : "attachment; filename=\"" + dto.originalFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dto.contentType()))
                .contentLength(dto.size())
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(dto.stream());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable UUID id) {
        fileStorageService.deleteFile(id);
        return ResponseEntity.ok().build();
    }
}
