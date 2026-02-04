import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Gear,
  Eye,
  UserCircleMinus,
  ArrowsClockwise,
  CloudRain,
  ArrowsLeftRight,
} from "@phosphor-icons/react";

export interface TimelineEvent {
  day: string;
  text: string;
}

export interface Example {
  category: string;
  categoryLabel: string;
  icon: PhosphorIcon;
  iconGradient: string;
  title: string;
  situation: string;
  withoutTimeline: TimelineEvent[];
  withTimeline: TimelineEvent[];
  withoutOutcome: string;
  withOutcome: string;
  insight: string;
}

export const examples: Example[] = [
  {
    category: "maintenance",
    categoryLabel: "Predictive Maintenance",
    icon: Gear,
    iconGradient: "from-[#6366F1] to-[#4F46E5]",
    title: "The Bearing That Sounded Different",
    situation:
      "A production line bearing is beginning to fail. The degradation is gradual\u2014vibration sensors show readings within normal range, but trending upward. An experienced operator notices the bearing sounds \u2018higher-pitched than normal\u2019 during her shift.",
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
        text: "Maria voice-logs: \u2018Bearing on Line 3 sounds higher-pitched.\u2019 20 seconds.",
      },
      {
        day: "Day 3",
        text: "Observation visible to all shifts. Maintenance adds to watch list.",
      },
      {
        day: "Day 5",
        text: "IDA correlates rising vibration trend with Maria\u2019s observation. Flags pattern.",
      },
      {
        day: "Day 6",
        text: "Bearing replaced during scheduled maintenance window.",
      },
    ],
    withoutOutcome: "\u20AC55,000 in repairs + lost production",
    withOutcome: "\u20AC800 planned replacement. Zero downtime.",
    insight:
      "Human senses detected the problem before sensors could measure it. The difference wasn\u2019t whether the observation happened\u2014it was whether the observation was captured and connected.",
  },
  {
    category: "quality",
    categoryLabel: "Quality Control",
    icon: Eye,
    iconGradient: "from-[#F59E0B] to-[#D97706]",
    title: "The Material That Looked Different",
    situation:
      "A batch of incoming material meets all specifications on the certificate of analysis. But when operators start working with it, something seems off\u2014the texture is slightly different, it doesn\u2019t flow quite the same way through the equipment.",
    withoutTimeline: [
      {
        day: "Morning",
        text: "Operator notices material \u2018looks grainier than usual.\u2019 Adjusts settings slightly.",
      },
      {
        day: "Afternoon",
        text: "Different operator on line. Uses standard settings. Quality issues begin.",
      },
      {
        day: "Next Day",
        text: "Quality team investigates. Spends hours reviewing data, can\u2019t find root cause.",
      },
      {
        day: "Day 3",
        text: "Finally connects it to material batch. 2 days of suboptimal production already run.",
      },
    ],
    withTimeline: [
      {
        day: "Morning",
        text: "Operator logs: \u2018New material batch looks grainier. Adjusted temp +5\u00B0C.\u2019 With photo.",
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
        text: "Query \u2018what changed today?\u2019 immediately surfaces material observation.",
      },
    ],
    withoutOutcome: "\u20AC30,000 scrap + 3-day investigation",
    withOutcome: "Root cause in minutes. Minimal scrap.",
    insight:
      "The material met specifications, but operators detected a meaningful difference that specs didn\u2019t capture. Their observation\u2014properly captured and connected\u2014explained the quality variation.",
  },
  {
    category: "knowledge",
    categoryLabel: "Knowledge Preservation",
    icon: UserCircleMinus,
    iconGradient: "from-[#EC4899] to-[#DB2777]",
    title: "The Expert Who Retired",
    situation:
      "Hans has been the lead technician for 28 years. He knows why Line 4 acts up on humid days, can diagnose problems by sound, and has seen every failure mode the equipment can produce. He\u2019s retiring in 6 months.",
    withoutTimeline: [
      {
        day: "Before Retirement",
        text: "HR schedules \u2018knowledge transfer sessions.\u2019 Hans shares what he can remember to share.",
      },
      {
        day: "Month 1 After",
        text: "Strange issue on Line 4. Team struggles. \u2018Hans would have known what this is.\u2019",
      },
      {
        day: "Month 3 After",
        text: "Same issue recurs. Someone calls Hans at home. He\u2019s fishing, unavailable.",
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
        text: "Strange issue on Line 4. Query: \u2018Line 4 problems humidity\u2019 \u2192 Hans\u2019s observations surface.",
      },
      {
        day: "Ongoing",
        text: "Hans\u2019s expertise continues teaching new operators who never met him.",
      },
    ],
    withoutOutcome: "28 years of expertise largely lost",
    withOutcome: "Knowledge preserved, searchable, teachable",
    insight:
      "Knowledge transfer sessions capture what experts remember to share. Continuous capture over time captures what they actually know\u2014including the things they\u2019ve internalized so deeply they wouldn\u2019t think to mention.",
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
        text: "Recurs again. Team C. \u2018Wait, didn\u2019t this happen before? What did they do?\u2019",
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
        text: "First signs appear. Operator queries \u2018foam overflow changeover\u2019 \u2192 January solution surfaces.",
      },
      {
        day: "March",
        text: "IDA identifies pattern: \u2018Foam overflow occurs with Product A \u2192 B sequence.\u2019 Suggests prevention.",
      },
      {
        day: "April",
        text: "Validated solution becomes documented procedure. Problem prevented, not just solved.",
      },
    ],
    withoutOutcome: "Same problem solved 12+ times per year",
    withOutcome: "Solved once, learned permanently",
    insight:
      "The organization \u2018knew\u2019 how to solve this problem\u2014multiple times. But organizational knowledge isn\u2019t the sum of individual knowledge. Without capture, connection, and preservation, learning doesn\u2019t compound.",
  },
  {
    category: "quality",
    categoryLabel: "Pattern Recognition",
    icon: CloudRain,
    iconGradient: "from-[#F59E0B] to-[#D97706]",
    title: "The Humidity Nobody Measured",
    situation:
      "Intermittent quality issues appear randomly\u2014or so it seems. They don\u2019t correlate with any measured process parameters. The experienced operators have noticed they tend to happen \u2018when it\u2019s muggy,\u2019 but there\u2019s no humidity sensor in the production area.",
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
        text: "Operators log observations including environmental notes: \u2018humid today,\u2019 \u2018sticky,\u2019 \u2018muggy.\u2019",
      },
      {
        day: "Investigation",
        text: "IDA query: \u2018What conditions when quality issues occur?\u2019 Surfaces humidity pattern.",
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
      "Sensors can only measure what you\u2019ve decided to measure. Human observations capture the unexpected\u2014the variables you didn\u2019t know were relevant until they explained a pattern.",
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
        text: "Operator mentions to incoming shift: \u2018Watch Line 2, it\u2019s been a bit finicky.\u2019",
      },
      {
        day: "Shift B Starts",
        text: "Incoming operator gets pulled into urgent issue. Forgets the Line 2 note.",
      },
      {
        day: "Mid-Shift B",
        text: "Line 2 issue escalates. \u2018Nobody told us about this!\u2019",
      },
      {
        day: "Shift C",
        text: "Paper log entry from Shift A found: \u2018Line 2 finicky.\u2019 No details on what or why.",
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
        text: "Any shift can query history. Context never lost, regardless of who\u2019s working.",
      },
    ],
    withoutOutcome: "Information lost at every handover",
    withOutcome: "Continuity maintained across all shifts",
    insight:
      "Shift handovers fail not because people don\u2019t try, but because verbal communication is lossy and paper logs lack context. Continuous capture throughout the shift means the handover is already done.",
  },
];
