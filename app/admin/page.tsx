'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Check, Trash2, Clock, User } from 'lucide-react';

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch only pending reviews
  async function fetchPendingReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select(`*, listings(name)`)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (!error) setReviews(data || []);
    setLoading(false);
  }

  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get('key');
  if (secret !== 'your-secret-password-here') {
    window.location.href = '/'; // Kick them back to home if wrong key
    return;
  }
    fetchPendingReviews();
  }, []);

  // 2. Function to Approve
  async function handleApprove(id: string) {
    const { error } = await supabase
      .from('reviews')
      .update({ status: 'approved' })
      .eq('id', id);

    if (!error) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  }

  // 3. Function to Delete (Reject)
  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (!error) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  }

  if (loading) return <div className="p-20 text-center">Loading Moderation Queue...</div>;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Moderation Queue</h1>
          <p className="text-slate-500">You have {reviews.length} reviews waiting for approval.</p>
        </header>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <p className="text-slate-500">All caught up! No pending reviews.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> PENDING
                    </span>
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                      For: {review.listings?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{review.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">"{review.body}"</p>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" /> <strong>{review.reviewer_name}</strong>
                    </div>
                    <span>•</span>
                    <span>{review.reviewer_industry}</span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 justify-center">
                  <button 
                    onClick={() => handleApprove(review.id)}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition"
                  >
                    <Trash2 className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}