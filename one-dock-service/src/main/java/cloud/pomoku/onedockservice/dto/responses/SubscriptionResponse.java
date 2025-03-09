package cloud.pomoku.onedockservice.dto.responses;

import cloud.pomoku.onedockservice.enumerated.BillingCycleType;
import cloud.pomoku.onedockservice.enumerated.SubscriptionStatus;

import java.time.LocalDate;

public record SubscriptionResponse(
        String name,
        double price,
        BillingCycleType billingCycle,
        LocalDate nextBillingDate,
        SubscriptionStatus status,
        Long categoryId
) {
}
