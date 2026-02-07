"use client";

import { useState } from "react";
import Link from "next/link";
import { Play } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { VideoModal } from "@/components/shared/VideoModal";

const headerOrbs = [
  {
    color: "rgba(30, 58, 95, 0.12)",
    size: "w-[400px] h-[400px]",
    position: "top-[-15%] left-[-5%]",
    animation: "animate-float-slow",
    blur: "blur-[80px]",
  },
  {
    color: "rgba(224, 122, 61, 0.1)",
    size: "w-[300px] h-[300px]",
    position: "bottom-[-10%] right-[5%]",
    animation: "animate-float-medium",
    blur: "blur-[70px]",
  },
];

const YOUTUBE_VIDEO_ID = "TzQJsqiqTPg";

export function PageHeader() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <header className="gradient-mesh-hero noise-overlay relative overflow-hidden py-28 md:py-36">
        <FloatingOrbs orbs={headerOrbs} />

        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center max-w-[720px] mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
              How It Works
            </p>
            <h1 className="text-display-1 font-serif text-text-primary mb-6">
              The Operational Excellence Execution Platform
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto mb-8">
              This is where improvement gets executed. Three modules — LOGS,
              IDA, and DOCS — work together in a continuous loop to capture
              knowledge, investigate root causes, and turn validated insights
              into living procedures. Systematic. Strategic. Controlled.
            </p>

            <button
              onClick={() => setVideoOpen(true)}
              className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            >
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-text-muted/20 group-hover:bg-oppr-primary/20 transition-colors">
                <Play size={10} weight="fill" className="text-text-secondary group-hover:text-oppr-primary ml-0.5 transition-colors" />
              </span>
              Watch Video
            </button>

            <p className="mt-4">
              <Link
                href="/insights"
                className="text-sm text-oppr-secondary hover:underline font-medium"
              >
                Not sure where to start? Try Oppr Insights &rarr;
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </header>

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        youtubeId={YOUTUBE_VIDEO_ID}
      />
    </>
  );
}
