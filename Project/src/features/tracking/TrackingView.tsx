import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Truck } from "lucide-react";
import { Bunk, View } from "@/types";
import { motion } from "@/lib/motion";

interface TrackingViewProps {
  trackingOrder: Bunk;
  deliveryProgress: number;
  setTrackingOrder: React.Dispatch<React.SetStateAction<Bunk | null>>;
  setView: (view: View) => void;
}

export function TrackingView({ 
  trackingOrder, 
  deliveryProgress, 
  setTrackingOrder, 
  setView 
}: TrackingViewProps) {
  const progressPercentage = Math.min(Math.round((deliveryProgress / (trackingOrder.distance * 10)) * 100), 100);
  const isDelivered = progressPercentage === 100;
  
  const estimatedTime = Math.ceil((trackingOrder.distance * 60) * (1 - progressPercentage/100));
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={isDelivered ? "bg-green-600/20 border-green-600" : "bg-blue-600/20 border-blue-600"}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {isDelivered ? "Delivery Complete!" : "Order Confirmed!"}
              </h2>
              {isDelivered ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <Truck className="h-8 w-8 text-blue-500 animate-pulse" />
              )}
            </div>
            
            <p className="text-sm mb-4">
              {isDelivered 
                ? "Your order has been delivered successfully." 
                : `Tracking delivery from ${trackingOrder.name}.`}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Delivery Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            {!isDelivered && (
              <div className="p-3 bg-background/50 rounded-lg text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">{estimatedTime} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-medium">{trackingOrder.distance} km</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Delivery Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-muted-foreground">Delivery Address</p>
                  <p className="font-medium">123 Main St, Koramangala, Bengaluru</p>
                </div>
              </div>
              <div className="flex">
                <Truck className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-muted-foreground">Delivery From</p>
                  <p className="font-medium">{trackingOrder.name}</p>
                  <p className="text-xs">{trackingOrder.fuelAvailable.join(", ")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Button 
        onClick={() => { 
          setTrackingOrder(null); 
          setView("options"); 
        }} 
        className={isDelivered ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
      >
        {isDelivered ? "Back to Home" : "Cancel Tracking"}
      </Button>
    </div>
  );
}