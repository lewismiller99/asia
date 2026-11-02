"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  interestOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/enquiry";

const empty: EnquiryValues = { name: "", email: "", whatsapp: "", interests: [], idea: "" };

/**
 * The enquiry form. Validates on submit, builds a formatted message and
 * opens WhatsApp with it pre-filled. Nothing is sent until the visitor
 * presses send inside WhatsApp, and the form says so.
 */
export function EnquiryForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [opened, setOpened] = useState(false);
  const uid = useId();
  const destination = siteConfig.contact.whatsappNumber;
  const configured = destination.length > 0;

  function update<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleInterest(interest: string) {
    update(
      "interests",
      values.interests.includes(interest) ? values.interests.filter((i) => i !== interest) : [...values.interests, interest]
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }
    if (!configured) return;

    const message = buildEnquiryMessage(values, siteConfig.name, siteConfig.domain);
    const url = buildWhatsAppUrl(destination, message);
    // window.open returns null when "noopener" is passed as a feature, so
    // open plainly and sever the opener afterwards. If the browser blocked
    // the pop-up, navigate the current tab instead so nothing is lost.
    const popup = window.open(url, "_blank");
    if (popup) {
      popup.opener = null;
    } else {
      window.location.href = url;
      return;
    }
    setOpened(true);
  }

  const fieldClass = (key: keyof EnquiryErrors) => `field ${errors[key] ? "has-error" : ""}`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-9" aria-describedby={`${uid}-privacy`}>
      <div className="grid gap-9 sm:grid-cols-2">
        <div className={fieldClass("name")}>
          <label htmlFor={`${uid}-name`} className={`eyebrow eyebrow-plain ${dark ? "text-white/60" : "text-ash"}`}>
            Full name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            placeholder="Your name"
          />
          <span className="field-bar" />
          {errors.name && (
            <p id={`${uid}-name-error`} className="mt-2 text-xs text-seal">
              {errors.name}
            </p>
          )}
        </div>

        <div className={fieldClass("email")}>
          <label htmlFor={`${uid}-email`} className={`eyebrow eyebrow-plain ${dark ? "text-white/60" : "text-ash"}`}>
            Email address
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            placeholder="you@company.com"
          />
          <span className="field-bar" />
          {errors.email && (
            <p id={`${uid}-email-error`} className="mt-2 text-xs text-seal">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={fieldClass("whatsapp")}>
        <label htmlFor={`${uid}-whatsapp`} className={`eyebrow eyebrow-plain ${dark ? "text-white/60" : "text-ash"}`}>
          WhatsApp number, with country code
        </label>
        <input
          id={`${uid}-whatsapp`}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? `${uid}-whatsapp-error` : `${uid}-whatsapp-hint`}
          placeholder="+44 7700 900123"
        />
        <span className="field-bar" />
        {errors.whatsapp ? (
          <p id={`${uid}-whatsapp-error`} className="mt-2 text-xs text-seal">
            {errors.whatsapp}
          </p>
        ) : (
          <p id={`${uid}-whatsapp-hint`} className={`mt-2 text-xs ${dark ? "text-white/45" : "text-smoke"}`}>
            Start with + and your country code so we can reply on WhatsApp.
          </p>
        )}
      </div>

      <fieldset className="m-0 border-0 p-0" aria-describedby={errors.interests ? `${uid}-interests-error` : undefined}>
        <legend className={`eyebrow eyebrow-plain ${dark ? "text-white/60" : "text-ash"}`}>Product interests</legend>
        <div id={`${uid}-interests`} className="mt-4 flex flex-wrap gap-2.5" tabIndex={-1}>
          {interestOptions.map((option) => {
            const checked = values.interests.includes(option);
            return (
              <label key={option} className="chip">
                <input type="checkbox" name="interests" value={option} checked={checked} onChange={() => toggleInterest(option)} />
                <span className="chip-mark" aria-hidden="true" />
                {option}
              </label>
            );
          })}
        </div>
        {errors.interests && (
          <p id={`${uid}-interests-error`} className="mt-3 text-xs text-seal">
            {errors.interests}
          </p>
        )}
      </fieldset>

      <div className={fieldClass("idea")}>
        <label htmlFor={`${uid}-idea`} className={`eyebrow eyebrow-plain ${dark ? "text-white/60" : "text-ash"}`}>
          Tell us about your idea <span className={`normal-case tracking-normal ${dark ? "text-white/40" : "text-smoke"}`}>(optional)</span>
        </label>
        <textarea
          id={`${uid}-idea`}
          name="idea"
          rows={4}
          maxLength={1500}
          value={values.idea}
          onChange={(e) => update("idea", e.target.value)}
          placeholder="The product, the market, the timeline. A sentence or two is enough to start."
        />
        <span className="field-bar" />
        {errors.idea && <p className="mt-2 text-xs text-seal">{errors.idea}</p>}
      </div>

      <div className="grid gap-5">
        <button type="submit" className={`btn ${dark ? "btn-seal" : "btn-black"} w-full sm:w-auto`} disabled={!configured} aria-disabled={!configured}>
          <WhatsAppIcon size={18} />
          Send enquiry via WhatsApp
        </button>

        {!configured && (
          <p role="status" className={`border border-seal/50 px-4 py-3 text-sm ${dark ? "bg-seal/10 text-white" : "bg-seal/5 text-ink"}`}>
            The destination WhatsApp number has not been configured yet. Set{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_WHATSAPP_NUMBER</code> to enable this form.
          </p>
        )}

        {opened && (
          <p role="status" className={`border px-4 py-3 text-sm ${dark ? "border-white/20 bg-white/5 text-white" : "border-line bg-white text-ink"}`}>
            WhatsApp should now be open with your enquiry ready to review. It is only sent once you press send there. If
            nothing opened, check your pop-up settings and try again.
          </p>
        )}

        <p id={`${uid}-privacy`} className={`max-w-[36rem] text-xs leading-relaxed ${dark ? "text-white/45" : "text-smoke"}`}>
          Your details are used to compose a WhatsApp message on your device. They are not stored on this website.
          The message is shared through WhatsApp, whose own terms and privacy policy apply. Read our{" "}
          <Link href="/privacy" className={`link-rule ${dark ? "text-white" : "text-ink"}`}>
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
