import { Button } from '@/components/primitives';
export default function NotFound() {
  return (
    <section className="container error-page">
      <h1>Let’s find the right path.</h1>
      <p>This page or programme could not be found.</p>
      <div className="actions">
        <Button href="/">Back to home</Button>
        <Button href="/funding" tone="outline">
          Explore programmes
        </Button>
      </div>
    </section>
  );
}
