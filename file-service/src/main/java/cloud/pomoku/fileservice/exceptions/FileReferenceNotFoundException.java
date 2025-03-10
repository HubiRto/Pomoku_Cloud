package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

import java.util.UUID;

public class FileReferenceNotFoundException extends AppException {
    public FileReferenceNotFoundException(UUID id) {
        super(HttpStatus.NOT_FOUND, "File reference with id: %s not found".formatted(id));
    }
}
