import React from 'react';
import { motion } from 'framer-motion';
import { FlowButton } from "@/components/ui/FlowButton";
import { Phone, Mail } from 'lucide-react';
import OrbitingSkills from './ui/OrbitingSkills';

const AnimatedAboutCard = ({ title, description, icon, topColor }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:-rotate-1 h-full">
      <div className="bg-white rounded-[16px] px-8 pb-8 pt-6 border border-gray-100 shadow-[0_4px_24px_rgb(0,0,0,0.04)] relative overflow-hidden h-full flex flex-col hover:border-gray-200 w-full transition-colors duration-300">
        
        {/* Background Animation Elements (Light Theme) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/50 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-gray-200/40 to-transparent blur-3xl opacity-0 group-hover:opacity-60 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-gray-100/60 blur-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-gray-100/60 blur-lg animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/40 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: topColor }} />
        
        <div className="relative z-10 flex flex-col flex-1">
          <div className="relative mb-6 mt-2 w-[44px] h-[44px] self-start">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200/50 animate-ping opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-0 rounded-full border border-gray-100 animate-pulse opacity-0 group-hover:opacity-100"></div>

            <div className="w-full h-full bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-700 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 group-hover:shadow-md relative bg-white z-10">
              <div className="transform group-hover:rotate-180 transition-transform duration-700 w-full h-full flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>
          
          <h3 
            className="text-[18px] font-[700] mb-3 transform group-hover:scale-105 origin-left transition-transform duration-300"
            style={{ fontFamily: '"Lora", serif', color: '#2d2d2d' }}
          >
            {title}
          </h3>
          
          <p className="text-[14px] text-gray-600 leading-[1.6] transform transition-colors duration-300 group-hover:text-gray-900">
            {description}
          </p>
          
          <div className="mt-auto pt-6 flex flex-col items-start w-full">
            <div className="w-1/3 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500"></div>

            <div className="flex space-x-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gray-100/40 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-gray-100/40 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

const items = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc: "https://i.pinimg.com/736x/e7/cf/cb/e7cfcbd7a8af10b8839c8d9a3d8eb4ce.jpg",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc: "https://i.pinimg.com/736x/f4/b0/00/f4b000a6880f7e8d0c677812d789e001.jpg",
  },
  {
    id: 3,
    title: "Power & Speed",
    description: "Unleash the true potential of the road",
    imageSrc: "https://i.pinimg.com/1200x/ae/cf/d7/aecfd72b2439914647ec06d19cb182b5.jpg",
  },
  {
    id: 4,
    title: "Timeless Craftsmanship",
    description: "Built with passion, driven by excellence",
    imageSrc: "https://i.pinimg.com/736x/5d/f7/69/5df7696c4f24b7961c8c72748a355ff8.jpg",
  },
];

export default function About() {
  return (
    <section id="about" className="pt-0 pb-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[60px] items-center">

        {/* Left Column - Text */}
        <motion.div
          className="pr-4 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
           <h2 
            className="text-[24px] md:text-[32px] font-medium md:font-bold leading-[1.3] md:leading-[1.15] mb-[24px] md:mb-[32px] max-w-[520px] text-left bg-[#ffffff] p-0"
            style={{ fontFamily: '"Lora", serif', color: '#2d2d2d' }}
           >
            I'm Manjunatha S, a full stack developer with a passion for turning logic into scalable, user-first applications.
           </h2>

          {/* Contact Info */}
          <div className="about-contact-info flex gap-10 mb-10">
            <div className="group flex items-center gap-4 cursor-pointer transition-all duration-300">
              <div className="relative flex items-center justify-center w-[44px] md:w-[48px] h-[44px] md:h-[48px] rounded-full border-[1px] md:border-[1.5px] border-[#E5E5E5] bg-white flex-shrink-0 transition-colors duration-300 overflow-hidden group-hover:border-[#C4F038]">
                {/* Green background on hover */}
                <div className="absolute inset-0 rounded-full bg-[#C4F038] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Phone size={18} className="text-[#111] md:w-[20px] md:h-[20px] relative z-10 transition-colors duration-300" />
              </div>
              <div>
                <label className="text-[15px] md:text-[13px] text-[#111] md:text-[#999] block font-medium md:font-semibold mb-[2px] normal-case md:uppercase cursor-pointer group-hover:text-[#666] transition-colors duration-300 tracking-normal md:tracking-[0.05em]">Call Today</label>
                <span className="text-[14px] md:text-[15px] font-normal md:font-semibold text-[#666] md:text-[#111] block group-hover:text-[#333] transition-colors duration-300">+91 767660 7330</span>
              </div>
            </div>

            <div className="group flex items-center gap-4 cursor-pointer transition-all duration-300">
              <div className="relative flex items-center justify-center w-[44px] md:w-[48px] h-[44px] md:h-[48px] rounded-full border-[1px] md:border-[1.5px] border-[#E5E5E5] bg-white flex-shrink-0 transition-colors duration-300 overflow-hidden group-hover:border-[#C4F038]">
                {/* Green background on hover */}
                <div className="absolute inset-0 rounded-full bg-[#C4F038] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Mail size={18} className="text-[#111] md:w-[20px] md:h-[20px] relative z-10 transition-colors duration-300" />
              </div>
              <div>
                <label className="text-[15px] md:text-[13px] text-[#111] md:text-[#999] block font-medium md:font-semibold mb-[2px] normal-case md:uppercase cursor-pointer group-hover:text-[#666] transition-colors duration-300 tracking-normal md:tracking-[0.05em]">Email Me</label>
                <span className="text-[14px] md:text-[15px] font-normal md:font-semibold text-[#666] md:text-[#111] block group-hover:text-[#333] transition-colors duration-300">naikmanju716@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="about-cta-container">
            {/* Desktop Button */}
            <div className="hidden md:block">
              <FlowButton
                text="Explore My Profile"
                as="a"
                href="#"
                bgColor="#C4F038"
                textColor="#111111"
                hoverColor="#111111"
                style={{ marginTop: 8 }}
              />
            </div>
            
            {/* Mobile Button - matching Img1 exactly */}
            <div className="block md:hidden">
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#2d2d2d',
                  color: '#ffffff',
                  borderRadius: '100px',
                  padding: '6px 6px 6px 20px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: '"Sora", sans-serif',
                  transition: 'transform 0.2s ease',
                }}
              >
                Explore My Profile
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    marginLeft: '12px',
                    color: '#111111',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Orbiting Skills Animation */}
        <motion.div
          className="about-orbit-container w-full flex justify-center items-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <OrbitingSkills hideText={true} />
        </motion.div>
      </div>

      {/* About Me section with description and cards */}
      <div className="max-w-[1200px] mx-auto px-6 w-full mt-0 md:mt-[100px] pt-8 md:pt-[80px] border-t border-gray-200">
        <motion.span
          className="text-[13px] font-[700] tracking-[0.1em] text-gray-500 uppercase block mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >About Me</motion.span>
        <motion.h2
          className="text-[36px] md:text-[44px] font-[700] leading-[1.15] mb-6 max-w-[700px] tracking-tight"
          style={{ fontFamily: '"Lora", serif', color: '#2d2d2d' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          Professional, modern, and focused on clean execution.
        </motion.h2>
        <motion.p
          className="text-[16px] text-gray-600 leading-[1.7] max-w-[700px] mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          I build interactive websites and scalable applications with strong frontend quality, solid backend architecture, and modern visual presentation. I enjoy creating full-stack solutions that feel premium and intuitive.
        </motion.p>

        <div className="about-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: true }}>
            <AnimatedAboutCard
              title="Who I Am"
              description="A full-stack developer who enjoys building attractive user interfaces, smooth animations, and robust backend functionality."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
              topColor="#111111"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} viewport={{ once: true }}>
            <AnimatedAboutCard
              title="What I Use"
              description="React.js, Tailwind, GSAP for the frontend. C# .NET, ASP.NET Core, and SQL Server for scalable backend architecture."
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>}
              topColor="#C4F038"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }}>
            <AnimatedAboutCard
              title="My Focus"
              description="Clean UI, responsive layouts, practical system design, and professional visual quality from end-to-end."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>}
              topColor="#111111"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
}