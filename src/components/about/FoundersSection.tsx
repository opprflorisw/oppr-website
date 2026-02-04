"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { staggerContainer, morphIn } from "@/lib/animations";
import { LinkedinLogo } from "@phosphor-icons/react";
import Image from "next/image";

const team = [
  {
    name: "Floris Wyers",
    role: "Founder & CEO",
    image: "/images/profile_pic/floris.jpg",
    linkedin: "https://www.linkedin.com/in/floris-wyers/",
  },
  {
    name: "Erinc Karatoprak",
    role: "Co-Founder & CPO",
    image: "/images/profile_pic/erinc.jpg",
    linkedin: "https://www.linkedin.com/in/erinckaratoprak/",
  },
  {
    name: "Bogdan-Mihai Gligor",
    role: "Tech Team Lead",
    image: "/images/profile_pic/bogdan.jpg",
    linkedin: "https://www.linkedin.com/in/bogdangligor/",
  },
  {
    name: "Duco Lindhout",
    role: "Business Developer",
    image: "/images/profile_pic/duco.jpg",
    linkedin: "https://www.linkedin.com/in/ducolindhout/",
  },
  {
    name: "Cezar Suciu",
    role: "AI Engineer",
    image: "/images/profile_pic/cezar.jpg",
    linkedin: "https://www.linkedin.com/in/cezar-suciu/",
  },
  {
    name: "Anca Giurgiu",
    role: "Full-Stack Developer",
    image: "/images/profile_pic/anca.jpg",
    linkedin: "https://www.linkedin.com/in/ancagiurgiu/",
  },
  {
    name: "Mara Irina Mesesan",
    role: "Full-Stack Developer",
    image: "/images/profile_pic/mara.jpg",
    linkedin: "https://www.linkedin.com/in/mara-irina-mesesan/",
  },
];

export function FoundersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper bg="white">
      <SectionHeader label="Team" title="Meet the Minds Behind Oppr.ai" />

      <motion.div
        ref={ref}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto"
      >
        {team.map((member) => (
          <motion.div key={member.name} variants={morphIn}>
            <GlowCard className="overflow-hidden h-full group">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oppr-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white text-oppr-primary flex items-center justify-center hover:bg-oppr-secondary hover:text-white transition-colors duration-300"
                  >
                    <LinkedinLogo size={20} weight="fill" />
                  </a>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-oppr-secondary">
                  {member.role}
                </p>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
