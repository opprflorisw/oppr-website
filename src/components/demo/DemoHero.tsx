"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const checkItems = [
  {
    bold: "20-second capture:",
    text: "Watch an operator observation go from voice to structured data",
  },
  {
    bold: "AI-powered analysis:",
    text: "See IDA correlate human observations with machine data in real-time",
  },
  {
    bold: "Living documentation:",
    text: "How validated insights become accessible procedures via QR codes",
  },
  {
    bold: "Your specific use case:",
    text: "We\u2019ll map the Oppr workflow to your operation\u2019s biggest challenge",
  },
];

const inputClasses =
  "w-full border border-border-light rounded-lg px-4 py-3 focus:border-oppr-primary focus:outline-none text-text-primary bg-white transition-colors";

export function DemoHero() {
  return (
    <SectionWrapper bg="light" className="pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — Info */}
        <AnimatedSection>
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
            Book a Demo
          </p>
          <h1 className="text-display-1 font-serif text-text-primary mb-6">
            See How a Single Operator Observation Becomes a Root Cause Analysis in Minutes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            In 30 minutes, we&apos;ll walk you through the complete loop:
            capture an observation, watch IDA correlate it with machine data, and
            see how DOCS turns validated insights into living
            procedures&mdash;all tailored to your operation.
          </p>

          {/* What You'll See */}
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            What You&apos;ll See
          </h3>
          <div className="space-y-4 mb-10">
            {checkItems.map((item) => (
              <div key={item.bold} className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-green-500 shrink-0 mt-0.5"
                />
                <p className="text-text-secondary">
                  <span className="font-semibold text-text-primary">
                    {item.bold}
                  </span>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="border border-border-light rounded-xl p-5 bg-white">
            <blockquote className="text-text-secondary italic leading-relaxed mb-3">
              &ldquo;The demo showed us exactly how our operators would use it.
              No abstract features&mdash;real workflows we could implement
              immediately.&rdquo;
            </blockquote>
            <cite className="text-sm text-text-secondary not-italic">
              &mdash; Plant Manager, Food Processing
            </cite>
          </div>
        </AnimatedSection>

        {/* Right — Form */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div className="text-center border-b border-border-light pb-5 mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Request Your Demo
              </h2>
              <p className="text-sm text-text-secondary">
                Fill out the form and we&apos;ll be in touch within one business
                day.
              </p>
            </div>

            <form className="space-y-5">
              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="demo-first-name"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="demo-first-name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="demo-last-name"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="demo-last-name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="demo-email"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="you@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="demo-company"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  id="demo-company"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="Your company"
                />
              </div>

              {/* Role + Company Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="demo-role"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Your Role
                  </label>
                  <select id="demo-role" className={inputClasses}>
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
                <div>
                  <label
                    htmlFor="demo-size"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Company Size
                  </label>
                  <select id="demo-size" className={inputClasses}>
                    <option value="">Select size</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>

              {/* Primary Interest */}
              <div>
                <label
                  htmlFor="demo-interest"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Primary Interest
                </label>
                <select id="demo-interest" className={inputClasses}>
                  <option value="">Select your primary interest</option>
                  <option value="capture">Capturing operator knowledge</option>
                  <option value="root-cause">Faster root cause analysis</option>
                  <option value="expertise">
                    Preserving expertise before retirement
                  </option>
                  <option value="ci">
                    Continuous improvement infrastructure
                  </option>
                  <option value="insights">
                    Oppr Insights strategic feedback
                  </option>
                  <option value="full">Full platform evaluation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Additional notes */}
              <div>
                <label
                  htmlFor="demo-notes"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Anything specific you&apos;d like us to cover?
                </label>
                <textarea
                  id="demo-notes"
                  rows={3}
                  className={inputClasses}
                  placeholder="Tell us about your operation or specific needs..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Request Demo
              </button>

              <p className="text-center text-sm text-text-secondary">
                We&apos;ll email you to schedule a time that works. No spam,
                ever.
              </p>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
