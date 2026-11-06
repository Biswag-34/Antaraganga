import { Button, Icon, SectionTitle, SplitHero } from '@/components/primitives';
import { PageStructuredData } from '@/components/seo';
import { doctors, type Doctor } from '@/content/doctors';
import { enquiryUrl } from '@/content/programmes';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/team');

function DoctorCard({ doctor }: { doctor?: Doctor }) {
  return (
    <article className="doctor-card">
      <div className="doctor-portrait">
        {doctor?.portrait ? (
          <img src={doctor.portrait} alt="" loading="lazy" width={480} height={320} />
        ) : (
          <span className="icon-circle">
            <Icon name="consultation" />
          </span>
        )}
      </div>
      <div className="doctor-card-body">
        <span className="fund-eyebrow">{doctor?.specialty ?? 'Sample profile'}</span>
        <h3>{doctor?.name ?? 'Doctor name'}</h3>
        <strong>{doctor?.qualifications ?? 'Specialty and qualifications'}</strong>
        <p>{doctor?.bio ?? 'A short introduction to the doctor and their areas of practice.'}</p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <>
      <PageStructuredData path="/team" />
      <SplitHero
        title={
          <>
            Our campus <em>doctors.</em>
          </>
        }
        description="The clinical team at Antharagange Rural Hospital in Kolar."
        image="24-clinical-partnership-team"
      >
        <Button href={enquiryUrl('Doctor availability', 'hospital')}>
          Ask about doctor availability
        </Button>
        <Button href="/hospital#people" tone="text">
          Our people
        </Button>
      </SplitHero>
      <section className="container section-pad">
        <SectionTitle
          description={
            doctors.length
              ? 'Meet the doctors at our Kolar campus.'
              : 'Doctor profiles are coming soon. Contact the hospital for current availability.'
          }
        >
          Doctor directory
        </SectionTitle>
        <div className="doctor-directory">
          {doctors.length ? (
            doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          ) : (
            <DoctorCard />
          )}
        </div>
      </section>
    </>
  );
}
