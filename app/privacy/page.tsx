import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
export const metadata = pageMetadata('/privacy');
export default function Privacy() {
  return (
    <article className="container legal-page">
      <PageStructuredData path="/privacy" />
      <h1>Privacy</h1>
      <p>
        The general enquiry form lets you review information and download a draft to your own
        device.
      </p>
      <h2>Your information</h2>
      <p>
        The donation callback form collects your name, phone number and selected programme so the
        hospital team can follow up about your contribution. Local preview requests are stored on
        the preview server. Use sample details when testing. Please keep medical records and health
        information out of both forms.
      </p>
      <h2>Before public launch</h2>
      <p>
        The hospital must approve its privacy notice, contact information, retention practices and
        any form-delivery service before collecting real enquiries online.
      </p>
    </article>
  );
}
