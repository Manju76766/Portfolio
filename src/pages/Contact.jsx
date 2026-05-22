import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const contactRollCSS = `
  .contact-roll:hover .contact-roll-inner {
    transform: translateY(-20px) !important;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const Contact = () => {
  useEffect(() => {
    if (!document.getElementById('contact-roll-styles')) {
      const s = document.createElement('style');
      s.id = 'contact-roll-styles';
      s.textContent = contactRollCSS;
      document.head.appendChild(s);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _subject: "New Portfolio Message",
    };

    fetch('https://formsubmit.co/ajax/naikmanju716@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          return response.json().then(json => { throw new Error(json.message) });
        }
      })
      .catch((err) => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    /*
      FIX SUMMARY:
      1. Desktop scroll removed   → md:h-screen md:overflow-hidden locks the page to viewport height
      2. Mobile horizontal scroll → overflow-x-hidden on root + w-full max-w-full on all children
      3. Mobile bottom whitespace → removed min-h on mobile entirely; no forced height on mobile so
                                    the page shrinks to fit its content with no leftover gap
    */
    <div
      className="bg-[#FFFFFF] text-[#111111] font-sora flex flex-col
                 w-full max-w-[100vw] overflow-hidden
                 h-[calc(100vh-68px)]"
    >

      <main className="max-w-6xl w-full mx-auto
        px-[24px] md:px-6
        pt-[40px] pb-[32px] md:py-12
        grid grid-cols-1 lg:grid-cols-2
        gap-6 md:gap-16 lg:gap-24
        h-full overflow-y-auto overflow-x-hidden md:content-center no-scrollbar"
      >

        {/* LEFT COLUMN — Info */}
        <div className="flex flex-col min-w-0">

          <motion.p
            className="hidden md:block text-[#9CA3AF] font-bold text-sm tracking-wide mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            // Get In Touch
          </motion.p>

          <motion.h1
            className="text-3xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-2 md:mb-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            LET'S <AnimatedTextCycle
              words={["BUILD", "CREATE", "DESIGN", "INNOVATE"]}
              interval={3000}
              className="text-[#C4F038]"
            /> &<br className="hidden md:inline" />
            <div className="h-2 md:hidden" />
            COLLABORATE
          </motion.h1>

          <motion.p
            className="text-gray-500 text-[14px] md:text-[17px] max-w-md leading-relaxed mb-[20px] md:mb-12"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Have a project in mind? Let's make it happen! Drop us a message, and
            we'll connect with you soon.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] md:text-[15px] font-bold mt-[16px] mb-[20px] md:mt-0 md:mb-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {[
              { name: 'GITHUB', href: 'https://github.com/Manju76766' },
              { name: 'TWITTER "X"', href: 'https://x.com/manju_naik46' },
              { name: 'LINKEDIN', href: 'https://www.linkedin.com/in/manju-naik-b4a1333b1/' },
              { name: 'INSTAGRAM', href: 'https://www.instagram.com/_mr_bloody_sweet_/' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1.5 items-center"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-[#9CA3AF]">/</span>
                <span className="contact-roll" style={{ overflow: 'hidden', display: 'block', height: 20 }}>
                  <span className="contact-roll-inner" style={{
                    display: 'flex', flexDirection: 'column',
                    transform: 'translateY(0)', transition: 'transform 0.35s cubic-bezier(0.25,1,0.5,1)',
                    willChange: 'transform', backfaceVisibility: 'hidden',
                  }}>
                    <span style={{ display: 'block', height: 20, lineHeight: '20px', whiteSpace: 'nowrap', color: '#111' }}>{link.name}</span>
                    <span style={{ display: 'block', height: 20, lineHeight: '20px', whiteSpace: 'nowrap', color: '#9CA3AF' }}>{link.name}</span>
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          {/* Quick Contact Icons */}
          <motion.div
            className="flex flex-col gap-2 md:gap-5 mb-[32px] md:mb-0 pb-0 md:pb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <div className="flex items-center gap-3 md:gap-4 group cursor-pointer hover:text-[#9CA3AF] transition-colors">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-current" />
              <span className="font-bold text-[14px] md:text-[15px]">Book a Meeting</span>
            </div>
            <a
              href="mailto:naikmanju716@gmail.com"
              className="flex items-center gap-3 md:gap-4 group hover:text-[#9CA3AF] transition-colors"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-current" />
              <span className="font-bold text-[14px] md:text-[15px]">naikmanju716@gmail.com</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Form */}
        <motion.div
          className="flex flex-col lg:pl-10 min-w-0"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] md:gap-10">

            <motion.div className="flex flex-col gap-1.5 md:gap-3" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <label className="text-[13px] md:text-[15px] font-bold">
                Name<span className="text-[#9CA3AF]">*</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="bg-transparent border border-gray-200 rounded-md px-3 py-2 md:px-5 md:py-4 focus:border-[#9CA3AF] outline-none transition-colors placeholder:text-gray-400 text-[13px] md:text-[15px] w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </motion.div>

            <motion.div className="flex flex-col gap-1.5 md:gap-3" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <label className="text-[13px] md:text-[15px] font-bold">
                Email<span className="text-[#9CA3AF]">*</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border border-gray-200 rounded-md px-3 py-2 md:px-5 md:py-4 focus:border-[#9CA3AF] outline-none transition-colors placeholder:text-gray-400 text-[13px] md:text-[15px] w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div className="flex flex-col gap-1.5 md:gap-3" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <label className="text-[13px] md:text-[15px] font-bold">
                Project Description<span className="text-[#9CA3AF]">*</span>
              </label>
              <textarea
                rows="3"
                placeholder="Write your project details"
                className="bg-transparent border border-gray-200 rounded-md px-3 py-2 md:px-5 md:py-4 focus:border-[#9CA3AF] outline-none transition-colors resize-none placeholder:text-gray-400 text-[13px] md:text-[15px] w-full"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </motion.div>

            <motion.div
              className="mt-[24px] md:mt-2 pb-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              {/* Mobile: stacked full-width buttons. Desktop: side by side. */}
              <div className="flex flex-col md:flex-row gap-[12px] md:gap-3 items-stretch md:items-center">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full md:w-auto text-[13px] md:text-[15px] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-md transition-all whitespace-nowrap
                    ${status === 'sending'
                      ? 'bg-[#9CA3AF] opacity-70 cursor-not-allowed text-white'
                      : 'bg-[#111111] text-white hover:bg-[#C4F038] hover:text-black active:bg-[#C4F038] active:text-black active:scale-95'
                    }`}
                  whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Your Message →'}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full md:w-auto bg-transparent border border-gray-300 text-[#111111] text-[13px] md:text-[15px] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full
                    hover:border-[#111] hover:bg-gray-50
                    active:bg-gray-100 active:scale-95
                    transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ← Back
                </motion.button>
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 md:mt-5 inline-flex items-center self-start gap-2 bg-[#C4F038] text-[#111111] font-bold text-[13px] md:text-[14px] px-4 py-2 rounded-full shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Message sent successfully!
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 md:mt-5 inline-flex items-center self-start gap-2 bg-[#ffdddd] text-[#cc0000] font-bold text-[13px] md:text-[14px] px-4 py-2 rounded-full shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                  Failed to send. Please try again.
                </motion.div>
              )}
            </motion.div>

          </form>
        </motion.div>
      </main>

    </div>
  );
};

export default Contact;