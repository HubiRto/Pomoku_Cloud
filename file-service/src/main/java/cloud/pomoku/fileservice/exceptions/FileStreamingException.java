package cloud.pomoku.fileservice.exceptions;

import org.springframework.http.HttpStatus;

import java.nio.file.Path;

public class FileStreamingException extends FileException {
    public FileStreamingException(Path path) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "Error while streaming file: %s", path);
    }
}
