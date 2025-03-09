package cloud.pomoku.onedockservice.entities;

import cloud.pomoku.onedockservice.enumerated.BillingCycleType;
import cloud.pomoku.onedockservice.enumerated.SubscriptionStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Subscription name is required")
    @Size(min = 2, max = 100, message = "Subscription name must be between 2 and 100 characters")
    private String name;

    @Positive(message = "Price must be greater than zero")
    private double price;

    @NotNull(message = "Billing cycle is required")
    private BillingCycleType billingCycle;

    @Future(message = "Next billing date must be in the future")
    private LocalDate nextBillingDate;

    @NotNull(message = "Subscription status is required")
    private SubscriptionStatus status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Category is required")
    private SubscriptionCategory category;
}
