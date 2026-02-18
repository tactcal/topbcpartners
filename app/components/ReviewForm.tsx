'use client';
import { useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { Star, Send } from 'lucide-react';

export default function ReviewForm({ partnerId }: { partnerId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a star rating!');
      return;
    }
    setLoading(true);

    const { error } = await supabase.from('reviews').insert({
      listing_id: partnerId,
      rating,
      reviewer_name: name,
      reviewer_industry: industry,
      title,
      body,
      status: 'pending' // Important: Sends to moderation queue
    });

    if (error) {
      alert('Error submitting review: ' + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Review Submitted!</h3>
        <p className="text-green-700">
          Thanks, {name}! Your review is now pending approval by our moderation team.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mt-12">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              <Star 
                className={`w-8 h-8 ${star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
              />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Industry (e.g. Manufacturing)"
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Review Title (e.g. Great implementation experience)"
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Share your experience working with this partner..."
          rows={4}
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}