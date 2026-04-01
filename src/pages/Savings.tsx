import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Zap, ChevronLeft } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { savingsGoals } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Savings() {
  const [goals, setGoals] = useState(savingsGoals);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const { toast } = useToast();

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  const handleAdd = () => {
    if (!newName || !newTarget) return;
    setGoals([
      ...goals,
      {
        id: String(Date.now()),
        name: newName,
        icon: "🎯",
        target: Number(newTarget),
        saved: 0,
        color: "primary",
        autoSave: false,
      },
    ]);
    setShowForm(false);
    setNewName("");
    setNewTarget("");
    toast({
      title: "Goal Created!",
      description: `${newName} - ₹${Number(newTarget).toLocaleString("en-IN")}`,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Savings Goals</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="rounded-xl gradient-primary text-primary-foreground"
        >
          <Plus size={16} className="mr-1" /> New
        </Button>
      </div>

      {/* Total saved card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl gradient-primary p-5 text-primary-foreground mb-6 shadow-elevated"
      >
        <p className="text-sm opacity-90 mb-1">Total Saved</p>
        <p className="text-3xl font-bold">
          ₹{totalSaved.toLocaleString("en-IN")}
        </p>
        <p className="text-sm opacity-80 mt-1">{goals.length} active goals</p>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-card rounded-2xl p-5 shadow-card mb-6 space-y-3"
        >
          <Input
            placeholder="Goal name (e.g. Vacation)"
            className="rounded-xl"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Input
            placeholder="Target amount"
            type="number"
            className="rounded-xl"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
          />
          <Button
            onClick={handleAdd}
            className="w-full rounded-xl gradient-primary text-primary-foreground"
          >
            Create Goal
          </Button>
        </motion.div>
      )}

      <div className="space-y-4">
        {goals.map((goal, i) => {
          const pct = Math.round((goal.saved / goal.target) * 100);
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{goal.saved.toLocaleString("en-IN")} of ₹
                      {goal.target.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-warning" />
                  <span className="text-xs text-muted-foreground">
                    Auto-save
                  </span>
                  <Switch
                    checked={goal.autoSave}
                    onCheckedChange={() => {
                      setGoals(
                        goals.map((g) =>
                          g.id === goal.id
                            ? { ...g, autoSave: !g.autoSave }
                            : g,
                        ),
                      );
                    }}
                  />
                </div>
                {goal.monthlyAmount && (
                  <span className="text-xs text-muted-foreground">
                    ₹{goal.monthlyAmount.toLocaleString("en-IN")}/mo
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
