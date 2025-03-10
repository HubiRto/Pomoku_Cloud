package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

import java.nio.file.Path;

public class FileNotFoundException extends FileException {
    public FileNotFoundException(Path path) {
        super(HttpStatus.NOT_FOUND, "File not found: %s", path);
    }
}
