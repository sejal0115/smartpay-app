import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Receipt, Filter, Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { transactions } from '@/data/mockData';
import { Input } from '@/components/ui/input';

const typeFilters = ['All', 'Sent', 'Received', 'Bills'];
const statusFilters = ['All', 'Completed', 'Pending', 'Failed'];

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = transactions.filter(tx => {
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter === 'Sent' && tx.type !== 'sent') return false;
    if (typeFilter === 'Received' && tx.type !== 'received') return false;
    if (typeFilter === 'Bills' && tx.type !== 'bill') return false;
    if (statusFilter !== 'All' && tx.status !== statusFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow">
          <Filter size={18} className="text-muted-foreground" />
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search transactions" className="pl-10 rounded-xl" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">TYPE</p>
            <div className="flex gap-2 flex-wrap">
              {typeFilters.map(f => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    typeFilter === f ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">STATUS</p>
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    statusFilter === f ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>{f}</button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {filtered.map((tx, i) => (
          <motion.div key={tx.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 bg-card rounded-xl p-3.5 shadow-card hover:shadow-elevated transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              tx.type === 'sent' ? 'bg-destructive/10 text-destructive' :
              tx.type === 'received' ? 'bg-success/10 text-success' :
              tx.type === 'cashback' ? 'bg-warning/10 text-warning' :
              'bg-muted text-muted-foreground'
            }`}>
              {tx.type === 'sent' ? <ArrowUpRight size={18} /> :
               tx.type === 'received' ? <ArrowDownLeft size={18} /> :
               <Receipt size={18} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
              <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                tx.type === 'received' || tx.type === 'cashback' ? 'text-success' : 'text-foreground'
              }`}>
                {tx.type === 'received' || tx.type === 'cashback' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </p>
              <span className={`text-[10px] font-medium ${
                tx.status === 'completed' ? 'text-success' : tx.status === 'pending' ? 'text-warning' : 'text-destructive'
              }`}>{tx.status}</span>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No transactions found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
