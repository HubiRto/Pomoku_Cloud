package cloud.pomoku.onedockservice.services;

import cloud.pomoku.onedockservice.dto.requests.CreateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.requests.UpdateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.responses.SubscriptionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscriptionService {
    SubscriptionResponse createSubscription(CreateSubscriptionRequest request);
    Page<SubscriptionResponse> getAllSubscriptions(Pageable pageable);
    SubscriptionResponse getSubscription(Long id);
    SubscriptionResponse updateSubscription(Long id, UpdateSubscriptionRequest request);
    void deleteSubscription(Long id);
}
