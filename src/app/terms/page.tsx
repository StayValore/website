import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Valore',
  description: 'Valore terms of service. Read the terms and conditions for using the Valore app and website.',
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: February 19, 2026</p>

        <div className="legal-content">
          <p>
            Welcome to Valore. These Terms of Service (&quot;Terms&quot;) govern
            your access to and use of the Valore mobile application and website
            (collectively, the &quot;Service&quot;) operated by Valore
            (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these
            Terms. If you do not agree to these Terms, do not use the Service.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 13 years old to use the Service. By using the
            Service, you represent and warrant that you meet this age
            requirement. If you are under 18, you must have the consent of a
            parent or legal guardian.
          </p>

          <h2>2. Account Registration</h2>
          <p>
            To access certain features of the Service, you must create an
            account. When creating an account, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information.</li>
            <li>Maintain the security of your password and account.</li>
            <li>Promptly update your information if it changes.</li>
            <li>
              Accept responsibility for all activities that occur under your
              account.
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms or are inactive for an extended period.
          </p>

          <h2>3. User Content</h2>
          <p>
            The Service allows you to post reviews, ratings, photos, comments,
            and other content (&quot;User Content&quot;). You retain ownership of
            your User Content, but by posting it, you grant us a non-exclusive,
            worldwide, royalty-free license to use, display, reproduce, and
            distribute your User Content in connection with operating and
            improving the Service.
          </p>
          <p>You agree that your User Content will not:</p>
          <ul>
            <li>Violate any applicable law or regulation.</li>
            <li>Infringe on the intellectual property rights of others.</li>
            <li>Contain false, misleading, or fraudulent information.</li>
            <li>Include hateful, harassing, defamatory, or threatening material.</li>
            <li>Contain spam, advertising, or unauthorized promotional content.</li>
            <li>Include malicious code, viruses, or harmful data.</li>
          </ul>
          <p>
            We reserve the right to remove any User Content that violates these
            Terms at our sole discretion.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>When using the Service, you agree not to:</p>
          <ul>
            <li>Use the Service for any illegal or unauthorized purpose.</li>
            <li>Impersonate any person or entity.</li>
            <li>Interfere with or disrupt the Service or its servers.</li>
            <li>Attempt to gain unauthorized access to any part of the Service.</li>
            <li>Scrape, crawl, or use automated means to access the Service without permission.</li>
            <li>Harass, bully, or intimidate other users.</li>
            <li>Create multiple accounts for deceptive purposes.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding User Content),
            features, and functionality are owned by Valore and are protected by
            copyright, trademark, and other intellectual property laws. Our
            trademarks, logos, and service marks may not be used without our
            prior written consent.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            The Service may contain links to or integrations with third-party
            websites and services. We are not responsible for the content,
            privacy policies, or practices of any third-party services. Your use
            of third-party services is at your own risk and subject to their
            respective terms.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free,
            or secure. Hotel reviews and ratings reflect the opinions of
            individual users and do not constitute our endorsement or guarantee
            of any hotel or service.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Valore shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of profits, data,
            or goodwill, arising out of or related to your use of the Service.
          </p>
          <p>
            Our total liability for any claim arising out of or relating to these
            Terms or the Service shall not exceed the amount you paid us, if any,
            in the twelve (12) months prior to the claim.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Valore and its
            officers, directors, employees, and agents from and against any
            claims, liabilities, damages, losses, and expenses arising out of or
            related to your use of the Service or violation of these Terms.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service at any time,
            with or without cause, with or without notice. Upon termination, your
            right to use the Service will immediately cease. You may also delete
            your account at any time by contacting us.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify you of material changes by posting the updated Terms on this
            page and updating the &quot;Last updated&quot; date. Your continued
            use of the Service after changes are posted constitutes your
            acceptance of the revised Terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the United States, without regard to conflict of law
            principles.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:madison@stayvalore.com">madison@stayvalore.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

