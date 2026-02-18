import React from 'react';
import { ShieldCheck, Users, Globe, Award } from 'lucide-react';

export const metadata = {
  title: "About Us",
  description: "Learn about the mission behind TopBCPartners—the definitive directory for Microsoft Dynamics 365 Business Central.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HEADER SECTION */}
      <section className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Mission</h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Connecting businesses with the world's most reliable Microsoft Dynamics 365 Business Central partners and ISVs.
        </p>
      </section>

      {/* CORE CONTENT */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why topbcpartners.com?</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Finding the right partner for a Business Central implementation can be the difference between digital transformation and project failure. We built this directory to provide a transparent, centralized resource for the BC community.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our platform goes beyond a simple list. We categorize by expertise, tier, and solution type, ensuring that whether you need an implementation consultant or a niche ISV add-on, you find a vetted expert.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Directory Standards</h3>
            <ul className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Vetted Partner Tiers" },
                { icon: Users, text: "Community-Driven Reviews" },
                { icon: Globe, text: "Global Network of Experts" },
                { icon: Award, text: "Certified ISV Solutions" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <item.icon className="text-blue-600 w-5 h-5" />
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PERSONAL TOUCH SECTION */}
        <div className="border-t border-slate-100 pt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Curated by Experts</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            As veterans in the Microsoft Dynamics ecosystem, we understand the complexities of Business Central. This platform is our contribution to making the ecosystem more accessible and efficient for everyone.
          </p>
          <div className="inline-flex items-center gap-4 bg-blue-50 px-6 py-3 rounded-full text-blue-900 font-semibold">
            <span>Powering the Dynamics 365 Community</span>
          </div>
        </div>
      </section>
    </main>
  );
}