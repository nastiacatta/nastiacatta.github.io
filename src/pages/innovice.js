import React from 'react';
import Link from 'next/link';

export default function Innovice() {
  return (
    <div className="min-h-screen bg-lightPink text-greyBlack p-8">
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-4">INNOVICE</h1>
        <p className="text-xl mb-8">AI-Powered Platform for Furniture Repair</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <img src="/images/innovice.jpg" alt="Innovice AI Platform" className="w-full mb-8 rounded shadow-lg" />
        <h2 className="text-3xl font-semibold mb-4">Overview</h2>
        <p className="mb-6">Innovice focuses on reducing furniture waste by introducing AI-powered solutions for furniture repair...</p>
        <Link href="/">
          <a className="text-accentPink hover:underline">← Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
