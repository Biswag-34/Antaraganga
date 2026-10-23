'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="container error-page">
      <h1>Let’s try that again.</h1>
      <p>We couldn’t load this page. Please retry.</p>
      <button className="button button--teal" onClick={reset}>
        Try again →
      </button>
    </section>
  );
}
