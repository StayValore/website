import Link from 'next/link';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Valore</h3>
            <p>
              The social hotel review platform for travelers who value authentic
              recommendations from people they trust.
            </p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <Link href="/">Home</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {CURRENT_YEAR} Valore. All rights reserved.</p>
          <p>madison@stayvalore.com</p>
        </div>
      </div>
    </footer>
  );
}
