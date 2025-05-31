import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bunk, SubView } from "@/types";
import { getBunks } from "@/data/bunks";
import { MapPin, Filter, DropletIcon, WrenchIcon } from "lucide-react";
import { motion } from "@/lib/motion";

interface HomeViewProps {
  subView: SubView;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addToCart: (bunk: Bunk) => void;
  locationText: string;
}

export function HomeView({ 
  subView, 
  searchTerm, 
  setSearchTerm, 
  addToCart, 
  locationText 
}: HomeViewProps) {
  const [distanceFilter, setDistanceFilter] = useState<number>(10);
  const [pressedButtonId, setPressedButtonId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>(subView);
  const bunks = getBunks();
  
  const handleAddToCart = (bunk: Bunk) => {
    addToCart(bunk);
    setPressedButtonId(bunk.id);
    setTimeout(() => setPressedButtonId(null), 300);
  };

  const filteredBunks = bunks.filter((bunk) =>
    bunk.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    bunk.distance <= distanceFilter &&
    (activeTab === "fuel" 
      ? bunk.fuelAvailable.length > 0 
      : bunk.mechanicAvailable)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">
          {activeTab === "fuel" ? "Fuel Delivery" : "Mechanic Service"}
        </h1>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin size={16} className="mr-1" />
          <span className="truncate">{locationText}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="fuel" className="data-[state=active]:bg-red-600">
            <DropletIcon size={16} className="mr-2" />
            Fuel
          </TabsTrigger>
          <TabsTrigger value="mechanic" className="data-[state=active]:bg-blue-600">
            <WrenchIcon size={16} className="mr-2" />
            Mechanic
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder={`Search ${activeTab === "fuel" ? "fuel stations" : "mechanics"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background text-foreground border-input"
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter size={18} />
          </Button>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm">Distance: {distanceFilter} km</p>
          <input
            type="range"
            min="1"
            max="20"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>

        <TabsContent value="fuel" className="space-y-4 mt-0">
          {filteredBunks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No fuel stations found. Try adjusting your filters.
            </div>
          ) : (
            filteredBunks.map((bunk, index) => (
              <BunkCard 
                key={bunk.id}
                bunk={bunk}
                index={index}
                isPressed={pressedButtonId === bunk.id}
                onAddToCart={handleAddToCart}
                type="fuel"
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="mechanic" className="space-y-4 mt-0">
          {filteredBunks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No mechanics found. Try adjusting your filters.
            </div>
          ) : (
            filteredBunks
              .filter(bunk => bunk.mechanicAvailable)
              .map((bunk, index) => (
                <BunkCard 
                  key={bunk.id}
                  bunk={bunk}
                  index={index}
                  isPressed={pressedButtonId === bunk.id}
                  onAddToCart={handleAddToCart}
                  type="mechanic"
                />
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface BunkCardProps {
  bunk: Bunk;
  index: number;
  isPressed: boolean;
  onAddToCart: (bunk: Bunk) => void;
  type: "fuel" | "mechanic";
}

function BunkCard({ bunk, index, isPressed, onAddToCart, type }: BunkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold">{bunk.name}</h2>
            <Badge className={type === "fuel" ? "bg-red-600" : "bg-blue-600"}>
              {bunk.distance} km
            </Badge>
          </div>
          
          <div className="space-y-2 mb-3">
            {type === "fuel" && (
              <div className="flex flex-wrap gap-1">
                {bunk.fuelAvailable.map((fuel) => (
                  <Badge key={fuel} variant="outline" className="text-xs">
                    {fuel}
                  </Badge>
                ))}
              </div>
            )}
            
            {type === "mechanic" && bunk.mechanicAvailable && (
              <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-700">
                Mechanic Available
              </Badge>
            )}
            
            <p className="text-lg font-bold">₹{bunk.price}{type === "fuel" ? "/L" : "/hr"}</p>
          </div>
          
          <Button
            onClick={() => onAddToCart(bunk)}
            className={`w-full transition-all duration-200 ${
              isPressed 
                ? "scale-95 bg-green-700" 
                : type === "fuel" 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}