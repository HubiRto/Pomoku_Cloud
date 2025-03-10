package cloud.pomoku.fileservice.exceptions;

public class InvalidHashException extends RuntimeException {
    public InvalidHashException(String message) {
        super(message);
    }
}
