package cloud.pomoku.fileservice.exceptions.validation;

import cloud.pomoku.fileservice.exceptions.AppException;
import org.springframework.http.HttpStatus;

public class FileExtensionValidationException extends AppException {
    public FileExtensionValidationException(String extension) {
        super(HttpStatus.BAD_REQUEST, "Invalid file extension: " + extension);
    }
}
