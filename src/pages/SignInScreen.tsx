import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignInScreenProps {
  onSignIn: () => void;
  onBack: () => void;
}

const SignInScreen = ({ onSignIn, onBack }: SignInScreenProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col p-6"
    >
      <button
        onClick={onBack}
        className="text-muted-foreground text-sm mb-8 self-start"
      >
        <ChevronLeft />
      </button>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-3xl font-bold font-display mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-10">
          Sign in to your SmartPay account
        </p>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPass ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          className="text-primary text-sm font-medium self-end mb-8"
          onClick={() => navigate("/forgot")}
        >
          Forgot password?
        </button>

        <button
          onClick={onSignIn}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg shadow-button active:scale-[0.97] transition-transform"
        >
          Sign In
        </button>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Don't have an account?{" "}
          <button
            className="text-primary font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignInScreen;
