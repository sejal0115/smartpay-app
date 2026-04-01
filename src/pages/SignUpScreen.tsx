import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ChevronLeft } from "lucide-react";

interface SignUpScreenProps {
  onSignUp: () => void;
  onBack: () => void;
  onSignIn: () => void;
}

const SignUpScreen = ({ onSignUp, onBack, onSignIn }: SignUpScreenProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

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
        <h1 className="text-3xl font-bold font-display mb-2">Create account</h1>
        <p className="text-muted-foreground mb-10">
          Join SmartPay and start managing your money
        </p>

        <div className="space-y-4 mb-8">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          onClick={onSignUp}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg shadow-button"
        >
          Create Account
        </button>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Already have an account?{" "}
          <button onClick={onSignIn} className="text-primary font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpScreen;
