/**
 * Validation for visitor enquiry / booking-request forms (§3.5 Phase 1).
 * Pure functions, mirrored server-side later.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SA_PHONE_RE = /^(\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;

/** Accommodation and activity enquiries need dates; general ones don't. */
export const needsDates = (category) => ['accommodation', 'agri-tourism'].includes(category);
export const needsPartySize = (category) =>
  ['accommodation', 'agri-tourism', 'adventure', 'weddings'].includes(category);

export function validateEnquiry(values, category) {
  const errors = {};

  if (!values.name?.trim()) errors.name = 'Please tell us your name.';

  if (!values.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address doesn\u2019t look right.';
  }

  if (values.phone?.trim() && !SA_PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'Enter a South African number, or leave this blank.';
  }

  if (!values.message?.trim()) {
    errors.message = 'Let the business know what you\u2019re asking about.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please add a little more detail.';
  }

  if (needsDates(category)) {
    if (!values.arrival) {
      errors.arrival = 'Choose an arrival date.';
    }
    if (values.arrival && values.departure && values.departure <= values.arrival) {
      errors.departure = 'Departure must be after arrival.';
    }
  }

  if (needsPartySize(category) && values.partySize && Number(values.partySize) < 1) {
    errors.partySize = 'Party size must be at least 1.';
  }

  // POPIA §6.1 — explicit consent before passing details to a third party
  if (!values.consent) {
    errors.consent = 'We need your consent to send this enquiry.';
  }

  return errors;
}

export const INITIAL_ENQUIRY = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  partySize: '',
  message: '',
  consent: false,
};