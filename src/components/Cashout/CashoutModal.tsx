import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Wallet, CreditCard, Ban as Bank, AlertCircle, CheckCircle, ArrowRight, Info, Shield, Clock, TrendingUp } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

interface CashoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CashoutModal: React.FC<CashoutModalProps> = ({ isOpen, onClose }) => {
  const { wallet, user } = useUserStore();
  const [step, setStep] = useState<'method' | 'amount' | 'details' | 'confirm' | 'processing' | 'success'>('method');
  const [cashoutMethod, setCashoutMethod] = useState<'crypto' | 'bank' | 'card'>('crypto');
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    bankName: ''
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cardholderName: ''
  });
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const availableBalance = wallet?.balance || 0;
  const maxCashout = availableBalance * 0.95; // 5% kept for gas fees
  const estimatedFee = parseFloat(amount) * 0.025; // 2.5% fee
  const netAmount = parseFloat(amount) - estimatedFee;

  const cashoutMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency Wallet',
      description: 'Instant transfer to your crypto wallet',
      icon: Wallet,
      fee: '0.5%',
      time: 'Instant',
      color: 'primary'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct deposit to your bank account',
      icon: Bank,
      fee: '2.5%',
      time: '1-3 business days',
      color: 'secondary'
    },
    {
      id: 'card',
      name: 'Debit Card',
      description: 'Fast transfer to your debit card',
      icon: CreditCard,
      fee: '3.5%',
      time: '30 minutes',
      color: 'accent'
    }
  ];

  const handleCashout = async () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setStep('success');
    setIsProcessing(false);
  };

  const resetModal = () => {
    setStep('method');
    setCashoutMethod('crypto');
    setAmount('');
    setBankDetails({ accountNumber: '', routingNumber: '', accountName: '', bankName: '' });
    setCardDetails({ cardNumber: '', expiryDate: '', cardholderName: '' });
    setCryptoAddress('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] glass-effect rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20">
                  <DollarSign size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Cashout
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Withdraw your earnings
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Balance Display */}
              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Available Balance</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {availableBalance.toFixed(4)} ETH
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      ≈ ${(availableBalance * 2400).toLocaleString()} USD
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <TrendingUp size={16} />
                      <span className="text-sm font-medium">+12.5%</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">24h change</p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {step === 'method' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Choose Cashout Method
                  </h3>
                  
                  {cashoutMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.button
                        key={method.id}
                        onClick={() => setCashoutMethod(method.id as any)}
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          cashoutMethod === method.id
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r from-${method.color}-500/20 to-${method.color}-600/20`}>
                            <Icon size={24} className={`text-${method.color}-600 dark:text-${method.color}-400`} />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                              {method.name}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {method.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                                Fee: {method.fee}
                              </span>
                              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                                {method.time}
                              </span>
                            </div>
                          </div>
                          <ArrowRight size={20} className="text-slate-400" />
                        </div>
                      </motion.button>
                    );
                  })}
                  
                  <button
                    onClick={() => setStep('amount')}
                    className="w-full btn-primary mt-6"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 'amount' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Enter Amount
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Amount to Cashout (ETH)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          max={maxCashout}
                          step="0.0001"
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                        <button
                          onClick={() => setAmount(maxCashout.toString())}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                        >
                          Max
                        </button>
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[0.25, 0.5, 1.0, 2.0].map((quickAmount) => (
                        <button
                          key={quickAmount}
                          onClick={() => setAmount(quickAmount.toString())}
                          className="py-2 px-3 bg-white/20 dark:bg-black/20 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
                        >
                          {quickAmount} ETH
                        </button>
                      ))}
                    </div>

                    {/* Fee Breakdown */}
                    {amount && parseFloat(amount) > 0 && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Amount</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {parseFloat(amount).toFixed(4)} ETH
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Processing Fee</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            -{estimatedFee.toFixed(4)} ETH
                          </span>
                        </div>
                        <div className="border-t border-slate-300 dark:border-slate-600 pt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">You'll receive</span>
                            <span className="font-bold text-green-600 dark:text-green-400">
                              {netAmount.toFixed(4)} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep('method')}
                      className="flex-1 btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('details')}
                      disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxCashout}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {cashoutMethod === 'crypto' && 'Wallet Details'}
                    {cashoutMethod === 'bank' && 'Bank Account Details'}
                    {cashoutMethod === 'card' && 'Card Details'}
                  </h3>

                  {cashoutMethod === 'crypto' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        value={cryptoAddress}
                        onChange={(e) => setCryptoAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      />
                    </div>
                  )}

                  {cashoutMethod === 'bank' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          value={bankDetails.accountName}
                          onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={bankDetails.bankName}
                          onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={bankDetails.accountNumber}
                            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                            className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Routing Number
                          </label>
                          <input
                            type="text"
                            value={bankDetails.routingNumber}
                            onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                            className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {cashoutMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cardholderName}
                          onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep('amount')}
                      className="flex-1 btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('confirm')}
                      className="flex-1 btn-primary"
                    >
                      Review
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'confirm' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Confirm Cashout
                  </h3>

                  <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Method</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {cashoutMethods.find(m => m.id === cashoutMethod)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Amount</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {parseFloat(amount).toFixed(4)} ETH
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Fee</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {estimatedFee.toFixed(4)} ETH
                      </span>
                    </div>
                    <div className="border-t border-slate-300 dark:border-slate-600 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">You'll receive</span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {netAmount.toFixed(4)} ETH
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                          Important Notice
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          This transaction cannot be reversed. Please verify all details before confirming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep('details')}
                      className="flex-1 btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCashout}
                      className="flex-1 btn-primary"
                    >
                      Confirm Cashout
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Processing Cashout
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Please wait while we process your withdrawal...
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Cashout Successful!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Your withdrawal of {netAmount.toFixed(4)} ETH has been processed successfully.
                  </p>
                  <button
                    onClick={handleClose}
                    className="btn-primary"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};