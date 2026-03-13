"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

const schema = z.object({
  prefix: z.enum(['Mr.', 'Miss', 'Mrs.']),
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company/Hospital name is required'),
  designation: z.string().min(1, 'Designation is required'),
  email: z.string().email('Invalid email').refine(
    (email) => !email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@hotmail.com'),
    'Please use a company email address'
  ),
  countryCode: z.string().min(1, 'Country code is required'),
  mobile: z.string().min(1, 'Mobile number is required'),
  location: z.string().min(1, 'Location is required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RequestDemoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const ref = useReveal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (!executeRecaptcha) {
        setSubmitMessage('reCAPTCHA is not loaded. Please refresh the page and try again.');
        return;
      }

      const recaptchaToken = await executeRecaptcha('submit');
      if (!recaptchaToken) {
        setSubmitMessage('reCAPTCHA verification failed. Please try again.');
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your request! We will get back to you soon.');
        reset();
      } else {
        const errData = await response.json().catch(() => ({}));
        setSubmitMessage(errData.error || 'Failed to send request. Please try again.');
      }
    } catch (error) {
      setSubmitMessage(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div ref={ref} className="min-h-screen pt-20" style={{ background: 'var(--bg-page)' }}>
        <div className="max-w-4xl mx-auto px-[5%] py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-6">Request Demo</div>
            <h1
              className="font-extrabold leading-tight tracking-tight mb-4 reveal"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontFamily: "var(--font-syne)", color: "var(--tx-head)" }}
            >
              Get Your <em className="not-italic gradient-text-blue">Personalized Demo</em>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "var(--tx-body)" }}>
              Experience how our AI-powered Smart Hospital Platform can transform your healthcare operations.
              Fill out the form below and our team will contact you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl p-6 md:p-10 reveal"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bd-soft)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)"
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Prefix and Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <label htmlFor="prefix" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Prefix
                  </label>
                  <select
                    {...register('prefix')}
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                  {errors.prefix && <p className="mt-1 text-sm text-red-500">{errors.prefix.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
              </div>

              {/* Company and Designation Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Company / Hospital Name
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    placeholder="Enter company or hospital name"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>}
                </div>

                <div>
                  <label htmlFor="designation" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Designation
                  </label>
                  <input
                    {...register('designation')}
                    type="text"
                    placeholder="Your role/position"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  />
                  {errors.designation && <p className="mt-1 text-sm text-red-500">{errors.designation.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                  Work Email <span className="text-sm font-normal" style={{ color: 'var(--tx-muted)' }}>(Company Email Only)</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your.name@company.com"
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    background: 'var(--bg-page)',
                    color: 'var(--tx-body)',
                    border: '1px solid var(--bd-soft)',
                    fontFamily: 'var(--font-dm)'
                  }}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Mobile Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <label htmlFor="countryCode" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Country Code
                  </label>
                  <select
                    {...register('countryCode')}
                    defaultValue="+91"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  >
                    <option value="+91">🇮🇳 India (+91)</option>
                    <option value="+1">🇺🇸 USA (+1)</option>
                    <option value="+44">🇬🇧 UK (+44)</option>
                    <option value="+61">🇦🇺 Australia (+61)</option>
                    <option value="+81">🇯🇵 Japan (+81)</option>
                    <option value="+86">🇨🇳 China (+86)</option>
                    <option value="+49">🇩🇪 Germany (+49)</option>
                    <option value="+33">🇫🇷 France (+33)</option>
                    <option value="+39">🇮🇹 Italy (+39)</option>
                    <option value="+7">🇷🇺 Russia (+7)</option>
                    <option value="+55">🇧🇷 Brazil (+55)</option>
                    <option value="+27">🇿🇦 South Africa (+27)</option>
                    <option value="+82">🇰🇷 South Korea (+82)</option>
                    <option value="+65">🇸🇬 Singapore (+65)</option>
                    <option value="+60">🇲🇾 Malaysia (+60)</option>
                    <option value="+63">🇵🇭 Philippines (+63)</option>
                    <option value="+66">🇹🇭 Thailand (+66)</option>
                    <option value="+84">🇻🇳 Vietnam (+84)</option>
                    <option value="+62">🇮🇩 Indonesia (+62)</option>
                    <option value="+20">🇪🇬 Egypt (+20)</option>
                    <option value="+971">🇦🇪 UAE (+971)</option>
                    <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                  </select>
                  {errors.countryCode && <p className="mt-1 text-sm text-red-500">{errors.countryCode.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="mobile" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                    Mobile Number
                  </label>
                  <input
                    {...register('mobile')}
                    type="tel"
                    placeholder="12345 67890"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      background: 'var(--bg-page)',
                      color: 'var(--tx-body)',
                      border: '1px solid var(--bd-soft)',
                      fontFamily: 'var(--font-dm)'
                    }}
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                  Location
                </label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="City, Country"
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    background: 'var(--bg-page)',
                    color: 'var(--tx-body)',
                    border: '1px solid var(--bd-soft)',
                    fontFamily: 'var(--font-dm)'
                  }}
                />
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--tx-head)' }}>
                  Message <span className="text-sm font-normal" style={{ color: 'var(--tx-muted)' }}>(Optional)</span>
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your specific needs or questions..."
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  style={{
                    background: 'var(--bg-page)',
                    color: 'var(--tx-body)',
                    border: '1px solid var(--bd-soft)',
                    fontFamily: 'var(--font-dm)'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 text-lg font-bold tracking-wide rounded-xl border-none cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isSubmitting
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:-translate-y-1 hover:shadow-2xl active:translate-y-0'
                  }`}
                  style={{
                    background: isSubmitting
                      ? 'linear-gradient(135deg, #64748b, #94a3b8)'
                      : 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 50%, #FF6B35 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-syne)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.025em',
                    boxShadow: isSubmitting
                      ? '0 4px 15px rgba(100, 116, 139, 0.3)'
                      : '0 8px 30px rgba(255, 107, 53, 0.4), 0 0 0 1px rgba(255, 107, 53, 0.1)',
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {/* Animated background gradient */}
                  {!isSubmitting && (
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #FF8C5A 0%, #FF6B35 50%, #FF8C5A 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    />
                  )}

                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                          style={{ animation: 'spin 1s linear infinite' }}
                        />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        <span>Request Demo</span>
                        <span>→</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`mt-6 p-4 rounded-lg text-center ${
                  submitMessage.includes('Thank you')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <p className="font-medium">{submitMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              style={{ color: 'var(--tx-muted)' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}