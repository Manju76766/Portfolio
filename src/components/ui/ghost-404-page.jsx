'use client';
import { Link } from 'react-router-dom';
import { FlowButton } from "@/components/ui/FlowButton";

export function Ghost404Page() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4 gap-8">
      <h1 className="text-[120px] font-bold text-[#111111] font-['Sora']" style={{ fontSize: 'clamp(80px, 15vw, 150px)', letterSpacing: '-0.05em' }}>
        404
      </h1>
      <p className="text-[20px] text-[#666] font-['Sora'] text-center max-w-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <FlowButton
          text="Go Back Home"
          bgColor="#C4F038"
          textColor="#111111"
          hoverColor="#111111"
        />
      </Link>
    </div>
  );
}

export const NotFound = Ghost404Page;
