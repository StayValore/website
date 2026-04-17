import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Valoré',
  description: 'Valoré privacy policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: April 17, 2026</p>

        <div className="legal-content">
          <p>
            Valore LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you use our mobile application and website (collectively, the
            &quot;Service&quot;).
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using the
            Service, you acknowledge that you have read, understood, and agree to
            be bound by this Privacy Policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Personal information you provide</h3>
          <p>
            When you create an account, use our Service, or contact us, we may
            collect the following information:
          </p>
          <ul>
            <li>
              <strong>Account information:</strong> Email address, username,
              display name, and password.
            </li>
            <li>
              <strong>Profile information:</strong> Profile photo, bio, home
              city, and travel style preferences.
            </li>
            <li>
              <strong>User-generated content:</strong> Hotel reviews, ratings,
              photos, comments, and saved lists.
            </li>
            <li>
              <strong>Social information:</strong> Your followers, the accounts
              you follow, and interactions with other users.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you use our Service, we may automatically collect certain
            information, including:
          </p>
          <ul>
            <li>Device type, operating system, and unique device identifiers.</li>
            <li>
              Usage data such as features accessed, pages viewed, and actions
              taken within the app.
            </li>
            <li>
              Approximate location data based on your IP address or, with your
              explicit permission, precise location for map features.
            </li>
            <li>
              Log data including IP address, access times, and referring URLs.
            </li>
            <li>
              <strong>Push notification tokens:</strong> If you enable push
              notifications, we collect a device token issued by Apple to deliver
              notifications to your device. This token is used solely for sending
              notifications and is not shared with third parties for marketing
              purposes.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide, operate, and maintain the Service.</li>
            <li>To create and manage your account.</li>
            <li>To display your reviews, ratings, and profile to other users.</li>
            <li>
              To personalize your experience, including your social feed and
              hotel recommendations.
            </li>
            <li>
              To communicate with you about your account, updates, and support
              requests.
            </li>
            <li>To analyze usage patterns and improve the Service.</li>
            <li>To detect, prevent, and address technical issues or abuse.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p>
            We do not sell your personal information. We may share your
            information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Public content:</strong> Reviews, ratings, profile
              information, and other content you choose to make public are
              visible to other users of the Service.
            </li>
            <li>
              <strong>Service providers:</strong> We may share information with
              third-party service providers who assist us in operating the
              Service (such as hosting, analytics, and authentication services).
            </li>
            <li>
              <strong>Legal requirements:</strong> We may disclose your
              information if required by law or in response to a valid legal
              request.
            </li>
            <li>
              <strong>Business transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be transferred
              as part of that transaction.
            </li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            We use commercially reasonable security measures to protect your
            information. Your data is stored on secure servers provided by our
            hosting partners. While we strive to protect your personal
            information, no method of transmission over the Internet or method of
            electronic storage is 100% secure.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide the Service. If you request deletion
            of your account, we will delete or anonymize your personal
            information within 30 days, except where we are required to retain
            certain data to comply with legal obligations, resolve disputes, or
            enforce our agreements. Retained data of this kind is kept only for
            as long as necessary for those purposes and is not used for any other
            reason. Aggregated or anonymized data that cannot identify you may be
            retained indefinitely.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            Our Service integrates with or relies on the following third-party
            services:
          </p>
          <ul>
            <li>
              <strong>Supabase:</strong> For authentication, database hosting,
              and file storage.
            </li>
            <li>
              <strong>Google Places API:</strong> For hotel search and location
              data. Use of this data is subject to{' '}
              
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Apple Maps:</strong> For map display on iOS devices,
              subject to{' '}
              
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>

          <h2>7. Your Rights and Choices</h2>
          <p>You have the following rights regarding your information:</p>
          <ul>
            <li>
              <strong>Access and update:</strong> You can access and update your
              profile information through the app settings.
            </li>
            <li>
              <strong>Delete your account:</strong> You may request deletion of
              your account and associated data by contacting us at{' '}
              <a href="mailto:madison@stayvalore.com">madison@stayvalore.com</a>.
              We will respond within 30 days.
            </li>
            <li>
              <strong>Location permissions:</strong> You can enable or disable
              location services through your device settings at any time. Precise
              location data is only collected with your explicit permission.
            </li>
            <li>
              <strong>Push notifications:</strong> You can manage push
              notification preferences through your device settings at any time.
              Disabling notifications will also stop collection of your device
              token.
            </li>
          </ul>

          <h2>8. International Users and Privacy Rights</h2>
          <p>
            Valore LLC is based in the United States. If you access the Service
            from outside the United States, your information may be transferred
            to and processed in the United States, where data protection laws may
            differ from those in your country.
          </p>

          <h3>European Economic Area, United Kingdom, and Switzerland</h3>
          <p>
            If you are located in the EEA, UK, or Switzerland, the following
            additional rights apply to you under applicable data protection law
            (including the GDPR and UK GDPR):
          </p>
          <ul>
            <li>
              <strong>Legal basis for processing.</strong> We process your
              personal data on the following bases: performance of a contract (to
              provide the Service), legitimate interests (to improve the Service,
              detect abuse, and ensure security), legal obligation (to comply
              with applicable law), and consent (for location access and push
              notifications, where applicable).
            </li>
            <li>
              <strong>Right to access.</strong> You may request a copy of the
              personal data we hold about you.
            </li>
            <li>
              <strong>Right to rectification.</strong> You may request correction
              of inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to erasure.</strong> You may request deletion of your
              personal data, subject to our retention obligations described in
              Section 5.
            </li>
            <li>
              <strong>Right to data portability.</strong> You may request your
              personal data in a structured, commonly used, machine-readable
              format.
            </li>
            <li>
              <strong>Right to restrict or object to processing.</strong> You may
              request that we limit how we use your data, or object to processing
              based on legitimate interests.
            </li>
            <li>
              <strong>Right to withdraw consent.</strong> Where processing is
              based on consent, you may withdraw it at any time without affecting
              the lawfulness of prior processing.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:madison@stayvalore.com">madison@stayvalore.com</a>.
            We will respond within 30 days. If you believe your rights have not
            been respected, you have the right to lodge a complaint with your
            local data protection authority.
          </p>
          <p>
            <strong>Data transfers.</strong> By using the Service, you
            acknowledge that your data is processed in the United States. We rely
            on standard contractual clauses or other lawful transfer mechanisms
            where required by applicable law.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our Service is not directed to individuals under the age of 13. We
            do not knowingly collect personal information from children under 13.
            If we learn that we have collected personal information from a child
            under 13, we will take steps to delete that information promptly. If
            you believe a child under 13 has provided us with personal
            information, please contact us at{' '}
            <a href="mailto:madison@stayvalore.com">madison@stayvalore.com</a>.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page and
            updating the &quot;Last updated&quot; date. Your continued use of the
            Service after any changes constitutes your acceptance of the updated
            Privacy Policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
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
