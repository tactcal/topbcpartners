'use client';
import { useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { ShieldCheck, X } from 'lucide-react';

interface ClaimButtonProps {
  partnerId: string;
  partnerName: string;
}

export default function ClaimButton({ partnerId, partnerName }: ClaimButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('claims').insert({
      listing_id: partnerId,
      contact_name: name,
      work_email: email,
      message,
      status: 'pending'
    });

    if (error) {
      alert('Error sending request: ' + error.message);
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  // Helper to close and reset
  const handleClose = () => {
    setIsOpen(false);
    // Optional: wait a bit to reset form so user doesn't see it flash
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 300);
  };

  return (
    <>
      {/* 1. The Trigger Button (Always Visible) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-4 rounded-xl transition text-sm border border-slate-200"
      >
        <ShieldCheck className="w-4 h-4" /> 
        Own this business? Claim it.
      </button>

      {/* 2. The Modal (Only visible if isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-2xl">
            
            <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            
            {/* 3. Conditional Content: Show Success OR Show Form */}
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                <p className="text-slate-600 mb-6">
                  Thanks, {name}. We will verify your email <strong>({email})</strong> and grant you access shortly.
                </p>
                <button 
                  onClick={handleClose} 
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              // The FORM
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Claim {partnerName}</h3>
                <p className="text-slate-500 text-sm mb-6">Verify your identity to manage this profile.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="john@company.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message (Optional)</label>
                    <textarea 
                      value={message} 
                      onChange={e => setMessage(e.target.value)} 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                      rows={2} 
                      placeholder="I am the Marketing Director..." 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Submit Claim Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}