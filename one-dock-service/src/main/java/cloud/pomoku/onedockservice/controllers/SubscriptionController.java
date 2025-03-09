package cloud.pomoku.onedockservice.controllers;

import cloud.pomoku.onedockservice.dto.requests.CreateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.requests.UpdateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.responses.PageResponse;
import cloud.pomoku.onedockservice.dto.responses.SubscriptionResponse;
import cloud.pomoku.onedockservice.services.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<PageResponse<SubscriptionResponse>> getAllSubscriptions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "asc") String sortType
    ) {
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(sortType) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "price"));

        Page<SubscriptionResponse> subscriptionsPage = subscriptionService.getAllSubscriptions(pageable);
        PageResponse<SubscriptionResponse> response = new PageResponse<>(subscriptionsPage);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionResponse> getSubscriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.getSubscription(id));
    }

    @PostMapping
    public ResponseEntity<SubscriptionResponse> createSubscription(
            @Valid @RequestBody CreateSubscriptionRequest request
    ) {
        return ResponseEntity.ok(subscriptionService.createSubscription(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionResponse> updateSubscription(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSubscriptionRequest request
    ) {
        return ResponseEntity.ok(subscriptionService.updateSubscription(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }
}
