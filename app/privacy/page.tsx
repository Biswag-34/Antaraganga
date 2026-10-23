import { pageMetadata } from '@/lib/seo';
import { PageStructuredData } from '@/components/seo';
export const metadata = pageMetadata('/privacy');
export default function Privacy() {
  return (
    <article className="container legal-page">
      <PageStructuredData path="/privacy" />
      <h1>Privacy</h1>
      <p>
        This website is a local design preview for Antharagange Rural Hospital. The enquiry form
        lets you review information and download a draft to your own device. It does not send that
        information to the hospital or save it in a database.
      </p>
      <h2>Your information</h2>
      <p>
        Do not include medical records or sensitive health information. Form fields remain in the
        current page’s memory while you review your draft. This preview does not use analytics or
        marketing cookies.
      </p>
      <h2>Before public launch</h2>
      <p>
        The hospital must approve its privacy notice, contact information, retention practices and
        any form-delivery service before collecting real enquiries online.
      </p>
    </article>
  );
}
