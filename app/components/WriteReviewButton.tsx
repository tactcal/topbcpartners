'use client';

import { useState } from 'react';
import ReviewForm from './ReviewForm';

export default function WriteReviewButton({ partnerId, partnerName }: { partnerId: string, partnerName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Write a Review
      </button>

      {isOpen && (
        <ReviewForm 
          partnerId={partnerId} 
          partnerName={partnerName} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}