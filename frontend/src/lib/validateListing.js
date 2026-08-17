/**
 * Validation for the business listing form. Pure functions so they're
 * testable and reusable server-side later — client validation is a UX
 * convenience, never the security boundary.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// SA numbers: 0XX XXX XXXX or +27XX XXX XXXX, spaces/dashes tolerated
const SA_PHONE_RE = /^(\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;

export function validateListing(values) {
  const errors = {};

  if (!values.businessName?.trim()) {
    errors.businessName = 'Business name is required.';
  }

  if (!values.category) {
    errors.category = 'Please choose a category.';
  }

  if (!values.town) {
    errors.town = 'Please choose an area.';
  }

  if (!values.shortDescription?.trim()) {
    errors.shortDescription = 'A short description is required.';
  } else if (values.shortDescription.trim().length < 20) {
    errors.shortDescription = 'Please write at least 20 characters.';
  } else if (values.shortDescription.length > 200) {
    errors.shortDescription = 'Keep this under 200 characters.';
  }

  if (!values.contactName?.trim()) {
    errors.contactName = 'Contact name is required.';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address doesn\u2019t look right.';
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!SA_PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'Enter a South African number, e.g. 053 353 1000 or +27 53 353 1000.';
  }

  if (values.website?.trim() && !/^https?:\/\/.+\..+/.test(values.website.trim())) {
    errors.website = 'Include the full URL, starting with https://';
  }

  // POPIA §6.1 requires explicit, informed consent before processing.
  if (!values.consent) {
    errors.consent = 'We need your consent to process this information.';
  }

  return errors;
}

export const INITIAL_LISTING = {
  businessName: '',
  category: '',
  town: '',
  shortDescription: '',
  contactName: '',
  email: '',
  phone: '',
  whatsapp: '',
  website: '',
  address: '',
  consent: false,
};