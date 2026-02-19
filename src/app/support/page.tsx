import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Valore',
  description: 'Get help with Valore. Contact our team for support, questions, or feedback.',
};

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className="container">
        <h1>Support</h1>
        <p>
          Have a question, found a bug, or just want to share feedback? We&apos;d
          love to hear from you.
        </p>

        <div className="support-grid">
          <div className="support-card">
            <h3>General Inquiries</h3>
            <p>
              Questions about Valore, your account, or how the app works? Reach
              out and we&apos;ll get back to you as soon as possible.
            </p>
            <a href="mailto:madison@stayvalore.com">
              madison@stayvalore.com
            </a>
          </div>

          <div className="support-card">
            <h3>Bug Reports</h3>
            <p>
              Found something that isn&apos;t working right? Let us know the
              details and we&apos;ll investigate and fix it.
            </p>
            <a href="mailto:madison@stayvalore.com?subject=Bug%20Report">
              Report a Bug
            </a>
          </div>

          <div className="support-card">
            <h3>Account & Privacy</h3>
            <p>
              Need to update your account, request your data, or delete your
              account? We&apos;re here to help.
            </p>
            <a href="mailto:madison@stayvalore.com?subject=Account%20Request">
              Contact Us
            </a>
          </div>

          <div className="support-card">
            <h3>Feedback & Ideas</h3>
            <p>
              Have a feature request or idea to make Valore better? We love
              hearing from our community.
            </p>
            <a href="mailto:madison@stayvalore.com?subject=Feedback">
              Share Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

