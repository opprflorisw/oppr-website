import { ExamplesPageHeader } from "@/components/examples/ExamplesPageHeader";
import { ExamplesViewer } from "@/components/examples/ExamplesViewer";
import { PatternSection } from "@/components/examples/PatternSection";
import { ExamplesCTA } from "@/components/examples/ExamplesCTA";

export default function ExamplesPage() {
  return (
    <>
      <ExamplesPageHeader />
      <ExamplesViewer />
      <PatternSection />
      <ExamplesCTA />
    </>
  );
}
