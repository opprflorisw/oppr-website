"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FloatingOrbs } from "@/components/shared/FloatingOrbs";

const faqOrbs = [
    {
        color: "rgba(30, 58, 95, 0.08)",
        size: "w-[500px] h-[500px]",
        position: "top-[-10%] right-[-5%]",
        animation: "animate-float-slow",
        blur: "blur-[100px]",
    },
    {
        color: "rgba(224, 122, 61, 0.06)",
        size: "w-[400px] h-[400px]",
        position: "bottom-[20%] left-[-10%]",
        animation: "animate-float-medium",
        blur: "blur-[80px]",
    },
];

const categories = [
    {
        title: "General Questions",
        items: [
            {
                q: "What is Oppr's core purpose for manufacturing?",
                a: "Oppr is the Digital Operator Platform — adding the Human Data Layer to manufacturing. We bridge the gap between machine data that tells you what happened and the human knowledge that explains why. By capturing operator observations, correlating them with machine data, and feeding insights back into living documentation, we create a closed loop for continuous improvement that actually sticks.",
            },
            {
                q: "Who is Oppr designed to help?",
                a: "Any manufacturing operation where human knowledge matters alongside machine data. Process or discrete, SME or enterprise — it doesn't matter. The value you get depends on your specific challenges: some customers start with knowledge preservation before key retirements, others focus on root cause analysis or quality improvement. The platform adapts to your context, not the other way around.",
            },
            {
                q: "What manufacturing challenges does Oppr help solve?",
                a: "We address the gap between what your dashboards show and what actually happens on the floor: fragmented data capture, the knowledge drain caused by retiring expertise, slow root-cause analysis, improvements that don't stick, and the difficulty of turning unstructured shop-floor observations into actionable operational intelligence.",
            },
            {
                q: "What is the pricing model?",
                a: "Oppr uses a scalable SaaS subscription model tailored to your facility size and operation. The platform works as an integrated system — LOGS, IDA, and DOCS work together in a continuous loop, and all three are included. Pricing is based on the value and scope of your deployment. Contact us for a conversation about what Oppr would look like in your environment.",
            },
            {
                q: "How long does implementation take?",
                a: "Our approach is designed to deliver results fast. It starts with a gap analysis to identify your biggest knowledge risks, followed by a focused pilot to capture real data, then analysis to surface patterns, and finally recommendations for implementation and scaling. Most customers see positive ROI within 8 weeks. For the detailed implementation timeline, visit our How It Works page.",
            },
            {
                q: "Will operators actually use it?",
                a: "This is the most common concern — and our biggest differentiator. Every module is built for the people who use it. LOGS is built for operators: capture an observation in 20 seconds by voice or photo, no forms, no login screens. IDA is built for anyone who has a question: ask in natural language, get answers from combined human and machine data. DOCS is an operator-centric knowledge system: the right information at the right time, accessible via QR code at the machine. Training takes 15 minutes. We consistently see high adoption because we removed the friction that killed every previous system.",
            },
            {
                q: "What ROI can we expect?",
                a: "It starts with building your data foundation — capturing the human knowledge that's currently invisible to your systems. Once that foundation exists, the value compounds. Typical customers see positive ROI within 8 weeks. Often, a single prevented failure or quality incident pays for the entire first year of the platform.",
            },
            {
                q: "What industries do you serve?",
                a: "Oppr serves both discrete and process manufacturing across sectors including food and beverage, chemicals, plastics, metals, packaging, water treatment, and equipment manufacturing. If your operation has operators who know things that your systems don't capture — and whose knowledge matters for quality, uptime, or safety — Oppr is relevant.",
            },
            {
                q: "What's the difference between Oppr Insights and the full platform?",
                a: "Oppr Insights is your ideation and discovery tool. It gives everyone in your organization a voice — asynchronously, in any language — and uses AI to structure loose ideas, observations, and gut feelings into clear priorities. Think of it as structured ideation: no more meetings dominated by the loudest voice, no forms, no friction. AI does the heavy lifting — surfacing themes, identifying patterns, and organizing what your team already senses into actionable starting points. The full Oppr platform (LOGS + IDA + DOCS) is the execution engine: capture knowledge continuously in the flow of work, investigate root causes with AI, and turn validated insights into living procedures. Insights = Ideate. Platform = Execute.",
            }
        ]
    },
    {
        title: "Features & Capabilities",
        items: [
            {
                q: "What are the core modules within the platform?",
                a: "The platform consists of three modules that work together in a continuous loop — similar to the Plan-Do-Check-Act (PDCA) cycle, powered by AI. LOGS captures operator observations in real time through voice, photo, and simple inputs. IDA — the Investigation & Diagnostic Assistant — correlates human and machine data to find root causes and surface patterns. DOCS turns those insights into living procedures and knowledge that stays current and accessible at the point of work.",
            },
            {
                q: "How does IDA use Artificial Intelligence?",
                a: "IDA uses advanced language models and pattern recognition to identify correlations between machine events and human observations. It can summarize shifts, suggest root causes, flag emerging patterns, and let you query your factory data in natural language — like having a personal data engineer who knows your operation. Ask it a question like \"When did we last see this quality issue on Line 2?\" and it searches across human observations and machine data to give you an answer.",
            },
            {
                q: "Can I include images or videos?",
                a: "Yes. Multi-modal input is central to how Oppr works. Operators can snap photos of defects, legacy HMI screens, or unusual conditions. These are timestamped, tagged, and analyzed by AI. You can even turn \"dumb\" equipment into a datasource — snap a photo of an unconnected HMI screen and Oppr reads the values and logs them automatically.",
            },
            {
                q: "Does Oppr have a mobile application?",
                a: "Yes. The platform is optimized for smartphones and tablets, allowing operators to log observations and access documentation directly at the machine. No need to walk to an office or sit at a desktop. QR codes on equipment provide instant access to relevant procedures and knowledge.",
            },
            {
                q: "How is Oppr different from connected worker platforms?",
                a: "Connected worker platforms digitize existing workflows — digital forms, checklists, work orders. Oppr does this too, but goes further. We focus on capturing the unstructured knowledge that no form or checklist can capture: the observation that \"the material looks different,\" the adjustment that always works on humid days, the sound that means a bearing is failing. And we don't just capture it — we use that knowledge to continuously improve. Observations feed into analysis, analysis feeds into updated procedures, and updated procedures feed back to operators. That's the closed loop that connected worker platforms are missing.",
            },
            {
                q: "How is Oppr different from knowledge management systems?",
                a: "Traditional knowledge management requires people to stop working and document what they know in structured formats. The result is usually a SharePoint or document library nobody visits. Oppr captures knowledge in the flow of work — voice logs, photos, observations — without requiring operators to change how they work. The AI structures, tags, and connects it automatically. And because DOCS keeps documentation living and current based on real observations, your procedures actually reflect reality instead of gathering dust.",
            },
            {
                q: "How is Oppr different from an MES?",
                a: "Oppr is not an MES and doesn't try to replace one. An MES manages production execution — scheduling, work orders, batch tracking, compliance. Oppr captures the human context that an MES doesn't: why a line ran better today, what the operator adjusted, what the material felt like. If you already have an MES, Oppr adds the human data layer on top of it. If you don't have an MES, Oppr can be a practical first step toward digitizing your operation — capturing structured operational data without the cost and complexity of a full MES implementation.",
            }
        ]
    },
    {
        title: "Security & Integration",
        items: [
            {
                q: "How does Oppr ensure data privacy and security?",
                a: "Data security is our top priority. We are fully GDPR compliant and use enterprise-grade encryption. Data is hosted in sovereign regions (e.g., EU-only). Your operational data is kept in private environments and is never used to train public AI models. You own your data.",
            },
            {
                q: "Does Oppr integrate with our existing tech stack?",
                a: "Oppr is designed to create a new data layer in your operation — the human data layer. Depending on your needs, integration works in both directions: you can push Oppr data into your existing systems (ERP, BI tools, data lakes) for higher-level reporting, or you can pull machine data from your existing systems into Oppr's unified timeline for richer correlation. We connect to common systems via standard protocols and APIs.",
            },
            {
                q: "How long does a typical setup take?",
                a: "Within a week, you're up and running and capturing data. The first priority is always getting observations flowing — building the data foundation that makes everything else possible. From there, the system gets smarter over time as IDA learns from your specific operation. There's no lengthy IT project, no complex infrastructure, and no training program — operators are onboarded in 15 minutes.",
            },
            {
                q: "Does Oppr integrate with our MES, SCADA, or historian?",
                a: "Yes, but integration is optional — not required. Oppr delivers immediate value as a standalone system with human observations alone. When you're ready, we connect to common historians (OSIsoft PI, Wonderware), MES systems, and SCADA via standard protocols. Integration enriches the unified timeline by combining human observations with machine data, but you don't need it to start seeing results.",
            }
        ]
    },
    {
        title: "Additional Questions",
        items: [
            {
                q: "Do we need sensors or hardware to start?",
                a: "No. You can start with zero hardware and zero machine integration. Operators use their smartphones or tablets — devices they already have. Oppr is designed to fill the gap where sensors aren't present. In fact, your operators are your sensors. Over time, you can add machine data integrations to enrich the analysis.",
            },
            {
                q: "What languages does Oppr support?",
                a: "Oppr supports 50+ languages. Operators respond in their native language — the AI handles transcription, translation, and analysis. This is especially valuable for multilingual workforces where language barriers traditionally prevent frontline workers from contributing equally.",
            },
            {
                q: "How does Oppr handle shift handovers?",
                a: "Shift handovers are one of the highest-value use cases. Throughout a shift, operator observations are captured in real time via LOGS. IDA can generate an automatic shift summary for the incoming team, including flagged issues, ongoing observations, and context that would otherwise be lost in a verbal handoff or paper log.",
            },
            {
                q: "What happens to our data if we stop using Oppr?",
                a: "You own your data. If you ever choose to stop using the platform, we provide full data export capabilities. Your operational knowledge and observations remain yours.",
            },
            {
                q: "Can Oppr help with compliance and auditing?",
                a: "Yes. Every observation in Oppr is timestamped, tagged, and traceable — creating an automatic audit trail. DOCS keeps procedures current and version-controlled. For regulated industries, this means compliance documentation that reflects what actually happens on the floor, not what was written years ago.",
            },
            {
                q: "How does Oppr handle data quality? What if operators log nonsense?",
                a: "The AI is trained to recognize and flag low-quality inputs. But more importantly, the zero-friction design means operators don't need to game the system — there's no lengthy form to shortcut. They speak naturally about what they observe. Over time, as operators see their observations lead to real changes (fixes, procedure updates, pattern recognition), data quality improves naturally because people contribute more when they feel heard.",
            }
        ]
    }
];

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-20">
            <header className="gradient-mesh-hero noise-overlay relative overflow-hidden py-24 border-b border-border-light">
                <FloatingOrbs orbs={faqOrbs} />
                <div className="container-wide relative z-10 text-center">
                    <AnimatedSection>
                        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-oppr-secondary mb-4">
                            Resources
                        </p>
                        <h1 className="text-display-1 font-serif text-text-primary mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-text-secondary max-w-[600px] mx-auto leading-relaxed">
                            Find answers to common questions about Oppr, our technology,
                            and how we help manufacturing teams thrive.
                        </p>
                    </AnimatedSection>
                </div>
            </header>

            <SectionWrapper bg="white">
                <div className="max-w-[900px] mx-auto">
                    <FAQAccordion categories={categories} />
                </div>
            </SectionWrapper>

            <SectionWrapper bg="light">
                <div className="max-w-[700px] mx-auto">
                    <div className="bg-white rounded-2xl border border-border-light p-10 text-center shadow-elevated">
                        <h3 className="text-2xl font-bold text-text-primary mb-4">Still have questions?</h3>
                        <p className="text-text-secondary mb-8">
                            Our team of manufacturing experts is ready to help you explore how Oppr fits into your specific operation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/contact"
                                className="px-8 py-3 bg-oppr-primary text-white rounded-lg font-semibold hover:bg-oppr-dark transition-all shadow-md"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/demo"
                                className="px-8 py-3 bg-white text-oppr-primary border border-border-medium rounded-lg font-semibold hover:bg-bg-light transition-all"
                            >
                                Book a Demo
                            </a>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
