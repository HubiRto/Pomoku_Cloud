package cloud.pomoku.onedockservice.dto.requests;

import cloud.pomoku.onedockservice.enumerated.BillingCycleType;
import cloud.pomoku.onedockservice.enumerated.SubscriptionStatus;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CreateSubscriptionRequest(
        @NotBlank(message = "Subscription name is required")
        @Size(min = 2, max = 100, message = "Subscription name must be between 2 and 100 characters")
        String name,
        @NotNull(message = "Price is required")
        @Positive(message = "Price must be greater than zero")
        double price,
        @NotNull(message = "Billing cycle is required")
        BillingCycleType billingCycle,
        @NotBlank(message = "Category name is required")
        @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
        String categoryName,
        @Future(message = "Next billing date must be in the future")
        LocalDate nextBillingDate,
        @NotNull(message = "Subscription status is required")
        SubscriptionStatus status
) {
}
