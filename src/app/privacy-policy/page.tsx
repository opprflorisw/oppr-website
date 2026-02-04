"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container-narrow">
                <AnimatedSection>
                    <h1 className="text-display-2 font-serif text-text-primary mb-4">Privacy Policy</h1>
                    <p className="text-text-muted mb-12">Last updated: May 10, 2025</p>

                    <div className="prose prose-slate max-w-none space-y-8 text-text-secondary leading-relaxed">
                        <section>
                            <p>
                                Our privacy policy explains how Oppr B.V. AI and its affiliated companies and subsidiaries collect, store, use, disclose, and otherwise process information about you in the context of our business operations, including through our websites that link to this notice (such as oppr.ai); the &quot;Oppr B.V.&quot;; our software-as-a-service offering; and our marketing and sales activities (collectively, our &quot;Services&quot;). It also includes important information about your privacy rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">Personal Information We Collect</h2>
                            <p>We collect information that can be used on its own or in combination with other information in our possession to identify you (&quot;Personal Information&quot;) in the following ways:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li><strong>Information you provide:</strong> We may collect personal information when you create an account to use our services or communicate with us.</li>
                                <li><strong>Communication information:</strong> When you communicate with us, we may collect your name, contact details, and the content of the messages you send (&quot;Communication Information&quot;).</li>
                                <li><strong>Payment information:</strong> When you purchase or subscribe to our services, we may collect your billing details, such as your credit card number, expiration date, and billing address, or use a third-party payment processor to process your payments (&quot;Payment Information&quot;).</li>
                                <li><strong>Automatically received information:</strong> When you visit, use, or interact with our services, we may receive certain information about your visit (e.g., log data, usage data, device information).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">Cookies</h2>
                            <p>
                                Cookies are small sets of information that websites send to your computer. They can be used for tracking activity, understanding preferences, and improving your experience. By using our Services, you consent to our use of cookies as described in our detailed cookie policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">Data Retention</h2>
                            <p>
                                We retain personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting obligations, resolving disputes, and maintaining our records. When we no longer need your personal information, we will delete or anonymize it in accordance with our data retention policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">No Children</h2>
                            <p>
                                Our websites and services are not aimed at individuals under 16 years of age. We do not knowingly collect personal information from individuals under 16 years of age. If you have reason to believe that a minor under the age of 16 has provided us with personal information through our Services, please contact us at privacy@oppr.ai.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">Changes to Our Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. When we do, we will post an updated version on this page, unless another type of notification is required by law or contractually agreed upon.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-border-light">
                            <h2 className="text-2xl font-bold text-text-primary mb-4">How to Contact Us</h2>
                            <p>If you have questions, please contact us at <strong>privacy@oppr.ai</strong>.</p>
                        </section>
                    </div>
                </AnimatedSection>
            </div>
        </main>
    );
}
