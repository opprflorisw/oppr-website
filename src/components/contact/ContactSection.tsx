"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Envelope, MapPin, LinkedinLogo, CheckCircle } from "@phosphor-icons/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const inputClasses =
  "w-full border border-border-light rounded-lg px-4 py-3 focus:border-oppr-primary focus:outline-none text-text-primary bg-white transition-colors focus-visible:ring-2 focus-visible:ring-oppr-primary focus-visible:ring-offset-2";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", role: "", interest: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <SectionWrapper bg="light" className="pt-28 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column — Contact info */}
        <AnimatedSection>
          <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
            Contact
          </p>
          <h1 className="text-display-1 font-serif text-text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Have questions? Want to learn more about how Oppr can help your
            operation? We&apos;d love to hear from you.
          </p>

          <div className="space-y-6 mb-10">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-border-light">
                <Envelope size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5 font-medium">Email</p>
                <a
                  href="mailto:info@oppr.ai"
                  className="text-oppr-primary font-semibold hover:underline"
                >
                  info@oppr.ai
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-border-light">
                <MapPin size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5 font-medium">Location</p>
                <p className="text-text-primary font-semibold leading-relaxed">
                  Oude Middenweg 17<br />
                  2491 AC Den Haag<br />
                  The Netherlands
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-border-light">
                <LinkedinLogo size={22} weight="duotone" className="text-oppr-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-0.5 font-medium">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/company/opprai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oppr-primary font-semibold hover:underline"
                >
                  Follow us on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Demo CTA box */}
          <div className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-text-primary mb-3">
              Ready for a demo?
            </p>
            <p className="text-sm text-text-secondary mb-4">
              See the platform in action and discover how it fits your specific operation.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Book a Demo
            </Link>
          </div>
        </AnimatedSection>

        {/* Right column — Form */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={56} weight="fill" className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary mb-6">
                  Thanks for reaching out. We&apos;ll get back to you within one
                  business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-oppr-primary font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center border-b border-border-light pb-5 mb-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Send a Message
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Fill out the form below and we&apos;ll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Your name…"
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
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Your company…"
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
                    <select
                      id="contact-role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={inputClasses}
                    >
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
                    <select
                      id="contact-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={inputClasses}
                    >
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
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="How can we help?…"
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 text-base font-semibold text-white bg-oppr-primary rounded-lg hover:bg-oppr-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-ring"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
