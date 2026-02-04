"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gear,
  Eye,
  UserCircleMinus,
  ArrowsClockwise,
  CloudRain,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import { ExampleFilter } from "./ExampleFilter";
import { ExampleCard } from "./ExampleCard";

const examples = [
  {
    category: "maintenance",
    categoryLabel: "Predictive Maintenance",
    icon: Gear,
    iconGradient: "from-[#6366F1] to-[#4F46E5]",
    title: "The Bearing That Sounded Different",
    situation:
      "A production line bearing is beginning to fail. The degradation is gradual—vibration sensors show readings within normal range, but trending upward. An experienced operator notices the bearing sounds 'higher-pitched than normal' during her shift.",
    withoutTimeline: [
      {
        day: "Day 1",
        text: "Operator Maria notices unusual sound. Mentions it to colleague at shift change.",
      },
      {
        day: "Day 3",
        text: "Different operator on shift. No awareness of previous observation.",
      },
      {
        day: "Day 5",
        text: "Vibration readings increasing but still within spec. No action taken.",
      },
      {
        day: "Day 8",
        text: "Bearing fails catastrophically. Line down for emergency repair.",
      },
    ],
    withTimeline: [
      {
        day: "Day 1",
        text: "Maria voice-logs: 'Bearing on Line 3 sounds higher-pitched.' 20 seconds.",
      },
      {
        day: "Day 3",
        text: "Observation visible to all shifts. Maintenance adds to watch list.",
      },
      {
        day: "Day 5",
        text: "IDA correlates rising vibration trend with Maria's observation. Flags pattern.",
      },
      {
        day: "Day 6",
        text: "Bearing replaced during scheduled maintenance window.",
      },
    ],
    withoutOutcome: "€55,000 in repairs + lost production",
    withOutcome: "€800 planned replacement. Zero downtime.",
    insight:
      "Human senses detected the problem before sensors could measure it. The difference wasn't whether the observation happened—it was whether the observation was captured and connected.",
  },
  {
    category: "quality",
    categoryLabel: "Quality Control",
    icon: Eye,
    iconGradient: "from-[#F59E0B] to-[#D97706]",
    title: "The Material That Looked Different",
    situation:
      "A batch of incoming material meets all specifications on the certificate of analysis. But when operators start working with it, something seems off—the texture is slightly different, it doesn't flow quite the same way through the equipment.",
    withoutTimeline: [
      {
        day: "Morning",
        text: "Operator notices material 'looks grainier than usual.' Adjusts settings slightly.",
      },
      {
        day: "Afternoon",
        text: "Different operator on line. Uses standard settings. Quality issues begin.",
      },
      {
        day: "Next Day",
        text: "Quality team investigates. Spends hours reviewing data, can't find root cause.",
      },
      {
        day: "Day 3",
        text: "Finally connects it to material batch. 2 days of suboptimal production already run.",
      },
    ],
    withTimeline: [
      {
        day: "Morning",
        text: "Operator logs: 'New material batch looks grainier. Adjusted temp +5°C.' With photo.",
      },
      {
        day: "Afternoon",
        text: "Next operator sees observation, maintains adjusted settings.",
      },
      {
        day: "Shift Change",
        text: "Observation automatically included in shift handoff summary.",
      },
      {
        day: "When Issues Arise",
        text: "Query 'what changed today?' immediately surfaces material observation.",
      },
    ],
    withoutOutcome: "€30,000 scrap + 3-day investigation",
    withOutcome: "Root cause in minutes. Minimal scrap.",
    insight:
      "The material met specifications, but operators detected a meaningful difference that specs didn't capture. Their observation—properly captured and connected—explained the quality variation.",
  },
  {
    category: "knowledge",
    categoryLabel: "Knowledge Preservation",
    icon: UserCircleMinus,
    iconGradient: "from-[#EC4899] to-[#DB2777]",
    title: "The Expert Who Retired",
    situation:
      "Hans has been the lead technician for 28 years. He knows why Line 4 acts up on humid days, can diagnose problems by sound, and has seen every failure mode the equipment can produce. He's retiring in 6 months.",
    withoutTimeline: [
      {
        day: "Before Retirement",
        text: "HR schedules 'knowledge transfer sessions.' Hans shares what he can remember to share.",
      },
      {
        day: "Month 1 After",
        text: "Strange issue on Line 4. Team struggles. 'Hans would have known what this is.'",
      },
      {
        day: "Month 3 After",
        text: "Same issue recurs. Someone calls Hans at home. He's fishing, unavailable.",
      },
      {
        day: "Year 1 After",
        text: "Team has rebuilt some knowledge through painful trial and error. Much still lost.",
      },
    ],
    withTimeline: [
      {
        day: "18 Months Before",
        text: "Hans starts logging observations naturally as part of daily work. Zero extra effort.",
      },
      {
        day: "Before Retirement",
        text: "400+ observations captured. Patterns documented. Expertise searchable.",
      },
      {
        day: "Month 1 After",
        text: "Strange issue on Line 4. Query: 'Line 4 problems humidity' → Hans's observations surface.",
      },
      {
        day: "Ongoing",
        text: "Hans's expertise continues teaching new operators who never met him.",
      },
    ],
    withoutOutcome: "28 years of expertise largely lost",
    withOutcome: "Knowledge preserved, searchable, teachable",
    insight:
      "Knowledge transfer sessions capture what experts remember to share. Continuous capture over time captures what they actually know—including the things they've internalized so deeply they wouldn't think to mention.",
  },
  {
    category: "efficiency",
    categoryLabel: "Process Efficiency",
    icon: ArrowsClockwise,
    iconGradient: "from-[#10B981] to-[#059669]",
    title: "The Problem That Kept Coming Back",
    situation:
      "A foam overflow issue occurs roughly once a month during product changeovers. Each time it happens, operators figure out how to handle it. Each time it recurs, the solution has been forgotten or the people who knew have rotated to other shifts.",
    withoutTimeline: [
      {
        day: "January",
        text: "Foam overflow. Team A figures out the fix. Mentioned verbally at shift change.",
      },
      {
        day: "February",
        text: "Same problem, Team B on shift. Solve it again from scratch. Different approach.",
      },
      {
        day: "March",
        text: "Recurs again. Team C. 'Wait, didn't this happen before? What did they do?'",
      },
      {
        day: "Quarterly",
        text: "Pattern continues. Each occurrence wastes 2-3 hours. No institutional learning.",
      },
    ],
    withTimeline: [
      {
        day: "January",
        text: "Foam overflow. Team logs problem and solution with photos. 2 minutes.",
      },
      {
        day: "February",
        text: "First signs appear. Operator queries 'foam overflow changeover' → January solution surfaces.",
      },
      {
        day: "March",
        text: "IDA identifies pattern: 'Foam overflow occurs with Product A → B sequence.' Suggests prevention.",
      },
      {
        day: "April",
        text: "Validated solution becomes documented procedure. Problem prevented, not just solved.",
      },
    ],
    withoutOutcome: "Same problem solved 12+ times per year",
    withOutcome: "Solved once, learned permanently",
    insight:
      "The organization 'knew' how to solve this problem—multiple times. But organizational knowledge isn't the sum of individual knowledge. Without capture, connection, and preservation, learning doesn't compound.",
  },
  {
    category: "quality",
    categoryLabel: "Pattern Recognition",
    icon: CloudRain,
    iconGradient: "from-[#F59E0B] to-[#D97706]",
    title: "The Humidity Nobody Measured",
    situation:
      "Intermittent quality issues appear randomly—or so it seems. They don't correlate with any measured process parameters. The experienced operators have noticed they tend to happen 'when it's muggy,' but there's no humidity sensor in the production area.",
    withoutTimeline: [
      {
        day: "Investigation",
        text: "Quality team analyzes all measured parameters. No correlation found.",
      },
      {
        day: "Interviews",
        text: "Ask operators. Someone mentions humidity theory, but no data to validate.",
      },
      {
        day: "Hypothesis",
        text: "Install humidity sensor. Wait months for enough data points.",
      },
      {
        day: "Eventually",
        text: "Correlation confirmed. But only after extended investigation and ongoing issues.",
      },
    ],
    withTimeline: [
      {
        day: "Ongoing",
        text: "Operators log observations including environmental notes: 'humid today,' 'sticky,' 'muggy.'",
      },
      {
        day: "Investigation",
        text: "IDA query: 'What conditions when quality issues occur?' Surfaces humidity pattern.",
      },
      {
        day: "Validation",
        text: "Historical observations confirm: 80% of issues on days operators noted humidity.",
      },
      {
        day: "Action",
        text: "Process adjustment for humid conditions. Issues prevented, not just explained.",
      },
    ],
    withoutOutcome: "6+ months to identify pattern",
    withOutcome: "Pattern identified in days from existing data",
    insight:
      "Sensors can only measure what you've decided to measure. Human observations capture the unexpected—the variables you didn't know were relevant until they explained a pattern.",
  },
  {
    category: "efficiency",
    categoryLabel: "Communication",
    icon: ArrowsLeftRight,
    iconGradient: "from-[#10B981] to-[#059669]",
    title: "The Shift Handover That Actually Worked",
    situation:
      "Three shifts, continuous production. Information needs to pass seamlessly from one team to the next. Currently: verbal handoffs, paper logs that nobody reads, important details lost in translation.",
    withoutTimeline: [
      {
        day: "End of Shift A",
        text: "Operator mentions to incoming shift: 'Watch Line 2, it's been a bit finicky.'",
      },
      {
        day: "Shift B Starts",
        text: "Incoming operator gets pulled into urgent issue. Forgets the Line 2 note.",
      },
      {
        day: "Mid-Shift B",
        text: "Line 2 issue escalates. 'Nobody told us about this!'",
      },
      {
        day: "Shift C",
        text: "Paper log entry from Shift A found: 'Line 2 finicky.' No details on what or why.",
      },
    ],
    withTimeline: [
      {
        day: "During Shift A",
        text: "Operator logs Line 2 observations in real-time with specific details.",
      },
      {
        day: "End of Shift A",
        text: "IDA generates shift summary: key observations, ongoing issues, recommendations.",
      },
      {
        day: "Shift B Starts",
        text: "Incoming team reviews summary. Line 2 context clear regardless of verbal handoff.",
      },
      {
        day: "Ongoing",
        text: "Any shift can query history. Context never lost, regardless of who's working.",
      },
    ],
    withoutOutcome: "Information lost at every handover",
    withOutcome: "Continuity maintained across all shifts",
    insight:
      "Shift handovers fail not because people don't try, but because verbal communication is lossy and paper logs lack context. Continuous capture throughout the shift means the handover is already done.",
  },
];

export function ExamplesContent() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredExamples =
    activeFilter === "all"
      ? examples
      : examples.filter((ex) => ex.category === activeFilter);

  return (
    <>
      <ExampleFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className="section-padding bg-bg-light">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {filteredExamples.map((example) => (
                <ExampleCard key={example.title} {...example} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
