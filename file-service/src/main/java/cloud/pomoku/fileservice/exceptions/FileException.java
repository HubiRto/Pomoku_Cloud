package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

import java.nio.file.Path;

public class FileException extends AppException {
    public FileException(HttpStatus status, String message, Path path) {
        super(status, message.formatted(path));
    }
}
