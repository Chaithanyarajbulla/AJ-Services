import { ShoppingCart, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { View } from "@/types";
import { motion } from "@/lib/motion";

interface AppFooterProps {
  view: View;
  setView: (view: View) => void;
  cartCount: number;
}

export function AppFooter({ view, setView, cartCount }: AppFooterProps) {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      onClick: () => setView("options"),
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      onClick: () => setView("cart"),
      badge: cartCount > 0 ? cartCount : null,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      onClick: () => setView("profile"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "relative flex flex-col items-center justify-center text-sm transition-colors duration-200",
                view === item.id || (view === "home" && item.id === "home") || (view === "options" && item.id === "home") || (view === "tracking" && item.id === "home")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon size={20} className="mb-1" />
              {item.label}
              
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1.5 py-0.5 text-xs min-w-[20px] text-center"
                >
                  {item.badge}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}