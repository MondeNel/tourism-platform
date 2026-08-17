import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Field, TextInput, TextArea, Select } from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { CATEGORIES } from '@/data/categories';
import { TOWNS } from '@/data/towns';
import { validateListing, INITIAL_LISTING } from '@/lib/validateListing';

export default function BusinessListingForm({ plan, onBack, onSubmitted }) {
  const [values, setValues] = useState(INITIAL_LISTING);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the error as soon as the user starts correcting it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateListing(values);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Move focus to the first invalid field for keyboard/screen-reader users
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setSubmitting(true);
    // Frontend-only for now: no backend to POST to yet (§3.4 business
    // registration is a Phase 3 deliverable). Simulate the round trip so the
    // success state and disabled-button behaviour are real.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    onSubmitted(values);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-night/60 hover:text-ochre transition-colors"
        >
          <ArrowLeft size={15} />
          Change plan
        </button>
        <span className="text-sm text-night/50">
          Selected: <strong className="text-night font-medium">{plan.name}</strong>
          {plan.cadence && ` \u2014 ${plan.priceLabel}${plan.cadence}`}
        </span>
      </div>

      {errorCount > 0 && (
        <div
          className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 mb-8"
          role="alert"
        >
          <AlertCircle size={17} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-800">
            {errorCount === 1
              ? 'There\u2019s one field that needs attention below.'
              : `There are ${errorCount} fields that need attention below.`}
          </p>
        </div>
      )}

      <fieldset className="mb-10">
        <legend className="font-display text-xl text-night mb-1">About the business</legend>
        <p className="text-night/50 text-sm mb-6">
          This is what visitors see on your listing.
        </p>

        <div className="space-y-5">
          <Field label="Business name" htmlFor="businessName" required error={errors.businessName}>
            <TextInput
              id="businessName"
              name="businessName"
              value={values.businessName}
              onChange={setField('businessName')}
              error={errors.businessName}
              placeholder="e.g. Orange River Lodge"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Category" htmlFor="category" required error={errors.category}>
              <Select id="category" name="category" value={values.category} onChange={setField('category')} error={errors.category}>
                <option value="">Choose a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Area" htmlFor="town" required error={errors.town}>
              <Select id="town" name="town" value={values.town} onChange={setField('town')} error={errors.town}>
                <option value="">Choose an area…</option>
                {TOWNS.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field
            label="Short description"
            htmlFor="shortDescription"
            required
            error={errors.shortDescription}
            hint={`${values.shortDescription.length}/200 characters — one or two sentences on what you offer.`}
          >
            <TextArea
              id="shortDescription"
              name="shortDescription"
              value={values.shortDescription}
              onChange={setField('shortDescription')}
              error={errors.shortDescription}
              maxLength={200}
              placeholder="Riverside chalets with private decks overlooking the Orange River…"
            />
          </Field>

          <Field label="Physical address" htmlFor="address" hint="Optional for now — we'll confirm GPS coordinates with you later.">
            <TextInput
              id="address"
              name="address"
              value={values.address}
              onChange={setField('address')}
              placeholder="12 Victoria Street, Prieska"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mb-10">
        <legend className="font-display text-xl text-night mb-1">How we reach you</legend>
        <p className="text-night/50 text-sm mb-6">
          Enquiries from visitors come through to these details.
        </p>

        <div className="space-y-5">
          <Field label="Contact person" htmlFor="contactName" required error={errors.contactName}>
            <TextInput
              id="contactName"
              name="contactName"
              value={values.contactName}
              onChange={setField('contactName')}
              error={errors.contactName}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Email" htmlFor="email" required error={errors.email}>
              <TextInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={setField('email')}
                error={errors.email}
              />
            </Field>

            <Field label="Phone" htmlFor="phone" required error={errors.phone}>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={setField('phone')}
                error={errors.phone}
                placeholder="053 353 1000"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="WhatsApp" htmlFor="whatsapp" hint="Optional.">
              <TextInput
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={values.whatsapp}
                onChange={setField('whatsapp')}
              />
            </Field>

            <Field label="Website" htmlFor="website" hint="Optional." error={errors.website}>
              <TextInput
                id="website"
                name="website"
                type="url"
                value={values.website}
                onChange={setField('website')}
                error={errors.website}
                placeholder="https://"
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* POPIA §6.1 — explicit, informed consent before processing personal info */}
      <div className="p-5 rounded-xl bg-night/[0.03] border border-night/10 mb-8">
        <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={setField('consent')}
            className="w-4 h-4 mt-0.5 rounded border-night/30 accent-ochre shrink-0"
            aria-invalid={Boolean(errors.consent)}
          />
          <span className="text-sm text-night/70 leading-relaxed">
            I consent to Siyathemba Local Municipality processing these details to
            create and manage my listing, in line with the{' '}
            <Link to="/privacy" className="text-ochre underline">
              privacy notice
            </Link>{' '}
            and the Protection of Personal Information Act (POPIA).
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-600 mt-2 ml-7" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" variant="ochre" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Submitting…' : 'Submit listing'}
      </Button>

      <p className="text-xs text-night/40 mt-4">
        We'll review your listing and be in touch within two business days.
      </p>
    </form>
  );
}