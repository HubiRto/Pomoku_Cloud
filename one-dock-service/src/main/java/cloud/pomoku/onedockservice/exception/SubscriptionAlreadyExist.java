package cloud.pomoku.onedockservice.exception;

import org.springframework.http.HttpStatus;

public class SubscriptionAlreadyExist extends AppException {
    public SubscriptionAlreadyExist() {
        super(HttpStatus.CONFLICT, "Subscription already exist");
    }
}
