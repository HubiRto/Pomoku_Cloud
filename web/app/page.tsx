import {DashboardLayout} from "@/components/DashboardLayout";
import {AppGrid} from "@/components/AppGrid";
import {Toaster} from "sonner";

export default function Home() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome to your multi-application dashboard. Access all your tools in one place.
                    </p>
                </div>
                <AppGrid />
                <Toaster/>
            </div>
        </DashboardLayout>
    );
}
