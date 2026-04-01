import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { contacts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type Step = 'contact' | 'amount' | 'review' | 'success';

export default function SendMoney() {
  const [step, setStep] = useState<Step>('contact');
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSend = () => {
    setStep('success');
    toast({ title: 'Payment Successful!', description: `₹${amount} sent to ${selectedContact?.name}` });
  };

  const reset = () => { setStep('contact'); setSelectedContact(null); setAmount(''); setNote(''); setSearch(''); };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
        {step !== 'contact' && step !== 'success' && (
          <button onClick={reset} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
        )}
      </div>

      {/* Step indicators */}
      {step !== 'success' && (
        <div className="flex items-center gap-2 mb-6">
          {(['contact', 'amount', 'review'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step === s ? 'gradient-primary text-primary-foreground shadow-glow' :
                (['contact', 'amount', 'review'].indexOf(step) > i) ? 'bg-success text-success-foreground' :
                'bg-muted text-muted-foreground'
              }`}>{i + 1}</div>
              {i < 2 && <div className="w-8 h-0.5 bg-muted rounded" />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search contacts or enter UPI ID" className="pl-10 rounded-xl" value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {contacts.some(c => c.isFavorite) && (
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">FAVORITES</p>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {contacts.filter(c => c.isFavorite).map(c => (
                    <button key={c.id} onClick={() => { setSelectedContact(c); setStep('amount'); }}
                      className="flex flex-col items-center gap-1.5 min-w-[60px] group">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm group-hover:shadow-glow transition-shadow">
                        {c.avatar}
                      </div>
                      <span className="text-xs text-muted-foreground">{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs font-medium text-muted-foreground mb-3">ALL CONTACTS</p>
            <div className="space-y-2">
              {filtered.map(c => (
                <button key={c.id} onClick={() => { setSelectedContact(c); setStep('amount'); }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm text-muted-foreground">{c.avatar}</div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'amount' && (
          <motion.div key="amount" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">
              {selectedContact?.avatar}
            </div>
            <p className="font-semibold text-foreground mb-1">{selectedContact?.name}</p>
            <p className="text-xs text-muted-foreground mb-8">{selectedContact?.upiId}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">₹</span>
              <input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)}
                className="text-4xl font-bold text-foreground bg-transparent outline-none w-40 text-center" autoFocus />
            </div>

            <Input placeholder="Add a note (optional)" className="rounded-xl mb-6 text-center" value={note} onChange={e => setNote(e.target.value)} />

            <div className="flex gap-2 justify-center mb-6">
              {[100, 500, 1000, 2000].map(v => (
                <button key={v} onClick={() => setAmount(String(v))}
                  className="px-4 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  ₹{v}
                </button>
              ))}
            </div>

            <Button onClick={() => setStep('review')} disabled={!amount || Number(amount) <= 0}
              className="w-full rounded-xl h-12 gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity">
              Continue
            </Button>
          </motion.div>
        )}

        {step === 'review' && (
          <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
              <p className="text-sm text-muted-foreground mb-4">Review Payment</p>
              <div className="space-y-4">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">To</span><span className="text-sm font-medium text-foreground">{selectedContact?.name}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">UPI ID</span><span className="text-sm text-foreground">{selectedContact?.upiId}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-lg font-bold text-foreground">₹{Number(amount).toLocaleString('en-IN')}</span></div>
                {note && <div className="flex justify-between"><span className="text-sm text-muted-foreground">Note</span><span className="text-sm text-foreground">{note}</span></div>}
              </div>
            </div>
            <Button onClick={handleSend} className="w-full rounded-xl h-12 gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity">
              Pay ₹{Number(amount).toLocaleString('en-IN')}
            </Button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={48} className="text-success" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">₹{Number(amount).toLocaleString('en-IN')} sent to {selectedContact?.name}</p>
            <div className="bg-card rounded-2xl p-4 shadow-card mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Transaction ID</span><span className="font-mono text-foreground">TXN{Date.now()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="text-foreground">{new Date().toLocaleDateString('en-IN')}</span></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={reset}>Send Again</Button>
              <Button className="flex-1 rounded-xl gradient-primary text-primary-foreground" onClick={reset}>Done</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
