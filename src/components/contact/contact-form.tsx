"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { services } from "@/config/services";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";

type Status = "idle" | "submitting" | "success";

const budgetOptions = [
  { value: "under-1.5l", label: "Under ₹1.5L" },
  { value: "1.5-3l", label: "₹1.5L – ₹3L" },
  { value: "3-6l", label: "₹3L – ₹6L" },
  { value: "6-15l", label: "₹6L – ₹15L" },
  { value: "15l-plus", label: "₹15L+" },
  { value: "not-sure", label: "Not sure yet" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Simulated submission — wire to your endpoint / form service here.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setStatus("success");
  }

  return (
    <div className="relative mt-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] px-6 py-16 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_32px_-8px_rgb(16_185_129/0.6)]"
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
              Message received
            </h3>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              Thank you for reaching out. A senior member of our team will reply within one business
              day — usually much sooner.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm font-medium text-brand-600 link-underline dark:text-brand-400"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -12 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Input label="Your name" name="name" placeholder="Priya Sharma" required autoComplete="name" />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="priya@company.com"
              required
              autoComplete="email"
            />
            <Input label="Phone (optional)" name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
            <Input label="Company (optional)" name="company" placeholder="Company name" autoComplete="organization" />
            <Select
              label="What do you need?"
              name="service"
              required
              placeholder="Select a service"
              options={services.map((s) => ({ value: s.slug, label: s.title }))}
              className="sm:col-span-1"
            />
            <Select
              label="Budget range"
              name="budget"
              required
              placeholder="Select a range"
              options={budgetOptions}
            />
            <Select
              label="Timeline"
              name="timeline"
              placeholder="When do you need this?"
              options={timelineOptions}
              className="sm:col-span-2"
            />
            <Textarea
              label="Tell us about your project"
              name="message"
              placeholder="What does your business do, what are you trying to achieve, and what's not working right now?"
              required
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" ? (
                  <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send enquiry
                  </>
                )}
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                  privacy policy
                </a>
                . We reply personally to every genuine enquiry — never with automated sales sequences.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
