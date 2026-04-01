import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Moon,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Info" },
        { icon: CreditCard, label: "Payment Methods" },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: Shield, label: "Change Password" },
        { icon: Shield, label: "Two-Factor Authentication" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications" },
        { icon: Moon, label: "Theme" },
        { icon: Globe, label: "Language" },
      ],
    },
  ];

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-5"
      >
        <h2 className="text-xl font-bold mb-6">Profile</h2>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-4xl text-primary-foreground font-bold mb-3 shadow-elevated">
            SM
          </div>
          <h3 className="text-lg font-bold font-display">Sejal Mahadik</h3>
          <p className="text-sm text-muted-foreground mb-2">
            sejal.mahadik@email.com
          </p>

          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="font-bold">₹24,850</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Rewards</p>
            <p className="font-bold">₹12,80</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Spending</p>
            <p className="font-bold">₹47,50</p>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm text-muted-foreground mb-3">
                {section.title}
              </h3>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 w-full p-4 rounded-2xl shadow-[0_0_0_1px_hsl(var(--sidebar-border))] glass-card active:scale-[0.98] transition-transform"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent-foreground" />
                    </div>

                    <span className="text-sm font-medium flex-1 text-left">
                      {item.label}
                    </span>

                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full h-12 rounded-2xl border border-destructive text-destructive font-medium mt-4 active:scale-[0.97] transition-transform"
        >
          Sign Out
        </button>
      </motion.div>
    </AppLayout>
  );
};

export default Profile;
