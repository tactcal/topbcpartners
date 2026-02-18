import React from 'react';
import { CheckCircle, XCircle, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "List Your Firm | Join TopBCPartners",
  description: "Get your Microsoft Dynamics 365 Business Central practice in front of thousands of potential clients.",
};

export default function GetListedPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      
      {/* HERO HEADER */}
      <section className="bg-blue-900 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Grow Your <span className="text-blue-400">Microsoft Practice</span>
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join the definitive directory for Dynamics 365 Business Central partners. 
          Stop relying on word-of-mouth and start getting discovered.
        </p>
      </section>

      {/* PRICING GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* 1. MEMBER TIER (The "Anchor") */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-2">Member</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">Free</span>
              <span className="text-slate-400 font-medium">/ forever</span>
            </div>
            <p className="text-slate-600 text-sm mb-8 h-10">
              Basic listing to ensure your firm is found in the directory database.
            </p>
            
            <Link href="mailto:submit@topbcpartners.com?subject=New Member Application" 
              className="block w-full text-center py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 transition mb-8">
              Join for Free
            </Link>

            <div className="space-y-4 text-sm">
              <p className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Includes:</p>
              <li className="flex items-start gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span>Company Name & Description</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span>Searchable in Directory</span>
              </li>
              {/* The "Pain" Points */}
              <li className="flex items-start gap-3 text-slate-400">
                <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
                <span>No Company Logo</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
                <span>No Website Link (SEO)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <XCircle className="w-5 h-5 text-slate-300 shrink-0" />
                <span>Lowest Ranking Priority</span>
              </li>
            </div>
          </div>

          {/* 2. VERIFIED TIER (The "Hero") */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-600 relative transform md:-translate-y-4 z-10">
            <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-xs font-bold text-center py-1.5 uppercase tracking-widest rounded-t-lg">
              Most Popular
            </div>
            <h3 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-2 mt-4">Verified Partner</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">$49</span>
              <span className="text-slate-400 font-medium">/ mo</span>
            </div>
            <p className="text-slate-600 text-sm mb-8 h-10">
              Build trust with the "Blue Badge" and drive traffic to your website.
            </p>
            
            <Link href="mailto:sales@topbcpartners.com?subject=Verified Partner Application" 
              className="block w-full text-center py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition mb-8 flex items-center justify-center gap-2">
              Get Verified <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-4 text-sm">
              <p className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Everything in Free, plus:</p>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Blue "Verified" Badge</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span><strong>Company Logo</strong> Displayed</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span><strong>DoFollow Website Link</strong> (SEO)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span>"Visit Website" Button</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Priority Search Ranking (Tier 2)</span>
              </li>
            </div>
          </div>

          {/* 3. GOLD TIER (The "Anchor") */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <h3 className="text-lg font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" /> Gold Partner
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-white">$199</span>
              <span className="text-slate-400 font-medium">/ mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 h-10">
              Dominate the directory. Maximum visibility for established firms.
            </p>
            
            <Link href="mailto:sales@topbcpartners.com?subject=Gold Partner Inquiry" 
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold hover:to-amber-400 transition mb-8 shadow-lg shadow-amber-900/20">
              Apply for Gold
            </Link>

            <div className="space-y-4 text-sm text-slate-300">
              <p className="font-bold text-white border-b border-slate-700 pb-2 mb-4">Everything in Verified, plus:</p>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-white font-medium">#1 Top Ranking Priority</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-white">Gold "Top Tier" Badge</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Featured on Homepage</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Rich Profile (Video & Case Studies)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Lead Capture Form</span>
              </li>
            </div>
          </div>

        </div>

        {/* TRUST BADGES / SOCIAL PROOF */}
        <div className="mt-20 text-center border-t border-slate-200 pt-16">
          <p className="text-slate-500 font-medium mb-6 uppercase tracking-widest text-xs">Trusted by Top Dynamics Firms</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* You can replace these with real partner logos later */}
            <div className="h-8 font-bold text-slate-400 text-xl">Innovia</div>
            <div className="h-8 font-bold text-slate-400 text-xl">ArcherPoint</div>
            <div className="h-8 font-bold text-slate-400 text-xl">Tigunia</div>
            <div className="h-8 font-bold text-slate-400 text-xl">Stoneridge</div>
          </div>
        </div>

      </section>
    </main>
  );
}