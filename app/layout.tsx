import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/app/utils/supabase';
import { Suspense } from 'react';
import { CSPostHogProvider } from './providers';
import PostHogPageView from '@/app/components/PostHogPageView';

const inter = Inter({ subsets: ["latin"] });
// 1. DYNAMIC SEO GENERATOR

// This sets the default SEO for the whole site
export const metadata: Metadata = {
  title: {
    template: "%s | Top BC Partners", // Example: "Tigunia | Top BC Partners"
    default: "Top BC Partners | Find the Best Dynamics 365 Consultants",
  },
  description: " The premier directory for Microsoft Dynamics 365 Business Central partners. Compare top-rated implementation experts, ISVs, and support providers.",
  openGraph: {
    title: "Top BC Partners",
    description: "Find the perfect Microsoft Dynamics 365 partner for your business.",
    url: "https://topbcpartners.com",
    siteName: "Top BC Partners",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CSPostHogProvider>
          {/* 1. Global Utilities (Invisible) */}
          <Suspense fallback={null}>
             <PostHogPageView />
          </Suspense>

          {/* 2. GLASS NAVBAR (Always at the top) */}
          <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 h-16 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 group">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                TopBC<span className="text-blue-600">Partners</span>
                </span>
              </a>

              <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                <Link href="/" className="hover:text-blue-600 transition">Directory</Link>
                <Link href="#" className="hover:text-blue-600 transition">For ISVs</Link>
                <Link href="/about" className="hover:text-blue-600 transition">About</Link>
              </div>

              <Link 
                href="/get-listed" 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
              >
                List Your Firm
              </Link>
            </div>
          </nav>
          
          {/* 3. THE PAGE CONTENT (Rendered exactly ONCE) */}
          <main className="pt-16 min-h-screen">
            {children}
          </main>

          {/* 4. MODERN FOOTER */}
          <footer className="bg-white border-t border-slate-200 py-12 mt-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <span className="text-lg font-bold text-slate-900">TopBCPartners</span>
                <p className="text-slate-500 mt-4 max-w-xs text-sm leading-relaxed">
                  The most trusted directory for Microsoft Dynamics 365 Business Central partners and ISVs.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Directory</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Top Rated</a></li>
                  <li><a href="#" className="hover:text-blue-600">Recently Added</a></li>
                  <li><a href="#" className="hover:text-blue-600">ISV Marketplace</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </CSPostHogProvider>
      </body>
    </html>
  );
}