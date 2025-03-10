package cloud.pomoku.fileservice.dto.responses;

import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

public record FileDTO(
        String originalFilename,
        String contentType,
        long size,
        StreamingResponseBody stream
) {
}
