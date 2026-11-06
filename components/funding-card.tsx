import { money, type Programme } from '@/content/programmes';
import { DonateButton } from './donate-button';
import { Button, Icon, Media } from './primitives';

export function UrgentFundingBadge() {
  return (
    <span className="urgent-funding-badge">
      <span aria-hidden="true" />
      Urgent funding priority
    </span>
  );
}

export function FundingCard({
  programme,
  showDownload = false,
}: {
  programme: Programme;
  showDownload?: boolean;
}) {
  return (
    <article className={`fund-card${programme.urgent ? ' fund-card--urgent' : ''}`}>
      <div className="fund-card-image">
        <Media id={programme.asset} />
        {programme.urgent && <UrgentFundingBadge />}
      </div>
      <div className="fund-card-body">
        <span className="fund-eyebrow">{programme.category}</span>
        <h3>{programme.title}</h3>
        <p>{programme.need}</p>
        <div className="fund-card-budget">
          <Icon name="layers" />
          <div>
            <span>Estimated funding goal</span>
            <strong>
              {programme.budget === null ? 'To be confirmed' : money(programme.budget)}
            </strong>
          </div>
        </div>
        <div className="fund-card-actions">
          <DonateButton id={programme.id} title={programme.title} />
          <Button href={`/funding/${programme.id}`} tone="text">
            Know more <span className="visually-hidden">about {programme.title}</span>
          </Button>
        </div>
        {showDownload && (
          <a
            className="fund-card-download"
            href={`/media/support/${programme.source_document}`}
            download
          >
            <Icon name="download" />
            Download proposal <span className="visually-hidden">for {programme.title}</span> (DOCX)
          </a>
        )}
      </div>
    </article>
  );
}
