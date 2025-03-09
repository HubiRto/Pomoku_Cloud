import {DashboardLayout} from "@/components/DashboardLayout";
import {SubscriptionManager} from "@/components/SubscriptionManager";

export default function SubscriptionsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Subscription Manager</h1>
                    <p className="text-muted-foreground">Track and manage your recurring subscriptions</p>
                </div>
                <SubscriptionManager />
            </div>
        </DashboardLayout>
    )
}
