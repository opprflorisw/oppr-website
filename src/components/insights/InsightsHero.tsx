"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";
import { VideoModal } from "@/components/shared/VideoModal";

const heroOrbs = [
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
  {
    color: "rgba(139, 92, 246, 0.08)",
    size: "w-[250px] h-[250px]",
    position: "top-[30%] right-[15%]",
    animation: "animate-float",
    blur: "blur-[60px]",
  },
];

const YOUTUBE_VIDEO_ID = "UxgC1XNb2_4";

export function InsightsHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <header className="gradient-mesh-hero noise-overlay relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20">
        <FloatingOrbs orbs={heroOrbs} />

        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center max-w-[720px] mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
              Operational Discovery
            </p>
            <h1 className="text-display-1 font-serif text-text-primary mb-6">
              Turn Gut Feelings Into Structured Starting Points
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-[600px] mx-auto mb-4">
              You know something needs to improve — but where exactly? Oppr
              Insights gives everyone in your organization a voice. Capture
              ideas, observations, and expertise asynchronously, in any
              language. AI does the heavy lifting: structuring the unstructured,
              surfacing patterns, and turning loose ideas into clear priorities.
              Your starting point before execution.
            </p>
            <p className="text-sm font-semibold text-oppr-primary mb-10">
              Ideate. Structure. Then Execute.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/insights/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl focus-ring"
              >
                Start with Insights
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-all cursor-pointer focus-ring rounded-lg"
              >
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-text-muted/20 group-hover:bg-oppr-primary/20 transition-colors">
                  <Play size={10} weight="fill" className="text-text-secondary group-hover:text-oppr-primary ml-0.5 transition-colors" />
                </span>
                Watch Demo
              </button>
              <button
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-text-primary rounded-lg border-2 border-border-light hover:bg-bg-light hover:border-border-medium transition-all focus-ring"
              >
                See How It Works
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </AnimatedSection>

          {/* Hero image */}
          <AnimatedSection className="mt-12 max-w-[960px] mx-auto w-full">
            <Image
              src="/images/insights.png"
              alt="Oppr Insights dashboard"
              width={1920}
              height={960}
              className="w-full h-auto"
              priority
            />
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
