import type React from "react"
import Link from "next/link"
import {
    CheckSquare,
    Server,
    CreditCard,
    Calendar,
    Users,
    BarChart,
    FileText,
    MessageSquare,
    Mail,
    ShoppingCart,
    Lock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AppCard {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    color: string
}

const apps: AppCard[] = [
    {
        title: "Todo App",
        description: "Manage your tasks and stay organized",
        icon: <CheckSquare className="h-8 w-8" />,
        href: "/todo",
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Server Manager",
        description: "Monitor and manage your servers",
        icon: <Server className="h-8 w-8" />,
        href: "/servers",
        color: "bg-green-500/10 text-green-500",
    },
    {
        title: "Subscription Manager",
        description: "Track your recurring payments",
        icon: <CreditCard className="h-8 w-8" />,
        href: "/subscriptions",
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Password Manager",
        description: "Securely store and manage passwords",
        icon: <Lock className="h-8 w-8" />,
        href: "/passwords",
        color: "bg-red-500/10 text-red-500",
    },
    {
        title: "Calendar",
        description: "Schedule and manage your events",
        icon: <Calendar className="h-8 w-8" />,
        href: "/calendar",
        color: "bg-orange-500/10 text-orange-500",
    },
    {
        title: "Team Management",
        description: "Manage your team members and roles",
        icon: <Users className="h-8 w-8" />,
        href: "/team",
        color: "bg-pink-500/10 text-pink-500",
    },
    {
        title: "Analytics",
        description: "View insights and performance metrics",
        icon: <BarChart className="h-8 w-8" />,
        href: "/analytics",
        color: "bg-yellow-500/10 text-yellow-500",
    },
    {
        title: "Notes",
        description: "Take and organize your notes",
        icon: <FileText className="h-8 w-8" />,
        href: "/notes",
        color: "bg-emerald-500/10 text-emerald-500",
    },
    {
        title: "Chat",
        description: "Communicate with your team",
        icon: <MessageSquare className="h-8 w-8" />,
        href: "/chat",
        color: "bg-teal-500/10 text-teal-500",
    },
    {
        title: "Email",
        description: "Manage your emails in one place",
        icon: <Mail className="h-8 w-8" />,
        href: "/email",
        color: "bg-indigo-500/10 text-indigo-500",
    },
    {
        title: "E-commerce",
        description: "Manage your online store",
        icon: <ShoppingCart className="h-8 w-8" />,
        href: "/ecommerce",
        color: "bg-cyan-500/10 text-cyan-500",
    },
]

export function AppGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apps.map((app) => (
                <Link key={app.href} href={app.href}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <CardHeader className="pb-2">
                            <div className={`w-fit rounded-md p-2 ${app.color}`}>{app.icon}</div>
                            <CardTitle className="mt-2">{app.title}</CardTitle>
                            <CardDescription>{app.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">Click to open</div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

