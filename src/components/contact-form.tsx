"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

const interestOptions = [
  "Investment",
  "Advisory",
  "Technology",
  "Property",
  "Partnership",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

// No backend is wired up yet. See README.md ("How to change contact
// details" / form integration) for the recommended way to connect this to
// Formspree, Resend, a serverless function, or another provider by setting
// NEXT_PUBLIC_FORM_ENDPOINT. Until then, a valid submission opens the
// visitor's email client with the message pre-filled, so nothing is lost.
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (message.length < 10)
      nextErrors.message = "Please add a few more details.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!response.ok) throw new Error("Submission failed");
        setStatus("success");
        form.reset();
        return;
      }

      // Fallback with no backend configured: compose a pre-filled email.
      const company = String(data.get("company") ?? "");
      const phone = String(data.get("phone") ?? "");
      const interest = String(data.get("interest") ?? "");
      const body = [
        `Name: ${name}`,
        company && `Company: ${company}`,
        phone && `Telephone: ${phone}`,
        `Area of interest: ${interest}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
        `Enquiry from ${name}`
      )}&body=${encodeURIComponent(body)}`;

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-bronze/50 bg-bronze/5 px-6 py-8 text-center"
      >
        <p className="font-serif-display text-xl text-ink">Thank you.</p>
        <p className="mt-2 text-sm leading-relaxed text-olive">
          Your enquiry has been received. We aim to respond within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} />
        <Field label="Company" name="company" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          required
          error={errors.email}
        />
        <Field label="Telephone (optional)" name="phone" type="tel" />
      </div>

      <div>
        <label
          htmlFor="interest"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-olive"
        >
          Area of Interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue="Investment"
          className="mt-2 w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze"
        >
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-olive"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze"
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-red-700">
          Something went wrong sending your enquiry. Please try again or
          email {siteConfig.contactEmail} directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center border border-ink bg-ink px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-olive disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] font-medium uppercase tracking-[0.16em] text-olive"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze"
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
