package cloud.pomoku.fileservice.exceptions.validation;

import cloud.pomoku.fileservice.exceptions.AppException;
import org.springframework.http.HttpStatus;

public class FileTypeValidationException extends AppException {
    public FileTypeValidationException(String contentType) {
        super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Invalid file type: " + contentType);
    }
}
