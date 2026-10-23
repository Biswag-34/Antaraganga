'use client';
import { useRef, useState } from 'react';
import { programmes } from '@/content/programmes';
import { Selector } from './interactive';
import { Icon } from './primitives';
const types = [
  {
    id: 'hospital',
    label: 'Hospital enquiry',
    copy: 'General hospital and care',
    icon: 'consultation',
  },
  {
    id: 'partnership',
    label: 'CSR partnership',
    copy: 'Support our work together',
    icon: 'partnership',
  },
  {
    id: 'outreach',
    label: 'Outreach collaboration',
    copy: 'Community and research',
    icon: 'community-first',
  },
];
export default function ContactForm({
  initialType,
  initialInterest,
}: {
  initialType: string;
  initialInterest: string;
}) {
  const [type, setType] = useState(
    Math.max(
      0,
      types.findIndex((t) => t.id === initialType)
    )
  );
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState({
    organisation: '',
    name: '',
    email: '',
    interest: initialInterest || 'General enquiry',
    message: '',
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const update = (key: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));
  const interests = Array.from(
    new Set([
      values.interest,
      'General enquiry',
      ...programmes.map((p) => p.title),
      'Hospital visit',
      'Health-card initiative',
      'Community health camps',
      'First-aid training',
      'Institutional documents',
      'Reporting framework',
    ])
  );
  function saveDraft() {
    const text = `ANTHARAGANGE — ENQUIRY DRAFT\nNot sent. Delivery is not configured.\n\nEnquiry type: ${types[type].label}\nOrganisation: ${values.organisation}\nContact person: ${values.name}\nEmail: ${values.email}\nArea of interest: ${values.interest}\n\n${values.message}`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antharagange-enquiry-draft.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  }
  return (
    <>
      <div className="contact-type-rail container">
        <Selector
          labels={types.map((t) => t.label)}
          icons={types.map((t) => t.icon)}
          descriptions={types.map((t) => t.copy)}
          selected={type}
          onChange={(i) => {
            setType(i);
            setStep(0);
            setSaved(false);
          }}
        />
      </div>
      <div className="contact-form-wrap">
        <div className="form-stepper" aria-label="Enquiry progress">
          <span
            className={step === 0 ? 'active' : ''}
            aria-current={step === 0 ? 'step' : undefined}
          >
            <b>01</b>Your details
          </span>
          <span aria-hidden="true">⟶</span>
          <span
            className={step === 1 ? 'active' : ''}
            aria-current={step === 1 ? 'step' : undefined}
          >
            <b>02</b>Review
          </span>
        </div>
        <div className="form-heading-icon" aria-hidden="true">
          <Icon name={step === 0 ? types[type].icon : 'clipboard-check'} />
        </div>
        <h2 ref={heading} tabIndex={-1}>
          {step === 0
            ? type === 0
              ? 'Tell us how we can help.'
              : type === 1
                ? 'Tell us about your organisation.'
                : 'Let’s connect with your community.'
            : 'Review your enquiry'}
        </h2>
        <p className="form-intro">
          {step === 0
            ? 'A little about you, and how we can help. Complete the details below to prepare your enquiry.'
            : 'Take a moment to check your details before saving a copy.'}
        </p>
        {step === 0 ? (
          <form
            className="enquiry-form"
            aria-describedby="enquiry-privacy enquiry-preview"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(1);
              setSaved(false);
              requestAnimationFrame(() => heading.current?.focus());
            }}
          >
            {type !== 0 && (
              <label>
                Organisation{' '}
                <span className="required-mark" aria-hidden="true">
                  *
                </span>
                <input
                  autoComplete="organization"
                  name="organisation"
                  placeholder="Enter organisation name"
                  value={values.organisation}
                  onChange={(e) => update('organisation', e.target.value)}
                  required
                  maxLength={180}
                />
              </label>
            )}
            <label className="field-half">
              {type === 0 ? 'Your name' : 'Contact person'}
              <span className="required-mark" aria-hidden="true">
                {' '}
                *
              </span>
              <input
                autoComplete="name"
                name="name"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                required
                maxLength={120}
              />
            </label>
            <label className="field-half">
              {type === 0 ? 'Email' : 'Work email'}
              <span className="required-mark" aria-hidden="true">
                {' '}
                *
              </span>
              <input
                autoComplete="email"
                name="email"
                type="email"
                placeholder={type === 0 ? 'you@example.com' : 'name@organisation.org'}
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
                required
                maxLength={254}
              />
            </label>
            <label>
              Area of interest
              <select
                name="interest"
                value={values.interest}
                onChange={(e) => update('interest', e.target.value)}
              >
                {interests.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              What would you like to discuss?
              <span className="required-mark" aria-hidden="true">
                {' '}
                *
              </span>
              <textarea
                name="message"
                placeholder="Share a few details…"
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                required
                minLength={10}
                maxLength={4000}
                rows={4}
              />
            </label>
            <p className="form-privacy" id="enquiry-privacy">
              Please do not include medical records or sensitive health information.
            </p>
            <button className="button button--teal" type="submit">
              Review enquiry <span aria-hidden="true">→</span>
            </button>
            <p className="form-note" id="enquiry-preview">
              Fields marked * are required. Review and save a draft; no enquiry is sent.
            </p>
          </form>
        ) : (
          <div className="form-review">
            <dl>
              <div>
                <dt>Enquiry type</dt>
                <dd>{types[type].label}</dd>
              </div>
              <div>
                <dt>Area of interest</dt>
                <dd>{values.interest}</dd>
              </div>
              {type !== 0 && (
                <div>
                  <dt>Organisation</dt>
                  <dd>{values.organisation}</dd>
                </div>
              )}
              <div>
                <dt>Contact person</dt>
                <dd>{values.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{values.email}</dd>
              </div>
              <div>
                <dt>Your message</dt>
                <dd className="review-message">{values.message}</dd>
              </div>
            </dl>
            <div className="delivery-note">
              <Icon name="file-text" />
              <p>
                Online delivery is not connected. You can save a copy of your enquiry as a text
                file.
              </p>
            </div>
            <div className="actions">
              <button
                className="button button--outline"
                onClick={() => {
                  setStep(0);
                  requestAnimationFrame(() => heading.current?.focus());
                }}
              >
                Edit details
              </button>
              <button className="button button--teal" onClick={saveDraft}>
                Save enquiry draft <span>↓</span>
              </button>
            </div>
            {saved && (
              <p role="status" className="draft-status">
                Your draft has been prepared for download. Nothing has been sent to the hospital.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
