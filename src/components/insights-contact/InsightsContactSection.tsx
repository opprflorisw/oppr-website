"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Lightbulb,
} from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const inputClasses =
  "w-full border border-border-light rounded-lg px-4 py-3 focus:border-oppr-secondary focus:outline-none text-text-primary bg-white transition-colors focus-visible:ring-2 focus-visible:ring-oppr-secondary focus-visible:ring-offset-2";

const checkItems = [
  {
    bold: "Create topics:",
    text: "Define questions and invite contributors from any department or shift",
  },
  {
    bold: "Gather feedback:",
    text: "Voice, text, or photo input in any language — asynchronously",
  },
  {
    bold: "AI-powered analysis:",
    text: "Automatic theme detection, sentiment analysis, and structured reports",
  },
  {
    bold: "Talk to your data:",
    text: "Ask follow-up questions and drill into themes conversationally",
  },
];

export function InsightsContactSection() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-select interest from URL query param
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam && ["idea-starter", "idea-engine"].includes(planParam)) {
      setFormData((prev) => ({ ...prev, interest: planParam }));
    }
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        companySize: "",
        interest: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <SectionWrapper bg="light" className="pt-28 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column — Info */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-oppr-secondary/10 flex items-center justify-center">
              <Lightbulb
                size={22}
                weight="duotone"
                className="text-oppr-secondary"
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary">
              Oppr Insights
            </p>
          </div>
          <h1 className="text-display-1 font-serif text-text-primary mb-6">
            Start with Oppr Insights
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Ready to give your team a voice? Fill out the form and we&apos;ll
            get in touch to set up your Oppr Insights account and help you run
            your first discovery topic.
          </p>

          {/* What You Get */}
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            What You Get
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

          {/* Demo CTA */}
          <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-text-primary mb-3">
              Looking for the full platform?
            </p>
            <p className="text-sm text-text-secondary mb-4">
              Oppr Insights is just the starting point. Book a demo to see LOGS,
              IDA, and DOCS in action.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Book a Platform Demo
            </Link>
          </div>
        </AnimatedSection>

        {/* Right column — Form */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <CheckCircle
                    size={56}
                    weight="fill"
                    className="text-green-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Request Sent!
                </h3>
                <p className="text-text-secondary mb-6">
                  Thanks for your interest in Oppr Insights! We&apos;ll get back
                  to you within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-oppr-secondary font-medium hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="text-center border-b border-border-light pb-5 mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Get Started with Insights
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Fill out the form and we&apos;ll be in touch within one
                    business day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="insights-first-name"
                        className="block text-sm font-medium text-text-primary mb-1.5"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="insights-first-name"
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="First name…"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="insights-last-name"
                        className="block text-sm font-medium text-text-primary mb-1.5"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="insights-last-name"
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Last name…"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="insights-email"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="insights-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="you@company.com…"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="insights-company"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="insights-company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Your company…"
                    />
                  </div>

                  {/* Role + Company Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="insights-role"
                        className="block text-sm font-medium text-text-primary mb-1.5"
                      >
                        Your Role
                      </label>
                      <select
                        id="insights-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select your role</option>
                        <option value="plant-manager">Plant Manager</option>
                        <option value="operations-director">
                          Operations Director
                        </option>
                        <option value="maintenance-manager">
                          Maintenance Manager
                        </option>
                        <option value="quality-manager">Quality Manager</option>
                        <option value="continuous-improvement">
                          Continuous Improvement
                        </option>
                        <option value="consultant">Consultant</option>
                        <option value="investor">Investor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="insights-size"
                        className="block text-sm font-medium text-text-primary mb-1.5"
                      >
                        Company Size
                      </label>
                      <select
                        id="insights-size"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select size</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="501-1000">501-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Interest dropdown */}
                  <div>
                    <label
                      htmlFor="insights-interest"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      I&apos;m interested in...
                    </label>
                    <select
                      id="insights-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select an option</option>
                      <option value="information">
                        General information about Oppr Insights
                      </option>
                      <option value="discuss">
                        Discuss Oppr Insights with the team
                      </option>
                      <option value="idea-starter">
                        Idea Starter plan (€299/month)
                      </option>
                      <option value="idea-engine">
                        Idea Engine plan (€899/month)
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="insights-message"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="insights-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Tell us about your team or specific needs…"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 text-base font-semibold text-white bg-oppr-secondary rounded-lg hover:bg-oppr-secondary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-ring"
                  >
                    {status === "loading"
                      ? "Submitting..."
                      : "Start with Insights"}
                  </button>

                  <p className="text-center text-sm text-text-secondary">
                    We&apos;ll email you within one business day. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
