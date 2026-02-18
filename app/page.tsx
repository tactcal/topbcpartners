import { supabase } from './utils/supabase';
import Link from 'next/link';
import { Search, ShieldCheck, CheckCircle, Globe, Star, ArrowRight } from 'lucide-react';

// Force dynamic rendering so search works instantly
export const dynamic = 'force-dynamic';

async function getPartners(query: string) {
  // 1. Fetch ALL partners from Supabase
  let { data: partners, error } = await supabase
    .from('listings')
    .select('*')
    // Sort by Priority (Gold=3, Verified=2, Member=1), then Name
    .order('ranking_priority', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Database Error:', error.message);
    return [];
  }

  // 2. Filter in memory if there is a search query
  if (!partners) return [];
  if (!query) return partners;

  const lowerQuery = query.toLowerCase();
  return partners.filter((partner) => {
    const nameMatch = partner.name?.toLowerCase().includes(lowerQuery);
    const typeMatch = partner.type?.toLowerCase().includes(lowerQuery);
    return nameMatch || typeMatch;
  });
}

// 3. Helper for Badge Colors
const getBadgeStyle = (tier: string) => {
  switch (tier?.toLowerCase()) {
    case 'gold': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'verified': return 'bg-blue-600 text-white border-blue-700 shadow-sm';
    case 'member': return 'bg-slate-100 text-slate-500 border-slate-200';
    default: return 'bg-slate-50 text-slate-400 border-slate-100';
  }
};

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
  const query = params.query || '';
  const partners = await getPartners(query);

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section className="bg-blue-900 text-white py-24 px-6 text-center shadow-inner relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Find <span className="text-blue-400">Business Central</span> Partners
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            The definitive directory for Microsoft Dynamics 365 BC experts.
          </p>
          
          {/* INLINE SEARCH BAR (No external component needed) */}
          <form className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              name="query"
              defaultValue={query}
              placeholder="Search by name (e.g. 'Innovia') or type (e.g. 'ISV')..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-xl"
            />
          </form>

          {/* QUICK FILTERS */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/?query=isv" className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-all">
              ISVs & Add-ons
            </Link>
            <Link href="/?query=reseller" className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full transition-all">
              Implementation Partners
            </Link>
            {query && (
              <Link href="/" className="text-sm font-semibold text-blue-200 hover:text-white px-5 py-2.5 transition-all">
                Clear Filters
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* DIRECTORY GRID */}
      <section className="max-w-7xl mx-auto py-16 px-6 -mt-8 relative z-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {query ? `Results for "${query}"` : 'Top Rated Partners'}
          </h2>
          <span className="text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {partners.length} Results
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className={`
              group relative bg-white rounded-2xl p-6 transition-all hover:-translate-y-1 flex flex-col h-full
              ${partner.tier === 'Gold' ? 'border-2 border-amber-200 shadow-lg shadow-amber-50' : 'border border-slate-200 shadow-sm hover:shadow-md'}
            `}>
              
              {/* GOLD BADGE (Top Right) */}
              {partner.tier === 'Gold' && (
                <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg border-b border-l border-amber-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> GOLD PARTNER
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                {/* LOGO AREA (The New Feature!) */}
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold border overflow-hidden shrink-0
                  ${partner.tier === 'Gold' ? 'bg-white border-amber-100' : 'bg-slate-50 border-slate-100 text-slate-400'}
                `}>
                  {/* LOGO LOGIC: Show image ONLY if they are Verified/Gold AND have a URL */}
                  {partner.logo_url && (partner.tier === 'Verified' || partner.tier === 'Gold') ? (
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span>{partner.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition">
                    {partner.name}
                  </h3>
                  
                  {/* TIER BADGE */}
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit flex items-center gap-1 ${getBadgeStyle(partner.tier)}`}>
                     {partner.tier === 'Verified' && <ShieldCheck className="w-3 h-3" />}
                     {partner.tier}
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow">
                {partner.description || "Microsoft Dynamics 365 Business Central partner."}
              </p>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <div className="flex items-center gap-1 text-slate-700">
                   <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                   <span className="text-sm font-bold">{partner.rating_avg || '0.0'}</span>
                </div>
                
                {partner.tier === 'Member' ? (
                   <Link href={`/partner/${partner.slug}`} className="text-sm font-bold text-slate-400 hover:text-slate-600 flex items-center">
                     View <ArrowRight className="w-3 h-3 ml-1" />
                   </Link>
                ) : (
                   <Link href={`/partner/${partner.slug}`} className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                     View Profile <Globe className="w-3 h-3" />
                   </Link>
                )}
              </div>
            </div>
          ))}

          {partners.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-400 text-lg">No partners found matching "{query}"</p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}