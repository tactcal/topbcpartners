import { supabase } from '@/app/utils/supabase';
import { notFound } from 'next/navigation';
import ReviewForm from '@/app/components/ReviewForm';

// 1. Notice how we type 'params' as a Promise now
export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) {
  
  // 2. UNLOCK the params by awaiting them
  const { slug } = await params;

  // 3. Fetch the partner AND their reviews using the unlocked 'slug'
  const { data: partner } = await supabase
    .from('listings')
    .select('*, reviews(*)') // This grabs the partner + all their reviews
    .eq('slug', slug)
    .single();

  // 4. If no partner found, show 404
  if (!partner) {
    notFound();
  }

  // ... (Keep your return statement below here)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Header Section (Logo, Name, etc.) */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Logo Box */}
            <div className="w-32 h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4">
              {partner.logo_url ? (
                <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-4xl">🏢</span>
              )}
            </div>
            
            {/* Title & Badges */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {partner.tier === 'Gold' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                    🥇 GOLD PARTNER
                  </span>
                )}
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                  {partner.type || 'Reseller'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{partner.name}</h1>
              <p className="text-slate-500 text-lg max-w-2xl">{partner.description}</p>
            </div>

            {/* CTA Button */}
            <a 
              href={partner.website_url} 
              target="_blank" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-blue-200"
            >
              Visit Website
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Expertise & Reviews (2/3 width) */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Expertise Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              🛠️ Expertise & Focus
            </h3>
            {partner.services && partner.services.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {partner.services.map((service: string) => (
                  <div key={service} className="flex items-center gap-3 text-slate-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No specific services listed.</p>
            )}
          </section>

          {/* REVIEWS DISPLAY SECTION (New!) */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Client Reviews ({partner.reviews ? partner.reviews.filter((r: any) => r.status === 'approved').length : 0})
            </h3>

            <div className="space-y-4">
              {partner.reviews && partner.reviews.filter((r: any) => r.status === 'approved').length > 0 ? (
                partner.reviews
                  .filter((r: any) => r.status === 'approved')
                  .map((review: any) => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                    <h4 className="font-bold text-lg text-slate-900">{review.title}</h4>
                    <p className="text-slate-600 mt-2 mb-4">"{review.body}"</p>
                    <div className="text-sm text-slate-400 font-medium">
                      — {review.reviewer_name}, <span className="text-slate-500">{review.reviewer_industry}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic p-4 bg-slate-100 rounded-xl">
                  No reviews yet. Be the first to share your experience!
                </div>
              )}
            </div>
          </section>

          {/* REVIEW FORM SECTION (Moved Outside!) */}
          <section>
             <ReviewForm partnerId={partner.id} />
          </section>

        </div>

        {/* RIGHT COLUMN: Sidebar (1/3 width) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Contact Info</h3>
            <div className="space-y-3 text-slate-600">
              <p>📍 Headquarters: USA</p>
              <p>🌐 {partner.website_url}</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}