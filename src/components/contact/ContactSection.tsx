"use client";

import Link from "next/link";
import { Envelope, MapPin, LinkedinLogo } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const inputClasses =
  "w-full border border-border-light rounded-lg px-4 py-3 focus:border-oppr-primary focus:outline-none text-text-primary bg-white transition-colors";

export function ContactSection() {
  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left column — Contact info */}
        <AnimatedSection>
          <h2 className="text-display-2 font-serif text-text-primary mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Whether you have a specific question or just want to learn more
            about what Oppr can do for your operation, we&apos;re here to help.
          </p>

          <div className="space-y-6 mb-10">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-oppr-primary/10 flex items-center justify-center shrink-0">
                <Envelope size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5">Email</p>
                <a
                  href="mailto:floris@oppr.ai"
                  className="text-oppr-primary font-medium hover:underline"
                >
                  floris@oppr.ai
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-oppr-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5">Location</p>
                <p className="text-text-primary font-medium">
                  The Hague, Netherlands
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-oppr-primary/10 flex items-center justify-center shrink-0">
                <LinkedinLogo size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5">LinkedIn</p>
                <a
                  href="https://linkedin.com/company/oppr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oppr-primary font-medium hover:underline"
                >
                  Follow us on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Demo CTA box */}
          <div className="bg-bg-light rounded-xl p-5">
            <p className="font-semibold text-text-primary mb-3">
              Ready for a demo?
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>
        </AnimatedSection>

        {/* Right column — Form */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white border border-border-light rounded-2xl p-8">
            <form className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="you@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  className={inputClasses}
                  placeholder="Your company"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="contact-role"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Your Role
                </label>
                <select id="contact-role" className={inputClasses}>
                  <option value="">Select your role</option>
                  <option value="plant-manager">Plant Manager</option>
                  <option value="operations-director">Operations Director</option>
                  <option value="maintenance-manager">Maintenance Manager</option>
                  <option value="quality-manager">Quality Manager</option>
                  <option value="continuous-improvement">Continuous Improvement</option>
                  <option value="consultant">Consultant</option>
                  <option value="investor">Investor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Interest */}
              <div>
                <label
                  htmlFor="contact-interest"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  I&apos;m interested in...
                </label>
                <select id="contact-interest" className={inputClasses}>
                  <option value="">Select an option</option>
                  <option value="demo">Scheduling a demo</option>
                  <option value="pricing">Pricing information</option>
                  <option value="partnership">Partnership opportunities</option>
                  <option value="general">General inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className={inputClasses}
                  placeholder="How can we help?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
