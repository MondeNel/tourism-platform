import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Field, TextInput, TextArea } from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import {
  validateEnquiry,
  INITIAL_ENQUIRY,
  needsDates,
  needsPartySize,
} from '@/lib/validateEnquiry';

export default function EnquiryForm({ business }) {
  const [values, setValues] = useState(INITIAL_ENQUIRY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const showDates = needsDates(business.category);
  const showParty = needsPartySize(business.category);

  const setField = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateEnquiry(values, business.category);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setSubmitting(true);
    // No backend yet — §3.5 requires automated email notification to the
    // business on submission, which needs the API layer (Phase 3).
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-night/5 p-6" role="status">
        <CheckCircle2 size={26} className="text-river mb-4" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-night mb-2">Enquiry sent</h3>
        <p className="text-night/60 text-sm leading-relaxed mb-4">
          {business.name} has your details and will reply directly. Most
          businesses in the directory respond within a day or two.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(INITIAL_ENQUIRY);
            setSent(false);
          }}
          className="text-sm text-ochre hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-night/5 p-6">
      <h3 className="font-display text-xl text-night mb-1">
        {showDates ? 'Request a booking' : 'Send an enquiry'}
      </h3>
      <p className="text-night/50 text-sm mb-6">
        Goes straight to {business.name}. No account needed.
      </p>

      {errorCount > 0 && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 mb-5" role="alert">
          <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-800">
            {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <Field label="Your name" htmlFor="name" required error={errors.name}>
          <TextInput id="name" name="name" value={values.name} onChange={setField('name')} error={errors.name} />
        </Field>

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

        <Field label="Phone" htmlFor="phone" hint="Optional." error={errors.phone}>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={setField('phone')}
            error={errors.phone}
          />
        </Field>

        {showDates && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Arrival" htmlFor="arrival" required error={errors.arrival}>
              <TextInput
                id="arrival"
                name="arrival"
                type="date"
                value={values.arrival}
                onChange={setField('arrival')}
                error={errors.arrival}
              />
            </Field>
            <Field label="Departure" htmlFor="departure" error={errors.departure}>
              <TextInput
                id="departure"
                name="departure"
                type="date"
                value={values.departure}
                onChange={setField('departure')}
                error={errors.departure}
              />
            </Field>
          </div>
        )}

        {showParty && (
          <Field label="Number of people" htmlFor="partySize" error={errors.partySize}>
            <TextInput
              id="partySize"
              name="partySize"
              type="number"
              min="1"
              value={values.partySize}
              onChange={setField('partySize')}
              error={errors.partySize}
            />
          </Field>
        )}

        <Field
          label="Your message"
          htmlFor="message"
          required
          error={errors.message}
          hint="Any special requirements, questions, or details worth knowing."
        >
          <TextArea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={setField('message')}
            error={errors.message}
          />
        </Field>

        {/* POPIA §6.1 — consent before sharing details with the business */}
        <div>
          <label htmlFor="consent" className="flex items-start gap-2.5 cursor-pointer">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={setField('consent')}
              className="w-4 h-4 mt-0.5 rounded border-night/30 accent-ochre shrink-0"
              aria-invalid={Boolean(errors.consent)}
            />
            <span className="text-xs text-night/60 leading-relaxed">
              I agree to my details being shared with this business so they can
              respond, per the{' '}
              <Link to="/privacy" className="text-ochre underline">
                privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-red-600 mt-1.5 ml-6" role="alert">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="ochre" disabled={submitting} className="w-full mt-6">
        {submitting ? 'Sending…' : showDates ? 'Request booking' : 'Send enquiry'}
      </Button>
    </form>
  );
}