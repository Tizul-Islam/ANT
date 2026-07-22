import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Plus, CreditCard, CheckCircle2 } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';

export default function Wallet() {
  useTitle("My Wallet | ANT");
  
  const [balance, setBalance] = useState(50000);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  
  const [transactions, setTransactions] = useState([
    { id: 'TXN-001', date: 'Jul 20, 2025, 10:00 AM', desc: 'Order Payment (ORD-89234)', amount: 12500, type: 'debit' },
    { id: 'TXN-002', date: 'Jul 15, 2025, 04:30 PM', desc: 'Wallet Top Up via Card', amount: 20000, type: 'credit' },
    { id: 'TXN-003', date: 'Jun 30, 2025, 01:15 PM', desc: 'Order Payment (ORD-11234)', amount: 2500, type: 'debit' },
    { id: 'TXN-004', date: 'Jun 28, 2025, 09:00 AM', desc: 'Wallet Top Up via bKash', amount: 50000, type: 'credit' },
  ]);

  const handleTopUp = (e) => {
    e.preventDefault();
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0) return toast.error("Please enter a valid amount");

    setBalance(prev => prev + amount);
    
    // Add to ledger
    const newTxn = {
      id: `TXN-${Math.floor(Math.random() * 900) + 100}`,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      desc: 'Wallet Top Up via Card',
      amount: amount,
      type: 'credit'
    };
    
    setTransactions([newTxn, ...transactions]);
    setTopUpAmount('');
    setIsTopUpOpen(false);
    toast.success(`Successfully added BDT ${amount.toLocaleString()} to your wallet!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">ANT Wallet</h1>
        <p className="text-sm text-zinc-400">Manage your balance and view transaction history.</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-[#0c0d10] border border-indigo-500/20 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <WalletIcon className="w-48 h-48 text-indigo-400" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-indigo-300 text-sm font-medium mb-2 flex items-center gap-2">
              Available Balance
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </p>
            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              <span className="text-2xl text-indigo-400 mr-2">BDT</span>
              {balance.toLocaleString()}
            </div>
          </div>
          
          <button 
            onClick={() => setIsTopUpOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Top Up Wallet
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">Transaction History</h2>
        </div>
        
        {transactions.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {transactions.map(txn => (
              <div key={txn.id} className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#111216] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${txn.type === 'credit' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
                    {txn.type === 'credit' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm sm:text-base">{txn.desc}</h3>
                    <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                      <span>{txn.id}</span>
                      <span>•</span>
                      <span>{txn.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`font-bold whitespace-nowrap ${txn.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                  {txn.type === 'credit' ? '+' : '-'} BDT {txn.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500">
            No transactions found.
          </div>
        )}
      </div>

      {/* Top Up Modal Overlay */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Top Up Wallet</h2>
              <button onClick={() => setIsTopUpOpen(false)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleTopUp} className="p-6 space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Amount (BDT)</label>
                <input 
                  type="number" 
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-lg"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1000, 5000, 10000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt.toString())}
                    className="bg-[#0a0a0c] border border-zinc-800 hover:border-indigo-500 text-zinc-300 hover:text-indigo-400 py-2 rounded-lg text-sm transition-colors"
                  >
                    +{amt}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <button 
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Pay
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
