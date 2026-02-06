"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PathSelector } from "@/components/shared/PathSelector";

export function HomePathSelector() {
  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Two Ways to Start"
        title={
          <>
            Every Operation Is Different.
            <br />
            Your Starting Point Should Be Too.
          </>
        }
        subtitle="Whether you already know what needs to improve or you have a gut feeling you want to formalize — we've got you covered."
      />
      <PathSelector />
    </SectionWrapper>
  );
}
