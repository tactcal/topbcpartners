'use client'; 

import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { supabase } from '@/app/utils/supabase';

export default function ReviewForm({ partnerId, partnerName, onClose }: { partnerId: string, partnerName: string, onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');     // NEW
  const [industry, setIndustry] = useState(''); // NEW
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
  .from('reviews')
  .insert([
    {
      listing_id: partnerId,
      rating,
      reviewer_name: name,         
      reviewer_industry: industry, 
      title,
      body,
      status: 'pending' 
      // Ensure no other fields like reviewer_id are listed here
    }
  ]);

    setIsSubmitting(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Review submitted for approval!');
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform transition-all scale-100">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-slate-900 mb-2">Review {partnerName}</h2>
        <p className="text-slate-500 mb-8">Your feedback helps others choose the right partner.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Name & Industry Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Industry</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Manufacturing"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Star Rating */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Overall Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
  className="w-8 h-8 transition-all" 
  // This forces the color regardless of CSS loading issues
  fill={star <= (hover || rating) ? "#facc15" : "none"}
  color={star <= (hover || rating) ? "#facc15" : "#cbd5e1"}
  strokeWidth={star <= (hover || rating) ? 0 : 2}
/>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">One-Line Summary</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Saved us 20 hours a week"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 4. Body */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Detailed Review</label>
            <textarea 
              required
              rows={4}
              placeholder="What did they do well? What could be better?"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || rating === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all transform hover:-translate-y-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}