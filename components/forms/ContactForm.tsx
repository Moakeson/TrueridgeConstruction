"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-brand-accent/30 bg-brand-accent/10 p-6 text-center">
        <p className="font-heading text-lg font-semibold">Thank you for reaching out.</p>
        <p className="mt-2 text-brand-muted">
          We will get back to you as soon as possible.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="from_name" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="from_name"
          name="from_name"
          required
          className="mt-1 w-full rounded-sm border border-brand-black/20 bg-white px-4 py-3 text-brand-black focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 w-full rounded-sm border border-brand-black/20 bg-white px-4 py-3 text-brand-black focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
      </div>

      <div>
        <label htmlFor="from_email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="from_email"
          name="from_email"
          required
          className="mt-1 w-full rounded-sm border border-brand-black/20 bg-white px-4 py-3 text-brand-black focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Tell Us About Your Project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-sm border border-brand-black/20 bg-white px-4 py-3 text-brand-black focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
      </div>

      {status === "error" && (
        <div className="rounded-sm border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <p>Something went wrong sending your message.</p>
          <p className="mt-2">
            Please reach us at{" "}
            <a href={SITE.emailHref} className="font-medium underline">
              {SITE.email}
            </a>{" "}
            or call{" "}
            <a href={SITE.phoneHref} className="font-medium underline">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
