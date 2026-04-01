export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'bill' | 'recharge' | 'cashback';
  name: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  avatar?: string;
  category?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  upiId?: string;
  isFavorite?: boolean;
}

export interface Card {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  holder: string;
  expiry: string;
  color: string;
  isDefault: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  icon: string;
  target: number;
  saved: number;
  color: string;
  autoSave: boolean;
  monthlyAmount?: number;
}

export interface MoneyRequest {
  id: string;
  from: string;
  amount: number;
  note: string;
  status: 'pending' | 'paid' | 'declined';
  date: string;
}

export const transactions: Transaction[] = [
  { id: '1', type: 'sent', name: 'Priya Sharma', amount: 1500, date: '2026-03-30', status: 'completed', category: 'Transfer' },
  { id: '2', type: 'received', name: 'Rahul Verma', amount: 3200, date: '2026-03-29', status: 'completed', category: 'Transfer' },
  { id: '3', type: 'bill', name: 'Netflix Subscription', amount: 649, date: '2026-03-28', status: 'completed', category: 'Entertainment' },
  { id: '4', type: 'recharge', name: 'Jio Recharge', amount: 399, date: '2026-03-27', status: 'completed', category: 'Recharge' },
  { id: '5', type: 'cashback', name: 'Cashback Reward', amount: 50, date: '2026-03-27', status: 'completed', category: 'Reward' },
  { id: '6', type: 'sent', name: 'Ankit Patel', amount: 800, date: '2026-03-26', status: 'pending', category: 'Transfer' },
  { id: '7', type: 'received', name: 'Salary Credit', amount: 45000, date: '2026-03-25', status: 'completed', category: 'Income' },
  { id: '8', type: 'bill', name: 'Electricity Bill', amount: 1820, date: '2026-03-24', status: 'completed', category: 'Utility' },
  { id: '9', type: 'sent', name: 'Swiggy Order', amount: 456, date: '2026-03-23', status: 'failed', category: 'Food' },
  { id: '10', type: 'received', name: 'Meera Singh', amount: 2000, date: '2026-03-22', status: 'completed', category: 'Transfer' },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 43210', avatar: 'PS', upiId: 'priya@upi', isFavorite: true },
  { id: '2', name: 'Rahul Verma', phone: '+91 87654 32109', avatar: 'RV', upiId: 'rahul@upi', isFavorite: true },
  { id: '3', name: 'Ankit Patel', phone: '+91 76543 21098', avatar: 'AP', upiId: 'ankit@upi', isFavorite: true },
  { id: '4', name: 'Meera Singh', phone: '+91 65432 10987', avatar: 'MS', upiId: 'meera@upi' },
  { id: '5', name: 'Vikram Joshi', phone: '+91 54321 09876', avatar: 'VJ', upiId: 'vikram@upi' },
  { id: '6', name: 'Neha Gupta', phone: '+91 43210 98765', avatar: 'NG', upiId: 'neha@upi' },
];

export const cards: Card[] = [
  { id: '1', type: 'visa', last4: '4532', holder: 'SEJAL MAHADIK', expiry: '09/28', color: 'from-primary to-secondary', isDefault: true },
  { id: '2', type: 'mastercard', last4: '8821', holder: 'SEJAL MAHADIK', expiry: '03/27', color: 'from-accent to-primary', isDefault: false },
];

export const savingsGoals: SavingsGoal[] = [
  { id: '1', name: 'Goa Trip', icon: '✈️', target: 25000, saved: 18500, color: 'primary', autoSave: true, monthlyAmount: 3000 },
  { id: '2', name: 'New iPhone', icon: '📱', target: 80000, saved: 32000, color: 'secondary', autoSave: true, monthlyAmount: 5000 },
  { id: '3', name: 'Emergency Fund', icon: '🏦', target: 100000, saved: 67000, color: 'accent', autoSave: false },
];

export const moneyRequests: MoneyRequest[] = [
  { id: '1', from: 'Priya Sharma', amount: 500, note: 'Lunch split', status: 'pending', date: '2026-03-30' },
  { id: '2', from: 'Rahul Verma', amount: 1200, note: 'Movie tickets', status: 'paid', date: '2026-03-28' },
  { id: '3', from: 'Ankit Patel', amount: 350, note: 'Coffee', status: 'declined', date: '2026-03-27' },
];

export const spendingData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 800 },
  { name: 'Wed', amount: 2100 },
  { name: 'Thu', amount: 450 },
  { name: 'Fri', amount: 1800 },
  { name: 'Sat', amount: 3200 },
  { name: 'Sun', amount: 900 },
];

export const categorySpending = [
  { name: 'Food', value: 4500, color: 'hsl(217, 91%, 60%)' },
  { name: 'Transport', value: 2200, color: 'hsl(260, 60%, 58%)' },
  { name: 'Entertainment', value: 1800, color: 'hsl(172, 66%, 50%)' },
  { name: 'Bills', value: 6500, color: 'hsl(38, 92%, 50%)' },
  { name: 'Shopping', value: 3200, color: 'hsl(142, 71%, 45%)' },
];

export const walletBalance = 24850.75;
export const rewardPoints = 1240;
