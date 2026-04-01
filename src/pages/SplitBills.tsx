import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Send } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { contacts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function SplitBills() {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const perPerson = selectedPeople.length > 0 && totalAmount ? (Number(totalAmount) / (selectedPeople.length + 1)).toFixed(2) : '0';

  const togglePerson = (id: string) => {
    setSelectedPeople(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleSplit = () => {
    setSent(true);
    toast({ title: 'Split requests sent!', description: `₹${perPerson} requested from ${selectedPeople.length} people` });
  };

  if (sent) {
    return (
      <AppLayout>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Send size={28} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Split Requests Sent!</h2>
          <p className="text-muted-foreground mb-6">₹{perPerson} per person · {selectedPeople.length} people</p>
          <Button onClick={() => { setSent(false); setSelectedPeople([]); setTotalAmount(''); setDescription(''); }}
            className="rounded-xl gradient-primary text-primary-foreground">Split Another</Button>
        </motion.div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Split Bills</h1>

      <div className="bg-card rounded-2xl p-5 shadow-card mb-6 space-y-4">
        <Input placeholder="What's this for? (e.g. Dinner)" className="rounded-xl" value={description} onChange={e => setDescription(e.target.value)} />
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Total Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₹</span>
            <Input type="number" placeholder="0" className="rounded-xl pl-7 text-lg font-semibold" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-3">SELECT PEOPLE ({selectedPeople.length} selected)</p>
        <div className="grid grid-cols-3 gap-3">
          {contacts.map(c => {
            const selected = selectedPeople.includes(c.id);
            return (
              <button key={c.id} onClick={() => togglePerson(c.id)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  selected ? 'bg-primary/10 ring-2 ring-primary' : 'bg-card shadow-card'
                }`}>
                {selected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <X size={10} className="text-primary-foreground" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">{c.avatar}</div>
                <span className="text-xs font-medium text-foreground">{c.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedPeople.length > 0 && totalAmount && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 shadow-card mb-6">
          <p className="text-sm text-muted-foreground mb-2">Split Summary</p>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Per person ({selectedPeople.length + 1} people)</span>
            <span className="text-lg font-bold text-foreground">₹{perPerson}</span>
          </div>
          <p className="text-xs text-muted-foreground">Including you</p>
        </motion.div>
      )}

      <Button onClick={handleSplit} disabled={selectedPeople.length === 0 || !totalAmount}
        className="w-full rounded-xl h-12 gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity">
        <Send size={16} className="mr-2" /> Send Split Requests
      </Button>
    </AppLayout>
  );
}
