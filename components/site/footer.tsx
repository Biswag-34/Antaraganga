import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Antharagange Rural Hospital home">
            <img
              className="footer-logo"
              src="/media/support/brand/wordmark-concept.svg"
              width="285"
              height="53"
              alt="Antharagange Rural Hospital & Research Institute"
            />
            <img
              className="footer-logo-on-navy"
              src="/media/support/brand/wordmark-concept-on-navy.svg"
              width="285"
              height="53"
              alt=""
              aria-hidden="true"
            />
          </Link>
          <p>A charitable hospital for rural communities.</p>
        </div>
        <div>
          <Link href="/hospital">Our Hospital</Link>
          <Link href="/hospital#purpose">About us</Link>
        </div>
        <div>
          <Link href="/care">Care & Services</Link>
          <Link href="/care">Care overview</Link>
          <Link href="/health-card">Health card</Link>
        </div>
        <div>
          <Link href="/work">Our Work</Link>
          <Link href="/work">Community programmes</Link>
          <Link href="/contact?type=outreach&interest=Research%2C%20training%20and%20community%20initiatives">
            Research & Training
          </Link>
        </div>
        <div>
          <Link href="/network">Locations</Link>
          <Link href="/network#campus">Kolar, Karnataka</Link>
        </div>
        <p className="footer-motto">
          <span>
            Better health.
            <br />
            Stronger communities.
            <br />A more inclusive Kolar.
          </span>
        </p>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <small>
            © 2026 Antharagange Rural Hospital & Research Institute. All rights reserved.
          </small>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
