import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  CreditCard,
  Star,
  Lock,
  Unlock,
  Wifi,
  ChevronLeft,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cards as mockCards } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState(mockCards);
  const [lockedCards, setLockedCards] = useState<string[]>([]);
  const { toast } = useToast();

  const setDefault = (id: string) => {
    setCardList(cardList.map((c) => ({ ...c, isDefault: c.id === id })));
    toast({ title: "Default card updated" });
  };

  const toggleLock = (id: string) => {
    setLockedCards((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
    toast({
      title: lockedCards.includes(id) ? "Card unlocked" : "Card locked",
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Cards</h1>
        <Button
          size="sm"
          className="rounded-xl gradient-primary text-primary-foreground"
          onClick={() => navigate("/add-card")}
        >
          <Plus size={16} className="mr-1" /> Add Card
        </Button>
      </div>

      <div className="space-y-5 mb-8">
        {cardList.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-6 text-primary-foreground gradient-primary shadow-elevated overflow-hidden ${
              lockedCards.includes(card.id) ? "opacity-60" : ""
            }`}
          >
            {/* Decorative circles */}
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border border-primary-foreground/10" />
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full border border-primary-foreground/10" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Wifi size={20} className="rotate-90 opacity-80" />
                {card.isDefault && (
                  <span className="text-[10px] font-medium bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                    DEFAULT
                  </span>
                )}
              </div>
              <CreditCard size={24} className="opacity-80" />
            </div>

            <p className="text-lg font-mono tracking-[4px] mb-6 opacity-90">
              •••• •••• •••• {card.last4}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] opacity-70 mb-0.5">CARD HOLDER</p>
                <p className="text-sm font-semibold">{card.holder}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-70 mb-0.5">EXPIRES</p>
                <p className="text-sm font-semibold">{card.expiry}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase opacity-80">
                  {card.type}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-semibold text-foreground mb-4">Card Controls</h2>
      <div className="space-y-3">
        {cardList.map((card) => (
          <div
            key={card.id}
            className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                •••• {card.last4}
              </p>
              <p className="text-xs text-muted-foreground">
                {card.type.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => toggleLock(card.id)}
              >
                {lockedCards.includes(card.id) ? (
                  <Lock size={14} />
                ) : (
                  <Unlock size={14} />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setDefault(card.id)}
                disabled={card.isDefault}
              >
                <Star
                  size={14}
                  className={card.isDefault ? "text-warning fill-warning" : ""}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
