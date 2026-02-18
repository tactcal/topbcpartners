'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  Trash2, 
  Clock, 
  User, 
  LogOut, 
  LayoutGrid, 
  MessageSquare,
  ShieldCheck, // New Icon
  Mail // New Icon
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'partners' | 'claims'>('reviews');
  const [reviews, setReviews] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]); // New State for Claims
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- 1. Security & Initial Fetch ---
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      await Promise.all([fetchReviews(), fetchListings(), fetchClaims()]);
      setLoading(false);
    };
    init();
  }, [router]);

  // --- 2. Data Fetching ---
  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select(`*, listings(name)`)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (data) setReviews(data);
  }

  async function fetchListings() {
    const { data } = await supabase
      .from('listings')
      .select('*')
      .order('tier', { ascending: false });
    if (data) setListings(data);
  }

  // New Fetch for Claims
  async function fetchClaims() {
    const { data } = await supabase
      .from('claims')
      .select(`*, listings(name)`)
      .eq('status', 'pending') // Only show pending claims
      .order('created_at', { ascending: false });
    if (data) setClaims(data);
  }

  // --- 3. Actions ---
  async function handleApproveReview(id: string) {
    const { error } = await supabase.from('reviews').update({ status: 'approved' }).eq('id', id);
    if (!error) setReviews(reviews.filter(r => r.id !== id));
  }

  async function handleDeleteReview(id: string) {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) setReviews(reviews.filter(r => r.id !== id));
  }

  const handleUpdatePartner = async (id: string, field: string, value: any) => {
    setListings(listings.map(l => l.id === id ? { ...l, [field]: value } : l));
    await supabase.from('listings').update({ [field]: value }).eq('id', id);
  };

  // New Action: Dismiss Claim (Hide it from the list)
  async function handleDismissClaim(id: string) {
    // We just mark it as 'reviewed' so it doesn't delete the data, but hides it from the queue
    const { error } = await supabase.from('claims').update({ status: 'reviewed' }).eq('id', id);
    if (!error) setClaims(claims.filter(c => c.id !== id));
  }

  // --- 4. Render ---
  if (loading) return <div className="p-20 text-center text-slate-500">Loading Command Center...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          🛡️ Admin Command Center
        </h1>
        <button 
          onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
          className="text-sm font-medium text-slate-500 hover:text-red-600 flex items-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </nav>

      <main className="max-w-6xl mx-auto py-8 px-6">
        
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition border-b-2 ${
              activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 
            Reviews 
            {reviews.length > 0 && <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full">{reviews.length}</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('claims')}
            className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition border-b-2 ${
              activeTab === 'claims' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 
            Claim Requests
            {claims.length > 0 && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">{claims.length}</span>}
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition border-b-2 ${
              activeTab === 'partners' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> 
            Partner Database
          </button>
        </div>

        {/* TAB 1: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {reviews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500">No pending reviews.</div>
            ) : (
              reviews.map((review) => (
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
                      <User className="w-3 h-3" /> <strong>{review.reviewer_name}</strong>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 justify-center">
                    <button onClick={() => handleApproveReview(review.id)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"><Check className="w-4 h-4" /> Approve</button>
                    <button onClick={() => handleDeleteReview(review.id)} className="flex items-center gap-2 bg-white border border-slate-200 hover:text-red-600 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition"><Trash2 className="w-4 h-4" /> Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: CLAIMS (New!) */}
        {activeTab === 'claims' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {claims.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500">No pending claims.</div>
            ) : (
              claims.map((claim) => (
                <div key={claim.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> CLAIM REQUEST
                      </span>
                      <span className="text-slate-500 text-sm font-bold">
                        Target: {claim.listings?.name}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Contact Name</div>
                        <div className="text-slate-900 font-medium">{claim.contact_name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Work Email</div>
                        <a href={`mailto:${claim.work_email}`} className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {claim.work_email}
                        </a>
                      </div>
                    </div>
                    
                    {claim.message && (
                      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 mb-2">
                        "{claim.message}"
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 justify-center min-w-[140px]">
                    <a 
                      href={`mailto:${claim.work_email}?subject=Regarding your claim for ${claim.listings?.name}&body=Hi ${claim.contact_name},%0D%0A%0D%0AI received your request to claim the ${claim.listings?.name} profile on Top BC Partners.`}
                      className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition text-center"
                    >
                      <Mail className="w-4 h-4" /> Reply
                    </a>
                    <button 
                      onClick={() => handleDismissClaim(claim.id)}
                      className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition"
                    >
                      <Check className="w-4 h-4" /> Mark Done
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: PARTNERS */}
        {activeTab === 'partners' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-700 w-1/4">Partner</th>
                  <th className="p-4 font-semibold text-slate-700 w-1/3">Description</th>
                  <th className="p-4 font-semibold text-slate-700 w-1/4">Services</th>
                  <th className="p-4 font-semibold text-slate-700 w-1/6">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listings.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50 transition group">
                    <td className="p-4 align-top">
                      <div className="font-bold text-slate-900">{partner.name}</div>
                      <div className="text-xs text-slate-400">{partner.slug}</div>
                    </td>
                    <td className="p-4 align-top">
                      <textarea
                        className="w-full p-2 border border-slate-200 rounded bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition text-slate-600"
                        rows={3}
                        defaultValue={partner.description || ''}
                        onBlur={(e) => handleUpdatePartner(partner.id, 'description', e.target.value)}
                      />
                    </td>
                    <td className="p-4 align-top">
                      <textarea
                        className="w-full p-2 border border-slate-200 rounded bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition text-slate-600"
                        rows={3}
                        defaultValue={partner.services ? partner.services.join(', ') : ''}
                        onBlur={(e) => {
                          const array = e.target.value.split(',').map((s: string) => s.trim());
                          handleUpdatePartner(partner.id, 'services', array);
                        }}
                      />
                    </td>
                    <td className="p-4 align-top">
                      <select
                        className="w-full p-2 border border-slate-200 rounded bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
                        value={partner.tier}
                        onChange={(e) => handleUpdatePartner(partner.id, 'tier', e.target.value)}
                      >
                        <option value="Gold">🥇 Gold</option>
                        <option value="Verified">✅ Verified</option>
                        <option value="Member">Member</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}