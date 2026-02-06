import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | Oppr for Every Manufacturing Operation",
  description: "Whether you're an SME manufacturer, enterprise, or consultant — discover how Oppr's Digital Operator Platform fits your specific operational challenges.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
