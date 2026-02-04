"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ClosedLoopAnimation } from "./ClosedLoopAnimation";

export function PlatformSection() {
  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="The Solution"
        title="Capture, Analyze, and Implement — In the Flow of Work"
        subtitle="Three modules. One continuous loop. Capture knowledge in seconds. Analyze it with AI. Turn it into living documentation that actually sticks."
      />
      <ClosedLoopAnimation />
      <div className="flex justify-center mt-10">
        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          See How It Works
          <ArrowRight size={18} weight="bold" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
