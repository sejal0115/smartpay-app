import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Mail } from "lucide-react";

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col p-6"
    >
      <button onClick={onBack} className="text-muted-foreground text-sm mb-8 text-left">
       <ChevronLeft />
      </button>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-bold font-display mb-2">
          Reset password
        </h1>
        <p className="text-muted-foreground mb-10">
          Enter your email and we’ll send you reset instructions
        </p>

        <div className="relative mb-8">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none"
          />
        </div>

        <button className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg shadow-button">
          Send Reset Link
        </button>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Remember your password?{" "}
          <button onClick={onBack} className="text-primary font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;