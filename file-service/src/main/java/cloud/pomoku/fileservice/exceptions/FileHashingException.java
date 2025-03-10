package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

public class FileHashingException extends AppException {
    public FileHashingException(String filename) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to generated hash for file: " + filename);
    }
}
