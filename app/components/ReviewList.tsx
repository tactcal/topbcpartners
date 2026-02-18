import { supabase } from '../utils/supabase';
import { Star, User } from 'lucide-react';

export default async function ReviewList({ partnerId }: { partnerId: string }) {
  // 1. Fetch only APPROVED reviews for this partner
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('listing_id', partnerId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  // 2. If no reviews exist, show the empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 bg-slate-50 rounded-lg text-center border border-dashed border-slate-300">
        <p className="text-slate-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  // 3. Render the reviews
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-blue-100 p-1 rounded-full">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
  <User className="w-5 h-5 text-blue-600" />
</div>
<div>
  <p className="font-bold text-slate-900 text-sm leading-tight">
    {review.reviewer_name || 'Verified Client'}
  </p>
  <p className="text-slate-500 text-xs">
    {review.reviewer_industry || 'Business Central User'}
  </p>
</div>
              </div>
              <h4 className="font-bold text-lg text-slate-900">{review.title}</h4>
            </div>
            <span className="text-slate-400 text-xs">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
           <Star 
  key={star} 
  // FORCE the fill color to Gold (#facc15) or Transparent
  fill={star <= review.rating ? "#facc15" : "none"}
  // FORCE the outline color to Gold or Gray (#cbd5e1)
  color={star <= review.rating ? "#facc15" : "#cbd5e1"}
  className="w-4 h-4" 
/>
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed">
            {review.body}
          </p>
        </div>
      ))}
    </div>
  );
}