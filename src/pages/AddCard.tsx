import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (card: any) => void;
}

const AddCard = ({ onSave }: AddCardProps) => {
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  const { toast } = useToast();

  // 🔍 Validation logic
  const validate = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {};

    // Card holder
    if (!holder.trim()) {
      newErrors.holder = "Card holder name is required";
    }

    // Card number (16 digits)
    if (!number) {
      newErrors.number = "Card number is required";
    } else if (!/^\d{16}$/.test(number)) {
      newErrors.number = "Card number must be 16 digits";
    }

    // Expiry (MM/YY)
    if (!expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Format should be MM/YY";
    }

    // CVV (3 digits)
    if (!cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const newCard = {
      id: Date.now().toString(),
      holder,
      last4: number.slice(-4),
      expiry,
      type: "VISA",
      isDefault: false,
    };

    onSave(newCard);

    toast({
      title: "Card Added!",
      description: `**** ${newCard.last4} added successfully`,
    });
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Add Card</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 shadow-card space-y-4"
      >
        {/* Card Number */}
        <div>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Card Number"
              value={number}
              maxLength={16}
              onChange={(e) =>
                setNumber(e.target.value.replace(/\D/g, ""))
              }
              className="pl-12"
            />
          </div>
          {errors.number && (
            <p className="text-red-500 text-xs mt-1">{errors.number}</p>
          )}
        </div>

        {/* Holder */}
        <div>
          <Input
            placeholder="Card Holder Name"
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
          />
          {errors.holder && (
            <p className="text-red-500 text-xs mt-1">{errors.holder}</p>
          )}
        </div>

        {/* Expiry + CVV */}
        <div className="flex gap-3">
          <div className="w-full">
            <Input
              placeholder="MM/YY"
              value={expiry}
              maxLength={5}
              onChange={(e) => setExpiry(e.target.value)}
            />
            {errors.expiry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expiry}
              </p>
            )}
          </div>

          <div className="w-full">
            <Input
              placeholder="CVV"
              type="password"
              maxLength={3}
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, ""))
              }
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="w-full rounded-xl gradient-primary text-primary-foreground"
        >
          Add Card
        </Button>
      </motion.div>
    </AppLayout>
  );
};

export default AddCard;