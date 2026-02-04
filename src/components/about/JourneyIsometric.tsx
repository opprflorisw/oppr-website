"use client";

import { motion } from "framer-motion";
import { Rocket, Gear, Lightbulb, TrendUp } from "@phosphor-icons/react";

interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: any;
    color: string;
}

const milestones: Milestone[] = [
    {
        year: "2023",
        title: "The Vision",
        description: "Oppr.ai was founded to revolutionize SME manufacturing with a 'digital operator', leveraging AI to capture critical shop-floor context.",
        icon: Lightbulb,
        color: "#4179A2",
    },
    {
        year: "2024",
        title: "Validation",
        description: "Intensive development and real-world testing of LOGS, DOCS, and IDA. Close collaboration with pilot customers refined the platform impact.",
        icon: Gear,
        color: "#4179A2",
    },
    {
        year: "2025",
        title: "Launch",
        description: "Commercial launch and initial SME impact. We unified our modules into one seamless platform for manufacturers across Europe.",
        icon: Rocket,
        color: "#E07A3D",
    },
    {
        year: "2026",
        title: "Scale",
        description: "Found market-fit and systematically expanding. We are scaling our operations and infrastructure to empower manufacturers globally.",
        icon: TrendUp,
        color: "#E07A3D",
    },
];

export function JourneyIsometric() {
    return (
        <div className="relative w-full max-w-[900px] mx-auto py-12 flex flex-col gap-16 md:gap-24">
            {/* Decorative center connecting line */}
            <div className="hidden md:flex absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 flex-col justify-between items-center z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                {/* Visual Arrow Indicators along the line */}
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-3 h-3 border-r-2 border-b-2 border-slate-300 rotate-45 mb-24 opacity-40"
                        style={{ marginTop: i === 0 ? '40px' : '0' }}
                    />
                ))}
            </div>

            {milestones.map((milestone, index) => (
                <motion.div
                    key={milestone.year}
                    className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse text-center md:text-right' : 'text-center md:text-left'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Square Icon Tile */}
                    <div className="relative flex-shrink-0 group">
                        <motion.div
                            className="w-24 h-24 bg-white rounded-[24px] border border-slate-200 flex flex-col items-center justify-center p-4 shadow-xl relative overflow-hidden cursor-default transition-all duration-300 border-oppr-primary/10 shadow-slate-200/50"
                        >
                            {/* Subtle background color based on milestone color */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{ backgroundColor: milestone.color }}
                            />
                            <div className="text-slate-400 text-[10px] font-bold mb-1 tracking-widest uppercase relative z-10">
                                {milestone.year}
                            </div>
                            <milestone.icon weight="duotone" size={32} style={{ color: milestone.color }} className="relative z-10" />
                        </motion.div>

                        {/* Soft Shadow behind tile */}
                        <div className="absolute inset-0 bg-black/5 blur-xl rounded-[24px] translate-y-2 -z-10" />
                    </div>

                    {/* Description Content */}
                    <div className="flex-1 max-w-[420px]">
                        <h4 className="text-xl font-bold text-slate-800 mb-2">
                            {milestone.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {milestone.description}
                        </p>
                    </div>

                    {/* Hidden spacer for desktop symmetry */}
                    <div className="hidden md:block flex-1" />
                </motion.div>
            ))}
        </div>
    );
}
