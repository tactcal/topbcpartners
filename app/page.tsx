import { supabase } from '@/app/utils/supabase';
import PartnerDirectory from '@/app/components/PartnerDirectory';

// Revalidate data every hour so the site stays fast but fresh
export const revalidate = 3600; 

export default async function Home() {
  // 1. Fetch ALL data on the server
  const { data: listings } = await supabase
    .from('listings')
    .select('*, reviews(rating)')
    .order('tier', { ascending: false }); // Gold first

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Best <span className="text-blue-400">Dynamics 365</span> Partner
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            A curated directory of top-rated Microsoft Business Central partners, ISVs, and consultants.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <PartnerDirectory listings={listings || []} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500">
          <p>© 2026 Top BC Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}