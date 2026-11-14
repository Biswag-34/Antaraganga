import { Button, Icon } from '@/components/primitives';
import { campusRendering, hospitalProgress, type CampusPhoto } from '@/content/hospital-progress';
import styles from './hospital-pages.module.css';

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
  return (
    <section className={styles.progressPreview} aria-labelledby="hospital-progress-preview">
      <div className={'container ' + styles.previewInner}>
        <CampusImage photo={photos[0] ?? campusRendering} />
        <div className={styles.previewCopy}>
          <p className={styles.eyebrow}>Our hospital · Kolar, Karnataka</p>
          <h2 id="hospital-progress-preview">Hospital progress</h2>
          <p>
            {current?.summary ??
              'Explore the Kolar campus plans and check back for construction milestones and site photos.'}
          </p>
          <Button href="/hospital/progress">Explore hospital progress</Button>
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
