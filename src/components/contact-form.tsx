'use client';

import { useState, type FormEvent } from 'react';

const FORM_ENDPOINT = 'https://formsubmit.co/contact@stayvalore.com';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
        event.currentTarget.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="contact-form-wrapper">
        <div className="form-success">
          <h3>Message Sent</h3>
          <p>Thanks for reaching out. We&apos;ll get back to you soon.</p>
          <button
            className="btn-secondary"
            onClick={() => setFormStatus('idle')}
            type="button"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      <h2>Send Us a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
          />
        </div>

        {formStatus === 'error' && (
          <p className="form-error">
            Something went wrong. Please try again or email us directly at{' '}
            <a href="mailto:contact@stayvalore.com">contact@stayvalore.com</a>.
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={formStatus === 'submitting'}
        >
          {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
