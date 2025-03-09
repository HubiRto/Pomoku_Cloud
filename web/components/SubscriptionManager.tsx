"use client"

import {useState} from "react"
import {ArrowUpDown, Calendar, CreditCard, DollarSign, Edit2, MoreHorizontal, Plus, Trash2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {toast} from "sonner";

interface Subscription {
    id: string
    name: string
    provider: string
    price: number
    billingCycle: "monthly" | "yearly" | "quarterly"
    category: string
    nextBillingDate: string
    status: "active" | "canceled" | "trial"
}

const subscriptionData: Subscription[] = [
    {
        id: "sub-1",
        name: "Netflix Premium",
        provider: "Netflix",
        price: 19.99,
        billingCycle: "monthly",
        category: "Entertainment",
        nextBillingDate: "2023-04-15",
        status: "active",
    },
    {
        id: "sub-2",
        name: "Spotify Family",
        provider: "Spotify",
        price: 14.99,
        billingCycle: "monthly",
        category: "Music",
        nextBillingDate: "2023-04-20",
        status: "active",
    },
    {
        id: "sub-3",
        name: "Adobe Creative Cloud",
        provider: "Adobe",
        price: 52.99,
        billingCycle: "monthly",
        category: "Productivity",
        nextBillingDate: "2023-04-05",
        status: "active",
    },
    {
        id: "sub-4",
        name: "Microsoft 365",
        provider: "Microsoft",
        price: 99.99,
        billingCycle: "yearly",
        category: "Productivity",
        nextBillingDate: "2023-10-12",
        status: "active",
    },
    {
        id: "sub-5",
        name: "Amazon Prime",
        provider: "Amazon",
        price: 139,
        billingCycle: "yearly",
        category: "Shopping",
        nextBillingDate: "2023-08-23",
        status: "active",
    },
    {
        id: "sub-6",
        name: "Disney+",
        provider: "Disney",
        price: 7.99,
        billingCycle: "monthly",
        category: "Entertainment",
        nextBillingDate: "2023-04-18",
        status: "trial",
    },
    {
        id: "sub-7",
        name: "YouTube Premium",
        provider: "Google",
        price: 11.99,
        billingCycle: "monthly",
        category: "Entertainment",
        nextBillingDate: "2023-04-22",
        status: "canceled",
    },
]

// Categories for subscriptions
const categories = [
    "Entertainment",
    "Music",
    "Productivity",
    "Shopping",
    "Utilities",
    "Gaming",
    "News",
    "Health",
    "Education",
    "Other",
]

export function SubscriptionManager() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(subscriptionData)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

    // New subscription form state
    const [newSubscription, setNewSubscription] = useState({
        name: "",
        provider: "",
        price: "",
        billingCycle: "monthly" as const,
        category: "Entertainment",
        nextBillingDate: new Date().toISOString().split("T")[0],
        status: "active" as const,
    })

    const totalMonthly = subscriptions
        .filter((sub) => sub.status === "active")
        .reduce((total, sub) => {
            if (sub.billingCycle === "monthly") {
                return total + sub.price
            } else if (sub.billingCycle === "yearly") {
                return total + sub.price / 12
            } else if (sub.billingCycle === "quarterly") {
                return total + sub.price / 3
            }
            return total
        }, 0)

    const totalYearly = totalMonthly * 12

    const categoryCounts = subscriptions.reduce(
        (acc, sub) => {
            if (sub.status === "active") {
                acc[sub.category] = (acc[sub.category] || 0) + 1
            }
            return acc
        },
        {} as Record<string, number>,
    )

    const categoriesList = Object.keys(categoryCounts).sort()

    // Add new subscription
    const handleAddSubscription = () => {
        if (!newSubscription.name || !newSubscription.provider || !newSubscription.price) {
            toast("Missing information", {
                description: "Please fill in all required fields",
                duration: 3000,
            })
            return
        }

        const newEntry: Subscription = {
            id: `sub-${Date.now()}`,
            name: newSubscription.name,
            provider: newSubscription.provider,
            price: Number.parseFloat(newSubscription.price),
            billingCycle: newSubscription.billingCycle,
            category: newSubscription.category,
            nextBillingDate: newSubscription.nextBillingDate,
            status: newSubscription.status,
        }

        setSubscriptions([...subscriptions, newEntry])
        setShowAddDialog(false)
        resetNewSubscriptionForm()

        toast("Subscription added", {
            description: `${newSubscription.name} has been added to your subscriptions.`,
            duration: 3000,
        })
    }

    // Update existing subscription
    const handleUpdateSubscription = () => {
        if (!editingSubscription) return

        setSubscriptions(subscriptions.map((sub) => (sub.id === editingSubscription.id ? editingSubscription : sub)))

        setEditingSubscription(null)

        toast("Subscription updated", {
            description: `${editingSubscription.name} has been updated.`,
            duration: 3000,
        })
    }

    // Cancel subscription
    const cancelSubscription = (id: string) => {
        setSubscriptions(subscriptions.map((sub) => (sub.id === id ? {...sub, status: "canceled"} : sub)))

        toast("Subscription canceled", {
            description: "The subscription has been canceled.",
            duration: 3000,
        })
    }

    // Delete subscription
    const deleteSubscription = (id: string) => {
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id))

        toast("Subscription deleted", {
            description: "The subscription has been deleted.",
            duration: 3000,
        })
    }

    // Reset new subscription form
    const resetNewSubscriptionForm = () => {
        setNewSubscription({
            name: "",
            provider: "",
            price: "",
            billingCycle: "monthly",
            category: "Entertainment",
            nextBillingDate: new Date().toISOString().split("T")[0],
            status: "active",
        })
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalMonthly.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+4.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Yearly Spending</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalYearly.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Projected annual cost</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="text-2xl font-bold">{subscriptions.filter((sub) => sub.status === "active").length}</div>
                        <p className="text-xs text-muted-foreground">
                            {subscriptions.filter((sub) => sub.status === "trial").length} in trial
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categoriesList.length}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {categoriesList.map((category) => (
                                <Badge key={category} variant="secondary" className="text-xs">
                                    {category} ({categoryCounts[category]})
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Your Subscriptions</CardTitle>
                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Add New
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Subscription</DialogTitle>
                                    <DialogDescription>Enter the details for your new subscription to track
                                        it.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Subscription Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Netflix"
                                                value={newSubscription.name}
                                                onChange={(e) => setNewSubscription({
                                                    ...newSubscription,
                                                    name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="provider">Provider</Label>
                                            <Input
                                                id="provider"
                                                placeholder="Netflix Inc."
                                                value={newSubscription.provider}
                                                onChange={(e) => setNewSubscription({
                                                    ...newSubscription,
                                                    provider: e.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                placeholder="9.99"
                                                value={newSubscription.price}
                                                onChange={(e) => setNewSubscription({
                                                    ...newSubscription,
                                                    price: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing-cycle">Billing Cycle</Label>
                                            <Select
                                                value={newSubscription.billingCycle}
                                                onValueChange={(value: "monthly" | "yearly" | "quarterly") =>
                                                    setNewSubscription({...newSubscription, billingCycle: value})
                                                }
                                            >
                                                <SelectTrigger id="billing-cycle">
                                                    <SelectValue placeholder="Select billing cycle"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                                    <SelectItem value="yearly">Yearly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select
                                                value={newSubscription.category}
                                                onValueChange={(value) => setNewSubscription({
                                                    ...newSubscription,
                                                    category: value
                                                })}
                                            >
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select category"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="next-billing-date">Next Billing Date</Label>
                                            <Input
                                                id="next-billing-date"
                                                type="date"
                                                value={newSubscription.nextBillingDate}
                                                onChange={(e) => setNewSubscription({
                                                    ...newSubscription,
                                                    nextBillingDate: e.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={newSubscription.status}
                                            onValueChange={(value: "active" | "canceled" | "trial") =>
                                                setNewSubscription({...newSubscription, status: value})
                                            }
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="trial">Trial</SelectItem>
                                                <SelectItem value="canceled">Canceled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddSubscription}>Add Subscription</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Edit Subscription Dialog */}
                        <Dialog open={!!editingSubscription}
                                onOpenChange={(open) => !open && setEditingSubscription(null)}>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Subscription</DialogTitle>
                                    <DialogDescription>Update the details for your subscription.</DialogDescription>
                                </DialogHeader>
                                {editingSubscription && (
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-name">Subscription Name</Label>
                                                <Input
                                                    id="edit-name"
                                                    value={editingSubscription.name}
                                                    onChange={(e) => setEditingSubscription({
                                                        ...editingSubscription,
                                                        name: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-provider">Provider</Label>
                                                <Input
                                                    id="edit-provider"
                                                    value={editingSubscription.provider}
                                                    onChange={(e) => setEditingSubscription({
                                                        ...editingSubscription,
                                                        provider: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-price">Price</Label>
                                                <Input
                                                    id="edit-price"
                                                    type="number"
                                                    step="0.01"
                                                    value={editingSubscription.price}
                                                    onChange={(e) =>
                                                        setEditingSubscription({
                                                            ...editingSubscription,
                                                            price: Number.parseFloat(e.target.value),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-billing-cycle">Billing Cycle</Label>
                                                <Select
                                                    value={editingSubscription.billingCycle}
                                                    onValueChange={(value: "monthly" | "yearly" | "quarterly") =>
                                                        setEditingSubscription({
                                                            ...editingSubscription,
                                                            billingCycle: value
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger id="edit-billing-cycle">
                                                        <SelectValue placeholder="Select billing cycle"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                                        <SelectItem value="yearly">Yearly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-category">Category</Label>
                                                <Select
                                                    value={editingSubscription.category}
                                                    onValueChange={(value) => setEditingSubscription({
                                                        ...editingSubscription,
                                                        category: value
                                                    })}
                                                >
                                                    <SelectTrigger id="edit-category">
                                                        <SelectValue placeholder="Select category"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="edit-next-billing-date">Next Billing Date</Label>
                                                <Input
                                                    id="edit-next-billing-date"
                                                    type="date"
                                                    value={editingSubscription.nextBillingDate}
                                                    onChange={(e) =>
                                                        setEditingSubscription({
                                                            ...editingSubscription,
                                                            nextBillingDate: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-status">Status</Label>
                                            <Select
                                                value={editingSubscription.status}
                                                onValueChange={(value: "active" | "canceled" | "trial") =>
                                                    setEditingSubscription({...editingSubscription, status: value})
                                                }
                                            >
                                                <SelectTrigger id="edit-status">
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="trial">Trial</SelectItem>
                                                    <SelectItem value="canceled">Canceled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setEditingSubscription(null)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdateSubscription}>Update Subscription</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <CardDescription>Manage your active and canceled subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1">
                                        Price
                                        <ArrowUpDown className="h-3 w-3"/>
                                    </div>
                                </TableHead>
                                <TableHead>Billing Cycle</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Next Billing</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((subscription) => (
                                <TableRow key={subscription.id}>
                                    <TableCell className="font-medium">
                                        <div>{subscription.name}</div>
                                        <div className="text-xs text-muted-foreground">{subscription.provider}</div>
                                    </TableCell>
                                    <TableCell>${subscription.price.toFixed(2)}</TableCell>
                                    <TableCell className="capitalize">{subscription.billingCycle}</TableCell>
                                    <TableCell>{subscription.category}</TableCell>
                                    <TableCell>{subscription.nextBillingDate}</TableCell>
                                    <TableCell>
                                        <SubscriptionStatusBadge status={subscription.status}/>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => setEditingSubscription(subscription)}>
                                                    <Edit2 className="h-4 w-4 mr-2"/>
                                                    Edit
                                                </DropdownMenuItem>
                                                {subscription.status !== "canceled" && (
                                                    <DropdownMenuItem
                                                        onClick={() => cancelSubscription(subscription.id)}>
                                                        <Trash2 className="h-4 w-4 mr-2"/>
                                                        Cancel
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem
                                                    onClick={() => deleteSubscription(subscription.id)}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2"/>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Export Data</Button>
                    <Button variant="outline">Import Data</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function SubscriptionStatusBadge({status}: { status: Subscription["status"] }) {
    if (status === "active") {
        return (
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Active
            </Badge>
        )
    }

    if (status === "trial") {
        return (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                Trial
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-500">
            Canceled
        </Badge>
    )
}

