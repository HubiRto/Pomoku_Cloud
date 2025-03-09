"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {CheckSquare, CreditCard, Home, Menu, Moon, Server, Settings, Sun, X,} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useTheme} from "next-themes";

interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: <Home className="h-5 w-5"/>,
    },
    {
        title: "Todo App",
        href: "/todo",
        icon: <CheckSquare className="h-5 w-5"/>,
    },
    {
        title: "Server Manager",
        href: "/servers",
        icon: <Server className="h-5 w-5"/>,
    },
    {
        title: "Subscriptions",
        href: "/subscriptions",
        icon: <CreditCard className="h-5 w-5"/>,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: <Settings className="h-5 w-5"/>,
    },
]

export function DashboardLayout({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-background lg:hidden">
                <div className="flex h-16 items-center justify-between px-4">
                    <Link href="/public" className="flex items-center gap-2 font-semibold">
                        <Server className="h-6 w-6"/>
                        <span>Multi-App Dashboard</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                    </Button>
                </div>
            </header>

            <div className="flex flex-1">
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform lg:static lg:translate-x-0",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <div className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b px-6 lg:h-[61px]">
                        <Link href="/public" className="flex items-center gap-2 font-semibold">
                            <Server className="h-6 w-6"/>
                            <span>Multi-App Dashboard</span>
                        </Link>
                    </div>
                    <nav className="flex-1 overflow-auto py-6 px-3">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                        pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <div className="sticky bottom-0 border-t bg-background p-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User"/>
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium">User Name</span>
                                <span className="text-xs text-muted-foreground">user@example.com</span>
                            </div>
                            <Button variant="ghost" size="icon"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                            </Button>
                        </div>
                    </div>
                </aside>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}