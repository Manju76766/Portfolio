"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowButton } from "@/components/ui/FlowButton";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="bg-white font-serif w-full h-[calc(100vh-68px)] overflow-hidden flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 text-center">
            <div
              className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[300px] sm:h-[450px] md:h-[500px] bg-center bg-no-repeat bg-contain"
              aria-hidden="true"
            >
              <h1 className="text-center text-black text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8 md:pt-0">
                404
              </h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl text-black sm:text-3xl font-bold mb-4">
                Look like you're lost
              </h3>
              <p className="mb-6 text-black sm:mb-5">
                The page you are looking for is not available!
              </p>

              <div className="mt-8 flex justify-center">
                <FlowButton
                  text="Go to Home"
                  onClick={() => navigate("/")}
                  bgColor="#C4F038"
                  textColor="#111111"
                  hoverColor="#111111"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
