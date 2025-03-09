package cloud.pomoku.onedockservice.exception;

import org.springframework.http.HttpStatus;

public class SubscriptionNotFound extends AppException {
    public SubscriptionNotFound(Long id) {
        super(HttpStatus.NOT_FOUND, "Subscription with id " + id + " not found");
    }
}
