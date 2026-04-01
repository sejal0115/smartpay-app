import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Zap, PiggyBank } from "lucide-react";

const slides = [
  {
    icon: Zap,
    title: "Lightning Fast Payments",
    description: "Send and receive money instantly with zero hassle",
    color: "gradient-primary",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your money is protected with enterprise-level encryption",
    color: "gradient-primary",
  },
  {
    icon: PiggyBank,
    title: "Smart Savings",
    description: "Auto-save towards your goals and watch your money grow",
    color: "gradient-primary",
  },
];

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else onGetStarted();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 pb-12">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className={`w-28 h-28 rounded-3xl ${slides[current].color} flex items-center justify-center mb-10 shadow-elevated`}
            >
              {(() => {
                const Icon = slides[current].icon;
                return <Icon className="w-12 h-12 text-primary-foreground" />;
              })()}
            </div>
            <h1 className="text-3xl font-bold font-display mb-3">
              {slides[current].title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg shadow-button flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
        >
          {current === slides.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
