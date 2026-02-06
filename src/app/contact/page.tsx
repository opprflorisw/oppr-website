import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Oppr",
  description: "Have questions about Oppr? Want to learn how we can help your manufacturing operation? Contact us and we'll get back to you within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
    </>
  );
}
