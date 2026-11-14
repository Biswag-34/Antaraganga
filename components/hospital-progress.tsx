import { Button, Icon } from '@/components/primitives';
import { campusRendering, hospitalProgress, type CampusPhoto } from '@/content/hospital-progress';
import styles from './hospital-pages.module.css';
import homeStyles from './home-sections.module.css';

export function CampusImage({ photo, eager = false }: { photo: CampusPhoto; eager?: boolean }) {
  return (
    <figure className={styles.campusImage}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

export function HospitalProgressPreview() {
  const { current, photos } = hospitalProgress;
  const exteriorPhoto = photos[0] ?? campusRendering;
  const interiorPhoto = photos[2];
  return (
    <section className={homeStyles.progress} aria-labelledby="hospital-progress-preview">
      <div className={'container ' + homeStyles.progressInner}>
        <div className={homeStyles.progressPhotos}>
          <figure className={homeStyles.exterior}>
            <img
              src={exteriorPhoto.src}
              alt={exteriorPhoto.alt}
              width={exteriorPhoto.width}
              height={exteriorPhoto.height}
              loading="lazy"
            />
          </figure>
          {interiorPhoto && (
            <figure className={homeStyles.interior}>
              <img
                src={interiorPhoto.src}
                alt={interiorPhoto.alt}
                width={interiorPhoto.width}
                height={interiorPhoto.height}
                loading="lazy"
              />
            </figure>
          )}
        </div>
        <div className={homeStyles.progressCopy}>
          <p className={homeStyles.eyebrow}>The Kolar campus</p>
          <h2 id="hospital-progress-preview">Hospital progress</h2>
          <p>
            {current?.summary ??
              'Explore the Kolar campus plans and check back for construction milestones and site photos.'}
          </p>
          <div className={homeStyles.progressLinks}>
            <Button href="/hospital/progress">Explore hospital progress</Button>
            <Button href="/hospital/progress#floor-plans" tone="text">
              View floor plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AwaitingUpdate({ icon, children }: { icon: string; children: string }) {
  return (
    <div className={styles.awaitingUpdate}>
      <Icon name={icon} />
      <p>{children}</p>
    </div>
  );
}
