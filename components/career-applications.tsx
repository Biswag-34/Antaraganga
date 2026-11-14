'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { careerGroups, maxCvBytes } from '@/content/careers';
import { Icon } from '@/components/primitives';
import styles from './hospital-pages.module.css';

type Submission = { kind: 'error' | 'success'; message: string };

export default function CareerApplications({ preview }: { preview: boolean }) {
  const [role, setRole] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Submission | null>(null);
  const requestId = useRef<string | null>(null);
  const pending = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  function chooseRole(nextRole: string) {
    if (pending.current) return;
    if (nextRole !== role) requestId.current = null;
    setRole(nextRole);
    setResult(null);
    heading.current?.focus({ preventScroll: true });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const cv = data.get('cv');

    if (!(cv instanceof File) || !cv.name.toLowerCase().endsWith('.pdf') || cv.size > maxCvBytes) {
      setResult({ kind: 'error', message: 'Choose a PDF CV up to 4 MB.' });
      return;
    }

    pending.current = true;
    setSending(true);
    setResult(null);

    try {
      requestId.current ??= crypto.randomUUID();
      data.set('id', requestId.current);
      const response = await fetch('/api/career-applications', { method: 'POST', body: data });
      const reply = await response.json();

      if (response.status === 201) {
        form.reset();
        setRole('');
        requestId.current = null;
        setResult({
          kind: 'success',
          message: reply.preview
            ? 'Your test application was saved on this preview server.'
            : 'Your application has been received.',
        });
      } else {
        setResult({
          kind: 'error',
          message: reply.message || 'We could not submit your application. Please try again.',
        });
      }
    } catch {
      setResult({
        kind: 'error',
        message: 'We could not submit your application. Please try again.',
      });
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  return (
    <div className={'container ' + styles.careerLayout}>
      <section aria-labelledby="open-positions">
        <h2 id="open-positions">Current openings</h2>
        <div className={styles.roleGroups}>
          {careerGroups.map(({ title, roles, icon }) => (
            <div className={styles.roleGroup} key={title}>
              <h3>
                <Icon name={icon} />
                {title}
              </h3>
              <ul>
                {roles.map((position) => (
                  <li key={position}>
                    <a href="#apply" onClick={() => chooseRole(position)}>
                      <span>{position}</span>
                      <span aria-hidden="true">↗</span>
                      <span className={styles.visuallyHidden}> (apply)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.application} id="apply" aria-labelledby="application-heading">
        <h2 id="application-heading" ref={heading} tabIndex={-1}>
          Apply for a role
        </h2>
        {preview && <p className={styles.help}>Local preview. Use sample details and a test CV.</p>}
        <form
          action="/api/career-applications"
          method="post"
          encType="multipart/form-data"
          aria-busy={sending}
          onSubmit={submit}
          onChange={() => {
            requestId.current = null;
            setResult(null);
          }}
        >
          <fieldset disabled={sending} aria-label="Application details">
            <div className={styles.field}>
              <label htmlFor="career-position">Position</label>
              <select
                id="career-position"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select a position
                </option>
                {careerGroups.map(({ title, roles }) => (
                  <optgroup key={title} label={title}>
                    {roles.map((position) => (
                      <option key={position}>{position}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <label>
              Full name
              <input name="name" autoComplete="name" maxLength={120} required />
            </label>
            <div className={styles.contactFields}>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" maxLength={254} required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" maxLength={32} required />
              </label>
            </div>
            <div className={styles.field}>
              <label htmlFor="career-cv">CV</label>
              <input
                id="career-cv"
                name="cv"
                type="file"
                accept=".pdf,application/pdf"
                aria-describedby="cv-hint"
                required
              />
              <span className={styles.help} id="cv-hint">
                PDF, up to 4 MB
              </span>
            </div>
            <p className={styles.help}>
              Your details and CV are used to review your application.{' '}
              <Link href="/privacy">Privacy notice</Link>
            </p>
            <button className="button button--teal" type="submit">
              {sending ? 'Submitting…' : 'Submit application'} <span aria-hidden="true">→</span>
            </button>
          </fieldset>
        </form>
        {result && (
          <p
            className={styles.formResult}
            data-kind={result.kind}
            role={result.kind === 'error' ? 'alert' : 'status'}
          >
            {result.message}
          </p>
        )}
      </section>
    </div>
  );
}
