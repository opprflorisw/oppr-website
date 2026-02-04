"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

import { JourneyIsometric } from "./JourneyIsometric";

export function StorySection() {
  return (
    <SectionWrapper bg="light">
      <SectionHeader label="Our Journey" title="Building Oppr.ai, Step by Step" />

      <div className="max-w-[1000px] mx-auto">
        {/* Visual Isometric Journey */}
        <JourneyIsometric />
      </div>
    </SectionWrapper>
  );
}
