import { useEffect, useState } from "react";
import { AppFooter } from "@/features/navigation/AppFooter";
import { CartView } from "@/features/cart/CartView";
import { HomeView } from "@/features/home/HomeView";
import { OptionsView } from "@/features/options/OptionsView";
import { ProfileView } from "@/features/profile/ProfileView";
import { TrackingView } from "@/features/tracking/TrackingView";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Bunk, SubView, View } from "@/types";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function AJApp() {
  const [view, setView] = useState<View>("options");
  const [subView, setSubView] = useState<SubView>("fuel");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Bunk[]>([]);
  const [orderHistory, setOrderHistory] = useState<Bunk[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<Bunk | null>(null);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [discount, setDiscount] = useState<number>(0);
  const { location, locationText } = useGeolocation();
  const { toast } = useToast();

  const addToCart = (bunk: Bunk) => {
    setCart([...cart, bunk]);
    toast({
      title: "Added to cart",
      description: `${bunk.name} has been added to your cart`,
    });
  };

  const placeOrder = () => {
    setOrderHistory([...orderHistory, ...cart]);
    setTrackingOrder(cart[0]);
    setDiscount(Math.random() < 0.5 ? 10 : 0);
    setCart([]);
    setView("tracking");
    setDeliveryProgress(0);
    
    toast({
      title: "Order placed successfully!",
      description: "Your order is now being processed",
      variant: "success",
    });
  };

  useEffect(() => {
    if (view === "tracking" && trackingOrder) {
      const interval = setInterval(() => {
        setDeliveryProgress((prev) => {
          if (prev >= trackingOrder.distance * 10) {
            clearInterval(interval);
            toast({
              title: "Delivery complete!",
              description: "Your order has been delivered",
              variant: "success",
            });
            return trackingOrder.distance * 10;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [view, trackingOrder]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 pb-24 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {view === "options" && (
            <OptionsView setView={setView} setSubView={setSubView} />
          )}
          {view === "home" && (
            <HomeView 
              subView={subView} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              addToCart={addToCart}
              locationText={locationText}
            />
          )}
          {view === "cart" && (
            <CartView 
              cart={cart} 
              setCart={setCart} 
              placeOrder={placeOrder} 
              discount={discount}
            />
          )}
          {view === "tracking" && trackingOrder && (
            <TrackingView 
              trackingOrder={trackingOrder} 
              deliveryProgress={deliveryProgress} 
              setTrackingOrder={setTrackingOrder} 
              setView={setView} 
            />
          )}
          {view === "profile" && (
            <ProfileView orderHistory={orderHistory} />
          )}
        </div>
      </main>
      
      <AppFooter 
        view={view} 
        setView={setView} 
        cartCount={cart.length} 
      />
      
      <Toaster />
    </div>
  );
}