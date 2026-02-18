import { notFound } from 'next/navigation';
import { supabase } from '@/app/utils/supabase';
import { ShieldCheck, Globe, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Helper for Badge Colors (same as Home page)
const getBadgeStyle = (tier: string) => {
  switch (tier?.toLowerCase()) {
    case 'gold': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'verified': return 'bg-blue-600 text-white border-blue-700 shadow-sm';
    case 'silver': return 'bg-slate-100 text-slate-700 border-slate-200';
    default: return 'bg-slate-50 text-slate-500 border-slate-100';
  }
};

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch partner data
  const { data: partner } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!partner) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. BREADCRUMB HEADER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        
        {/* 2. MAIN CONTENT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {partner.type}
                  </span>
                  {partner.tier && partner.tier !== 'Member' && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border flex items-center gap-1 ${getBadgeStyle(partner.tier)}`}>
                      {partner.tier === 'Verified' && <ShieldCheck className="w-3 h-3" />}
                      {partner.tier} Partner
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{partner.name}</h1>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" /> Serving Global / Remote
                </div>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p>{partner.description || "No description provided."}</p>
            </div>
          </div>

          {/* Services Section (Placeholder for future data) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Expertise & Focus</h3>
            {/* Services Section (Connected to Database) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Expertise & Focus</h3>
            
            {partner.services && partner.services.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {partner.services.map((service: string) => (
                  <div key={service} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No specific services listed.</p>
            )}
          </div>
          </div>
        </div>

        {/* 3. SIDEBAR (Sticky Call-to-Action) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Contact {partner.name}</h3>
            <p className="text-slate-500 text-sm mb-6">
              Connect directly with their team to discuss your Business Central project.
            </p>
            
            {partner.website_url ? (
              <a 
                href={partner.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3.5 rounded-xl transition shadow-md shadow-blue-200 mb-3"
              >
                Visit Website <Globe className="inline w-4 h-4 ml-1" />
              </a>
            ) : (
              <button disabled className="block w-full bg-slate-100 text-slate-400 font-bold py-3.5 rounded-xl cursor-not-allowed">
                Website Not Available
              </button>
            )}
            
            <div className="text-center text-xs text-slate-400 mt-4">
              Member of TopBCPartners since 2024
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}