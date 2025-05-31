import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Bunk } from "@/types";
import { calculateTotal, DELIVERY_CHARGE } from "@/lib/pricing";
import { motion } from "@/lib/motion";

interface CartViewProps {
  cart: Bunk[];
  setCart: React.Dispatch<React.SetStateAction<Bunk[]>>;
  placeOrder: () => void;
  discount: number;
}

export function CartView({ cart, setCart, placeOrder, discount }: CartViewProps) {
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <ShoppingCart size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add items to your cart to place an order</p>
      </div>
    );
  }
  
  const total = calculateTotal(cart, discount);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <Badge variant="outline" className="px-2 py-1">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {cart.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.fuelAvailable.join(", ")} • {item.distance}km away
                  </p>
                  <p className="font-semibold mt-1">₹{item.price}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFromCart(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={18} />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="mt-6">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{cart.reduce((acc, item) => acc + item.price, 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Charges</span>
            <span>₹{DELIVERY_CHARGE}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-500">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={placeOrder} 
        className="w-full py-6 mt-4 bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        Confirm Booking
      </Button>
    </div>
  );
}