package cloud.pomoku.onedockservice.dto.responses;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public record ErrorResponse(String error, LocalDateTime timestamp, Map<String, ?> details) {
    public ErrorResponse(String error) {
        this(error, LocalDateTime.now(), new HashMap<>());
    }
}
