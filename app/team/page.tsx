import { BoardProfiles } from '@/components/board-profiles';
import styles from '@/components/board-profiles.module.css';
import { Button, Icon } from '@/components/primitives';
import { PageStructuredData } from '@/components/seo';
import { doctors, type Doctor } from '@/content/doctors';
import { enquiryUrl } from '@/content/programmes';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/team');

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="doctor-card">
      <div className="doctor-portrait">
        {doctor.portrait ? (
          <img src={doctor.portrait} alt="" loading="lazy" width={480} height={320} />
        ) : (
          <span className="icon-circle">
            <Icon name="consultation" />
          </span>
        )}
      </div>
      <div className="doctor-card-body">
        <span className="fund-eyebrow">{doctor.specialty}</span>
        <h3>{doctor.name}</h3>
        <strong>{doctor.qualifications}</strong>
        <p>{doctor.bio}</p>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <>
      <PageStructuredData path="/team" />
      <BoardProfiles standalone />
      <section
        className="container section-pad"
        id="doctor-directory"
        aria-labelledby="doctor-directory-title"
      >
        <div className={styles.doctorIntro}>
          <div>
            <h2 id="doctor-directory-title">Doctor directory</h2>
            <p>
              {doctors.length
                ? 'Meet the doctors at our Kolar campus.'
                : 'Doctor profiles are coming soon. Contact the hospital for current availability.'}
            </p>
          </div>
          <Button href={enquiryUrl('Doctor availability', 'hospital')}>
            Ask about doctor availability
          </Button>
        </div>
        {doctors.length > 0 && (
          <div className="doctor-directory">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
