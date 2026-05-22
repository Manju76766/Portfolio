import React from 'react';

export default function DarkQuote() {
  return (
    <section className="bg-dark-bg py-[100px] relative flex justify-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full flex justify-center">
        <p className="text-[28px] md:text-[40px] font-[700] text-white text-center max-w-[800px] leading-[1.35] relative z-10">
          I craft thoughtful, user-centered designs that connect brands with people. Every pixel has purpose—let's bring your vision to life.
        </p>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120px] h-[200px] z-0 opacity-80 hidden md:block">
        <svg viewBox="0 0 100 200" fill="none" strokeWidth="2" strokeLinecap="round" stroke="#444" className="w-full h-full">
          <path d="M50 0 Q80 50 50 100 T50 200 M65 0 Q95 50 65 100 T65 200"></path>
        </svg>
      </div>
    </section>
  );
}
