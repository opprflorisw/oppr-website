"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import { GlowCard } from "@/components/shared/GlowCard";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div className="mb-4">
            <GlowCard className="overflow-hidden">
                <button
                    onClick={onClick}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                    <span className="text-lg font-bold text-text-primary pr-8">{question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-oppr-primary text-white' : 'bg-oppr-primary/5 text-oppr-primary'}`}>
                        {isOpen ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                    </div>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border-light pt-4">
                                {answer}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlowCard>
        </div>
    );
}

export function FAQAccordion({ categories }: { categories: { title: string; items: { q: string; a: string }[] }[] }) {
    const [openIndex, setOpenIndex] = useState<string | null>("0-0");

    const handleToggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="space-y-12">
            {categories.map((category, catIdx) => (
                <div key={category.title}>
                    <h2 className="text-2xl font-serif text-oppr-primary mb-8 px-2 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-oppr-secondary rounded-full" />
                        {category.title}
                    </h2>
                    <div className="space-y-4">
                        {category.items.map((item, itemIdx) => {
                            const id = `${catIdx}-${itemIdx}`;
                            return (
                                <FAQItem
                                    key={id}
                                    question={item.q}
                                    answer={item.a}
                                    isOpen={openIndex === id}
                                    onClick={() => handleToggle(id)}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
