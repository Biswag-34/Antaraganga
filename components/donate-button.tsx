'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { hospital } from '@/content/hospital';
import { Icon } from './primitives';

export function DonateButton({ id, title }: { id: string; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const requestId = useRef('');
  const headingId = useId();
  const descriptionId = useId();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'preview' | 'error' | 'invalid'>(
    'idle'
  );
  const succeeded = state === 'sent' || state === 'preview';
  const sending = state === 'sending';

  function open() {
    setState('idle');
    requestId.current = crypto.randomUUID();
    dialog.current?.querySelector('form')?.reset();
    dialog.current?.showModal();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = new FormData(event.currentTarget);
    setState('sending');
    try {
      const response = await fetch('/api/donation-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId.current,
          programme: id,
          name: form.get('name'),
          phone: form.get('phone'),
        }),
      });
      if (!response.ok) {
        setState(response.status === 400 ? 'invalid' : 'error');
        return;
      }
      const result = await response.json();
      setState(result.preview ? 'preview' : 'sent');
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="button button--gold donate-button"
        aria-haspopup="dialog"
        aria-label={`Donate to ${title}`}
        onClick={open}
      >
        <Icon name="heart" />
        Donate
      </button>
      <dialog
        ref={dialog}
        className="donation-dialog"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          if (sending) event.preventDefault();
        }}
        onClose={() => trigger.current?.focus()}
      >
        <button
          className="donation-dialog-close"
          type="button"
          aria-label="Close donation form"
          disabled={sending}
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {succeeded ? (
          <div className="donation-confirmation">
            <span className="icon-circle">
              <Icon name="heart" />
            </span>
            <h2 id={headingId} ref={confirmation} tabIndex={-1}>
              Thank you for supporting {title}.
            </h2>
            <p id={descriptionId}>
              {state === 'preview'
                ? 'Your request was saved on this preview server. When the live form is connected, our team will call you to share the programme details and guide you through the donation.'
                : 'We received your request. Our team will call you at the number you shared to answer your questions and explain how to complete your donation.'}
            </p>
            <button
              className="button button--teal"
              type="button"
              onClick={() => dialog.current?.close()}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="fund-eyebrow">Donation callback</p>
            <h2 id={headingId}>{title}</h2>
            <p id={descriptionId}>
              Give any amount you choose. Share your details and our team will call you to discuss
              your contribution.
            </p>
            <form className="donation-form" onSubmit={submit} aria-busy={sending}>
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  readOnly={sending}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={32}
                  readOnly={sending}
                  placeholder="e.g. +91 98765 43210"
                />
              </label>
              <p className="donation-note">
                {process.env.NODE_ENV === 'development'
                  ? 'This preview saves requests locally. Use sample contact details.'
                  : 'We’ll use your phone number to follow up about this donation.'}
              </p>
              {state === 'invalid' && (
                <p role="alert">Enter your name and a valid phone number, then try again.</p>
              )}
              {state === 'error' && (
                <p role="alert">
                  We couldn’t confirm your request. Please try again or call{' '}
                  <a href={hospital.phoneHref}>{hospital.phone}</a>.
                </p>
              )}
              <button className="button button--teal" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Request a callback'}
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
