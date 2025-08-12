import React, { useState, useEffect } from 'react';
import '../assets/scss/waitlist3.scss';

const experienceOptions = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional / Prop Trader',
];

const countryOptions = [
  'Malaysia',
  'United States',
  'United Kingdom',
  'Singapore',
  'Australia',
  'Other',
];

const initialCountdown = 5325120000; // 61d 15h 12m in ms

function pad(n) {
  return String(n).padStart(2, '0');
}

const Home3 = () => {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    phone: '',
    experience: '',
    country: '',
  });
  const [toast, setToast] = useState('');
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    mins: '--',
    relative: '61d 15h 12m',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const end = Date.now() + initialCountdown;
    function updateCountdown() {
      const now = Date.now();
      let diff = end - now;
      if (diff <= 0) {
        setCountdown({
          days: '00',
          hours: '00',
          mins: '00',
          relative: 'Offer ended',
        });
        return;
      }
      const sec = Math.floor(diff / 1000);
      const days = Math.floor(sec / 86400);
      const hours = Math.floor((sec % 86400) / 3600);
      const mins = Math.floor((sec % 3600) / 60);
      setCountdown({
        days: pad(days),
        hours: pad(hours),
        mins: pad(mins),
        relative: `${days} Days ${hours} Hours ${mins} Minutes`,
      });
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.experience || !form.country) {
      setToast('Please complete required fields.');
      return;
    }
    setSuccess(true);
    setToast("Thanks! You're on the waitlist — check your email for confirmation.");
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className='main-section'>
    <div className="container" role="main">
      <section className="hero" aria-label="ARC Funding hero">
        <div className="hero-left">
          <span className="kicker" aria-hidden="true">Early Access • Waitlist</span>
          <h1>
            Claim Your <span className="gradient-text">20% Early Access Discount</span>
            <br />
            <small className="subtitle">Limited to Waitlist Traders Only!</small>
          </h1>
          <p className="lead">
            Be among the first to access ARC Funding accounts when we launch. Get funded instantly, scale fast, and keep up to <strong>90% of your profits</strong>.
          </p>
          <div className="features" aria-hidden="false">
            <div className="feature">
              <h4>Instant Funding Options</h4>
              <p>No long evaluation phases — start trading and earning immediately.</p>
            </div>
            <div className="feature">
              <h4>High Payouts</h4>
              <p>Keep up to 90% of your profits — trade your style, keep your edge.</p>
            </div>
            <div className="feature">
              <h4>Scale Up to $300K</h4>
              <p>Seamless capital scaling for top-performing traders.</p>
            </div>
            <div className="feature">
              <h4>Trader-Friendly Rules</h4>
              <p>Transparent, minimal restrictions designed for real traders.</p>
            </div>
          </div>
          <div className="fomo" style={{ marginTop: 16 }}>
            <div>
              <div style={{ fontWeight: 700 }}>Spots Are Limited</div>
              <small>Our early access waitlist is capped. Once it’s full, the 20% discount is gone forever.</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="countdown" aria-live="polite" aria-atomic="true">
                <div className="unit">{countdown.days}<div className="unit-label">Days</div></div>
                <div className="unit">{countdown.hours}<div className="unit-label">Hours</div></div>
                <div className="unit">{countdown.mins}<div className="unit-label">Minutes</div></div>
              </div>
              <small style={{ marginTop: 6, color: 'var(--muted)' }}>Offer Ends in <strong>{countdown.relative}</strong></small>
            </div>
          </div>
        </div>
        <aside className="waitlist-card" aria-label="Join waitlist">
          <h3 style={{ margin: '0 0 8px 0' }}>Join the Waitlist & Claim 20% Off</h3>
          <p className="small-muted" style={{ margin: '0 0 12px 0' }}>
            Be first in line — instant funding options and priority account selection for waitlist members.
          </p>
          <form className="row" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" placeholder="Your first name" required value={form.firstName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="you@domain.com" required value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone">Phone number <small className="muted">(optional)</small></label>
              <input id="phone" name="phone" type="tel" placeholder="+60 12 345 6789" value={form.phone} onChange={handleChange} />
            </div>
            <div className="grid-2">
              <div>
                <label htmlFor="experience">Trading Experience</label>
                <select id="experience" name="experience" required value={form.experience} onChange={handleChange}>
                  <option value="">Select experience</option>
                  {experienceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <select id="country" name="country" required value={form.country} onChange={handleChange}>
                  <option value="">Select your country</option>
                  {countryOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
              <button className="btn" type="submit" disabled={success}>
                {success ? 'Added — Check email' : 'Join the Waitlist & Claim My 20% Off'}
              </button>
              <button type="button" className="btn secondary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                Learn More
              </button>
            </div>
            <div className="muted-note">💰 Instant Funding Available | 📈 Up to $300K Accounts | 🏆 Top Trader Support</div>
            <div className="small-muted" style={{ marginTop: 8 }}>
              By joining you agree to receive email updates. We never share your data. — <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy</a>
            </div>
          </form>
        </aside>
      </section>
      <section className="how" aria-label="How ARC Funding works">
        <div className="how-steps" aria-hidden="false">
          <h3 style={{ marginTop: 0 ,fontSize:'20px'}}>How It Works</h3>
          <ol>
            <li><strong>Join the Waitlist Today</strong> — It's free and takes ~10 seconds.</li>
            <li><strong>Receive Exclusive Updates</strong> — Priority access, launch offers, account selection.</li>
            <li><strong>Get Your Account at 20% Off</strong> — Trade instantly when we go live and keep up to 90% of profits.</li>
          </ol>
        </div>
        <div className="final-cta" aria-hidden="false">
          <div className="card">
            <h4 style={{ margin: '0 0 8px 0' }}>Don't Miss Out on Your Advantage</h4>
            <p className="small-muted" style={{ margin: '0 0 12px 0' }}>
              When ARC Funding launches, waitlist traders will get first choice of accounts, instant funding, and the only 20% discount we’ll ever offer.
            </p>
            <button className="btn" type="button" onClick={() => document.getElementById('firstName').focus()}>
              Yes, I Want Early Access
            </button>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            <strong>Top features:</strong>
            <ul style={{ margin: '8px 0 0 18px', padding: 0, color: 'var(--muted)' }}>
              <li>Fast account activation</li>
              <li>Competitive scaling rules</li>
              <li>Dedicated trader support</li>
            </ul>
          </div>
        </div>
      </section>
      <footer>
        ©️ {new Date().getFullYear()} ARC Funding. All rights reserved. | <span className="small-muted">Offer limited to waitlist traders only. Terms apply.</span>
      </footer>
      {toast && (
        <div className="toast" role="status" aria-live="polite" style={{ display: 'block' }}>{toast}</div>
      )}
    </div>
    </div>
  );
};

export default Home3;