import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Website Information' };
export default function Terms() {
  return (
    <article className="container legal-page">
      <h1>Website information</h1>
      <p>
        This is a design and functionality preview. Hospital information, service availability,
        contact details, branding and final copy require institutional approval before launch.
      </p>
      <h2>Care information</h2>
      <p>
        The site describes areas of care and proposed services. It does not provide personal medical
        advice or confirm that a service is currently operating. Contact the hospital to confirm
        availability.
      </p>
      <h2>Programme proposals</h2>
      <p>
        Budgets shown are source planning estimates. They do not establish remaining funding
        balances or supplier quotations. Some proposals are components of larger allocations and
        must not be added together. The original DOCX proposals contain the relevant scope and
        disclosures.
      </p>
      <h2>Imagery</h2>
      <p>
        Clinical images are illustrative. The hospital hero is adapted from an architectural
        rendering. Imagery is not evidence of actual staff, purchased equipment or operational
        facilities.
      </p>
    </article>
  );
}
