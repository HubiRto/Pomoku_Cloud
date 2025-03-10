package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

public class FileStorageException extends AppException {
    public FileStorageException(String message) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}
