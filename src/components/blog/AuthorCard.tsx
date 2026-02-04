"use client";

import { LinkedinLogo, Envelope } from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function AuthorCard() {
  return (
    <div className="container-narrow px-4 py-12">
      <AnimatedSection>
        <div className="bg-bg-light rounded-2xl p-8 border border-border-light">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-oppr-primary to-oppr-dark flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-white">FW</span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                Written by
              </p>
              <p className="text-lg font-semibold text-text-primary">
                Floris Wyers
              </p>
              <p className="text-sm text-text-secondary">
                CEO &amp; Founder, Oppr.ai
              </p>
              <p className="text-sm text-text-muted mt-2 max-w-md">
                Building the human data layer for manufacturing. The what from
                machines. The why from people.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
                <a
                  href="https://www.linkedin.com/in/floriswyers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Floris Wyers on LinkedIn"
                  className="text-text-muted hover:text-oppr-primary transition-colors"
                >
                  <LinkedinLogo size={20} />
                </a>
                <a
                  href="mailto:floris@oppr.ai"
                  aria-label="Email Floris Wyers"
                  className="text-text-muted hover:text-oppr-primary transition-colors"
                >
                  <Envelope size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
