import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  History, 
  Settings, 
  MapPin, 
  Lock, 
  Bell, 
  Shield, 
  LogOut, 
  Mail,
  Phone,
  Home,
  Edit
} from "lucide-react";
import { Bunk } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { motion } from "@/lib/motion";

interface ProfileViewProps {
  orderHistory: Bunk[];
}

export function ProfileView({ orderHistory }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Koramangala, Bengaluru"
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{userDetails.name}</h2>
                <p className="text-muted-foreground flex items-center">
                  <MapPin size={14} className="mr-1" />
                  Bengaluru, India
                </p>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="account">
            <User size={16} className="mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="history">
            <History size={16} className="mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings size={16} className="mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userDetails.name}
                    disabled={!isEditing}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userDetails.email}
                    disabled={!isEditing}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userDetails.phone}
                    disabled={!isEditing}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={userDetails.address}
                    disabled={!isEditing}
                    onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          {orderHistory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <History size={48} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium mb-1">No order history</h3>
              <p>Your past orders will appear here</p>
            </div>
          ) : (
            orderHistory.map((order, index) => (
              <motion.div
                key={`${order.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.fuelAvailable.join(", ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(Date.now() - index * 86400000), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.price}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.distance}km away
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lock size={18} className="mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Location Services</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow app to access your location
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Share Order History</Label>
                    <p className="text-sm text-muted-foreground">
                      Share order history with service providers
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell size={18} className="mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive order updates and offers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive order confirmations via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield size={18} className="mr-2" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock size={16} className="mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield size={16} className="mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}