import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { moneyRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function RequestMoney() {
  const [requests, setRequests] = useState(moneyRequests);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleCreate = () => {
    if (!name || !amount) return;
    setRequests([{ id: String(Date.now()), from: name, amount: Number(amount), note, status: 'pending', date: new Date().toISOString().split('T')[0] }, ...requests]);
    setShowForm(false); setName(''); setAmount(''); setNote('');
    toast({ title: 'Request Sent!', description: `₹${amount} requested from ${name}` });
  };

  const statusConfig = {
    pending: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Pending' },
    paid: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Paid' },
    declined: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Declined' },
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Request Money</h1>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="rounded-xl gradient-primary text-primary-foreground">
          <Plus size={16} className="mr-1" /> New
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="bg-card rounded-2xl p-5 shadow-card mb-6 space-y-3">
          <Input placeholder="Name" className="rounded-xl" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Amount" type="number" className="rounded-xl" value={amount} onChange={e => setAmount(e.target.value)} />
          <Input placeholder="Note (optional)" className="rounded-xl" value={note} onChange={e => setNote(e.target.value)} />
          <Button onClick={handleCreate} className="w-full rounded-xl gradient-primary text-primary-foreground">Send Request</Button>
        </motion.div>
      )}

      <div className="space-y-3">
        {requests.map((req, i) => {
          const config = statusConfig[req.status];
          const Icon = config.icon;
          return (
            <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                <Icon size={18} className={config.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{req.from}</p>
                <p className="text-xs text-muted-foreground">{req.note} · {req.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">₹{req.amount.toLocaleString('en-IN')}</p>
                <p className={`text-xs font-medium ${config.color}`}>{config.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
