import { Button } from "@/components/ui/button";
import { DropletIcon, WrenchIcon } from "lucide-react";
import { SubView, View } from "@/types";
import { motion } from "@/lib/motion";

interface OptionsViewProps {
  setView: (view: View) => void;
  setSubView: (subView: SubView) => void;
}

export function OptionsView({ setView, setSubView }: OptionsViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2">AJ Services</h1>
        <p className="text-muted-foreground mb-8">Fuel & Mechanic at your doorstep</p>
      </motion.div>

      <div className="space-y-6 w-full max-w-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button 
            className="bg-red-600 hover:bg-red-700 w-full py-8 text-lg font-medium rounded-xl shadow-lg flex items-center justify-center gap-3"
            onClick={() => { 
              setView("home"); 
              setSubView("fuel"); 
            }}
          >
            <DropletIcon size={24} />
            Fuel Delivery
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button 
            className="bg-blue-600 hover:bg-blue-700 w-full py-8 text-lg font-medium rounded-xl shadow-lg flex items-center justify-center gap-3"
            onClick={() => { 
              setView("home"); 
              setSubView("mechanic"); 
            }}
          >
            <WrenchIcon size={24} />
            Mechanic Service
          </Button>
        </motion.div>
      </div>
    </div>
  );
}