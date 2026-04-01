import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Gift,
  TrendingUp,
  Send,
  SplitSquareVertical,
  Receipt,
  PiggyBank,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  walletBalance,
  rewardPoints,
  transactions,
  spendingData,
} from "../data/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const quickActions = [
  {
    icon: Send,
    label: "Send",
    to: "/send",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ArrowDownLeft,
    label: "Request",
    to: "/request",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: SplitSquareVertical,
    label: "Split",
    to: "/split",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: PiggyBank,
    label: "Save",
    to: "/savings",
    color: "bg-warning/10 text-warning",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  return (
    <AppLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-2xl font-bold text-foreground">Sejal 👋</h1>
        </div>
        {/* <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer flex font-semibold gradient-primary h-10 items-center justify-center rounded-full text-primary-foreground text-sm w-10"
        >
          SM
        </div> */}
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl gradient-primary p-6 text-primary-foreground mb-6 shadow-elevated"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm opacity-90">Total Balance</p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        <p className="text-3xl font-bold mb-1">
          {showBalance
            ? `₹${walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
            : "₹••••••"}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Gift size={14} />
          <span className="text-sm opacity-90">
            {rewardPoints} reward points
          </span>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 justify-around mb-6"
      >
        {quickActions.map(({ icon: Icon, label, to, color }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 group w-16"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center transition-transform group-hover:scale-105`}
            >
              <Icon size={20} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </Link>
        ))}
      </motion.div>

      {/* Spending Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-5 shadow-card mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Weekly Spending</h2>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp size={14} />
            <span>12% less</span>
          </div>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spendingData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`₹${value}`, "Spent"]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent Transactions</h2>
          <Link to="/transactions" className="text-sm text-primary font-medium">
            See all
          </Link>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 bg-card rounded-xl p-3.5 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.type === "sent"
                    ? "bg-destructive/10 text-destructive"
                    : tx.type === "received"
                      ? "bg-success/10 text-success"
                      : tx.type === "cashback"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                }`}
              >
                {tx.type === "sent" ? (
                  <ArrowUpRight size={18} />
                ) : tx.type === "received" ? (
                  <ArrowDownLeft size={18} />
                ) : (
                  <Receipt size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {tx.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tx.category} · {tx.date}
                </p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  tx.type === "received" || tx.type === "cashback"
                    ? "text-success"
                    : "text-foreground"
                }`}
              >
                {tx.type === "received" || tx.type === "cashback" ? "+" : "-"}₹
                {tx.amount.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
