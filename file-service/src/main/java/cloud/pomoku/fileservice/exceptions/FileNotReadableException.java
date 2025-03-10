package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

import java.nio.file.Path;

public class FileNotReadableException extends FileException {
    public FileNotReadableException(Path path) {
        super(HttpStatus.FORBIDDEN, "File cannot be read (insufficient permissions): %s", path);
    }
}
