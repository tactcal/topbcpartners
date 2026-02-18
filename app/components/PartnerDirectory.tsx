'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Globe, Star, CheckCircle2 } from 'lucide-react';

export default function PartnerDirectory({ listings }: { listings: any[] }) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    listings.forEach(l => {
      if (l.services) l.services.forEach((s: string) => tags.add(s));
    });
    return Array.from(tags).sort();
  }, [listings]);

  // 2. Filter logic
  const filteredListings = listings.filter(l => {
    const matchesTag = selectedTag === 'All' || (l.services && l.services.includes(selectedTag));
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Helper: Calculate Average Rating
  const getRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return null;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div>
      {/* FILTER BAR */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or keyword..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedTag('All')} className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedTag === 'All' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>All Partners</button>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-4 py-2 rounded-full text-sm font-bold transition ${selectedTag === tag ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{tag}</button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((partner) => {
            const rating = getRating(partner.reviews);
            const isGold = partner.tier === 'Gold';
            
            return (
              <Link href={`/partner/${partner.slug}`} key={partner.id} className="block group h-full">
                <div className={`
                  relative h-full bg-white rounded-2xl p-6 transition-all hover:shadow-lg flex flex-col
                  ${isGold ? 'border-2 border-amber-300 shadow-sm' : 'border border-slate-200'}
                `}>
                  
                  {/* TOP RIGHT CORNER BADGE (Gold Only) */}
                  {isGold && (
                    <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl border-b border-l border-amber-200 flex items-center gap-1">
                       <CheckCircle2 className="w-3 h-3" /> GOLD PARTNER
                    </div>
                  )}

                  {/* Header: Logo + Name + Under-Name Badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-slate-100 p-2 shadow-sm shrink-0">
                      {partner.logo_url ? <img src={partner.logo_url} className="w-full h-full object-contain" /> : <span className="text-3xl">🏢</span>}
                    </div>
                    
                    <div className="pt-1">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition">
                        {partner.name}
                      </h3>
                      
                      {/* PILL UNDER NAME */}
                      <div className="mt-2">
                        {isGold ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 inline-block">
                            GOLD
                          </span>
                        ) : partner.tier === 'Verified' ? (
                          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {partner.description}
                  </p>
                  
                  {/* Footer Line: Rating Left, Link Right */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    {/* Left: Rating */}
                    <div className="flex items-center gap-1.5">
                       <Star className={`w-4 h-4 ${rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                       <span className="text-sm font-bold text-slate-900">{rating || '0.0'}</span>
                    </div>

                    {/* Right: View Profile */}
                    <div className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:underline">
                      View Profile <Globe className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-slate-500">
            <p className="text-lg">No partners found.</p>
            <button onClick={() => { setSelectedTag('All'); setSearchQuery(''); }} className="text-blue-600 font-bold hover:underline mt-2">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}