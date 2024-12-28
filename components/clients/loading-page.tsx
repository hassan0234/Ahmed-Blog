"use client";

import { useEffect, useState } from "react";

export default function DarkLoadingPage() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md px-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Loading<span className="text-blue-400">{dots}</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Preparing your experience
          </p>
        </div>

        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 border-t-4 border-purple-500 border-solid rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-4 border-pink-500 border-solid rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="mt-8">
          <p className="text-gray-500 text-xs sm:text-sm italic">
            Sit tight, we're working our magic
          </p>
        </div>
      </div>
    </div>
  );
}
