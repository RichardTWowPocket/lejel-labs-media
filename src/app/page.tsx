'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { submitToGoogleSheets } from '@/lib/googleSheets';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Submit to Google Sheets
    const result = await submitToGoogleSheets(formData);

    if (result.success) {
      setSubmitMessage(result.message);
      setFormData({ name: '', phone: '', email: '', company: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    } else {
      setSubmitMessage(result.message);
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0f1419]/90 backdrop-blur-md z-50 border-b border-[#FFD369]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
        <Image
          src="/lejel-labs-logo-white.png"
          alt="Lejel Labs Media"
          width={200}
          height={100}
          className="h-8 sm:h-10 md:h-12 w-auto"
          priority
        />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors">Siapa Kami</a>
              <a href="#services" className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors">Promosi Gratis</a>
              <a href="#packages" className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors">Paket</a>
              <a href="#contact" className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors">Hubungi Kami</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#FFD369]/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-[#EEEEEE]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#FFD369]/20 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#about" 
                  className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Siapa Kami
                </a>
                <a 
                  href="#services" 
                  className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Promosi Gratis
                </a>
                <a 
                  href="#packages" 
                  className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Paket
                </a>
                <a 
                  href="#contact" 
                  className="text-[#EEEEEE] hover:text-[#FFD369] transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          )} 
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2a2f3a]/50 via-[#0f1419] to-[#FFD369]/10 relative overflow-hidden overflow-x-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#FFD369"
        />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in text-center md:text-left relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#EEEEEE] leading-tight">
                Promosi Gratis untuk
                <span className="bg-gradient-to-r from-[#FFD369] to-[#FFD369]/80 bg-clip-text text-transparent"> Restoran Anda!</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#EEEEEE]/80 leading-relaxed">
                Video kuliner yang menarik, modern, dan siap viral. Gratis diedit & dipublikasikan ke seluruh channel kami!
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 justify-center md:justify-start">
                <a 
                  href="#contact" 
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-[#FFD369] text-[#0f1419] rounded-lg font-semibold hover:bg-[#FFD369]/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center text-sm sm:text-base"
                >
                  💬 Kirim Pesan Sekarang
                </a>
                <a 
                  href="#how-it-works" 
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-transparent text-[#EEEEEE] rounded-lg font-semibold border-2 border-[#FFD369] hover:bg-[#FFD369]/20 transition-all text-center text-sm sm:text-base"
                >
                  Cara Kerjanya
                </a>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0 z-10 overflow-hidden">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <Image
                  src="/lejel-labs-media-1.png"
                  alt="Lejel Labs Media Team"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD369]/20 to-transparent rounded-2xl sm:rounded-3xl"></div>
              </div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-[#FFD369]/40 rounded-full blur-xl opacity-70"></div>
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-[#FFD369]/50 rounded-full blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Siapa Kami</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto"></div>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 border border-[#FFD369]/20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <p className="text-base sm:text-lg md:text-xl text-[#EEEEEE]/90 leading-relaxed text-center">
                Kami adalah <span className="font-bold text-[#FFD369]">Lejel Labs Media</span>, tim kreatif di bawah naungan <span className="font-semibold text-[#FFD369]">Lejel Home Shopping</span> yang berfokus pada pembuatan konten video kuliner dan promosi restoran. Kami membantu brand F&B membangun awareness dan engagement melalui video yang menarik, modern, dan siap viral.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Apa yang Kami Tawarkan</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto mb-4 sm:mb-6"></div>
          </motion.div>
          
          {/* Free Promotion Card */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-[#FFD369] to-[#FFD369]/80 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border-4 border-[#FFD369]">
              <motion.div 
                className="text-center mb-6 sm:mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">💡</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#222831] mb-4">
                  Promosi Gratis untuk Restoran Anda!
                </h3>
              </motion.div>
              
              <motion.div 
                className="space-y-4 text-[#0f1419]/90 text-sm sm:text-base md:text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.p 
                  className="leading-relaxed"
                  variants={fadeInUp}
                >
                  Kami bantu buatkan video promosi untuk restoran Anda secara <span className="font-bold text-[#0f1419]">GRATIS</span>. Anda cukup kirimkan video bahan mentah (footage) sesuai panduan kami.
                </motion.p>
                
                <motion.p 
                  className="leading-relaxed font-semibold mb-4"
                  variants={fadeInUp}
                >
                  Kami yang akan mengedit dan mempublikasikan hasilnya ke:
                </motion.p>
                
                {/* Social Media Platforms */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
                  variants={staggerContainer}
                >
                  {/* Instagram */}
                  <motion.div 
                    className="bg-white/20 rounded-lg p-3 text-center"
                    variants={fadeInUp}
                  >
                    <div className="aspect-square w-full mb-2">
                      <Image
                        src="/lejel-shopping-instagram.png"
                        alt="Lejel Shopping Instagram"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#0f1419]">Instagram</p>
                    <p className="text-xs text-[#0f1419]/70">14.5K Followers</p>
                  </motion.div>
                  
                  {/* TikTok */}
                  <motion.div 
                    className="bg-white/20 rounded-lg p-3 text-center"
                    variants={fadeInUp}
                  >
                    <div className="aspect-square w-full mb-2">
                      <Image
                        src="/lejel-shopping-tiktok.png"
                        alt="Lejel Shopping TikTok"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#0f1419]">TikTok</p>
                    <p className="text-xs text-[#0f1419]/70">2.5K Followers</p>
                  </motion.div>
                  
                  {/* YouTube */}
                  <motion.div 
                    className="bg-white/20 rounded-lg p-3 text-center"
                    variants={fadeInUp}
                  >
                    <div className="aspect-square w-full mb-2">
                      <Image
                        src="/lejel-shopping-youtube.png"
                        alt="Lejel Shopping YouTube"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#0f1419]">YouTube</p>
                    <p className="text-xs text-[#0f1419]/70">13.9K Subscribers</p>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/10 rounded-lg p-4"
                  variants={fadeInUp}
                >
                  <p className="text-sm text-[#0f1419]/90 font-medium">
                    <span className="font-bold">Channel tambahan</span> yang kami kelola sendiri untuk jangkauan yang lebih luas!
                  </p>
                </motion.div>
                
                <motion.p 
                  className="leading-relaxed font-semibold"
                  variants={fadeInUp}
                >
                  Hasil akhir akan kami kirimkan kembali kepada Anda, sehingga bisa Anda gunakan juga di media sosial restoran Anda.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Bagaimana Cara Kerjanya</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Step 1 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFD369] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-[#0f1419]">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-3 sm:mb-4">Isi Formulir / Kirim Pesan WhatsApp</h3>
              <p className="text-sm sm:text-base text-[#EEEEEE]/80 leading-relaxed">
                Dapatkan panduan jenis video yang perlu dikirim
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFD369] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-[#0f1419]">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-3 sm:mb-4">Kirimkan Video Restoran Anda</h3>
              <p className="text-sm sm:text-base text-[#EEEEEE]/80 leading-relaxed">
                Kami bantu edit dengan gaya promosi profesional
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFD369] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-[#0f1419]">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-3 sm:mb-4">Dapatkan Video Final & Promosi Gratis</h3>
              <p className="text-sm sm:text-base text-[#EEEEEE]/80 leading-relaxed">
                Video akan diunggah ke seluruh jaringan channel kami
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Paid Packages Section */}
      <section id="packages" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Paket Layanan Berbayar</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-[#EEEEEE]/80 max-w-3xl mx-auto px-4">
              Setelah Anda puas dengan hasil promosi gratis, kami menyediakan opsi berbayar agar promosi restoran Anda bisa tampil lebih maksimal
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* TikTok Package */}
            <motion.div 
              className="bg-[#0a0e13] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:shadow-[#FFD369]/10 transition-all border border-[#FFD369]/10"
              variants={fadeInUp}
            >
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl mb-3">📱</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#EEEEEE] mb-2">Paket TikTok</h3>
                <div className="text-3xl sm:text-4xl font-bold text-[#FFD369] mb-2">Rp2.000.000</div>
                <p className="text-sm text-[#EEEEEE]/60">10 video / 4 minggu</p>
              </div>
            </motion.div>

            {/* Instagram Package */}
            <motion.div 
              className="bg-[#0a0e13] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:shadow-[#FFD369]/10 transition-all border border-[#FFD369]/10"
              variants={fadeInUp}
            >
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl mb-3">📸</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#EEEEEE] mb-2">Paket Instagram</h3>
                <div className="text-3xl sm:text-4xl font-bold text-[#FFD369] mb-2">Rp2.000.000</div>
                <p className="text-sm text-[#EEEEEE]/60">10 video / 4 minggu</p>
              </div>
            </motion.div>

            {/* On-Site Package */}
            <motion.div 
              className="bg-gradient-to-br from-[#FFD369]/20 to-[#0a0e13] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:shadow-[#FFD369]/20 transition-all border-2 border-[#FFD369]/50 md:col-span-2 lg:col-span-1"
              variants={fadeInUp}
            >
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl mb-3">🎥</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#EEEEEE] mb-2">Paket On-Site</h3>
                <p className="text-sm text-[#EEEEEE]/80 mb-4">Basic / Pro / Premium</p>
                <p className="text-sm text-[#EEEEEE]/70">
                  Tim kami datang langsung ke restoran Anda untuk shooting profesional di lokasi
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Important Note */}
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-[#393E46] rounded-xl p-6 sm:p-8 border-l-4 border-[#FFD369]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h4 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-3 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Catatan Penting
              </h4>
              <p className="text-sm sm:text-base text-[#EEEEEE]/80 leading-relaxed">
                Semua paket ini memiliki <span className="font-semibold text-[#FFD369]">masa kontrak minimum 3 bulan</span>, dan untuk paket shooting (Basic / Pro / Premium) akan disertai dengan <span className="font-semibold text-[#FFD369]">laporan mingguan (1x per minggu)</span> berisi progres dan hasil publikasi video.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Kenapa Pilih Lejel Labs Media</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Advantage 1 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="mb-4 sm:mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD369] mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-2 sm:mb-3">Tim Kreatif Berpengalaman</h3>
              <p className="text-xs sm:text-sm text-[#EEEEEE]/80">
                Berpengalaman dalam video kuliner & lifestyle
              </p>
            </motion.div>

            {/* Advantage 2 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="mb-4 sm:mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD369] mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-2 sm:mb-3">Jangkauan Luas</h3>
              <p className="text-xs sm:text-sm text-[#EEEEEE]/80">
                Lewat channel resmi Lejel Home Shopping
              </p>
            </motion.div>

            {/* Advantage 3 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="mb-4 sm:mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD369] mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-2 sm:mb-3">Proses Mudah & Transparan</h3>
              <p className="text-xs sm:text-sm text-[#EEEEEE]/80">
                Prosedur sederhana dan komunikasi jelas
              </p>
            </motion.div>

            {/* Advantage 4 */}
            <motion.div 
              className="bg-gradient-to-br from-[#0f1419] to-[#2a2f3a] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#FFD369]/30 hover:border-[#FFD369]/50 transition-all text-center"
              variants={fadeInUp}
            >
              <div className="mb-4 sm:mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD369] mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#EEEEEE] mb-2 sm:mb-3">Cocok untuk Semua</h3>
              <p className="text-xs sm:text-sm text-[#EEEEEE]/80">
                Dari UMKM hingga franchise
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">Tertarik Ikut Promosi Gratis?</h2>
            <div className="w-20 sm:w-24 h-1 bg-[#FFD369] mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-[#EEEEEE]/80 max-w-2xl mx-auto px-4">
              Klik ikon WhatsApp di bawah untuk langsung terhubung dengan tim kami dan dapatkan promosi gratis untuk restoran Anda!
            </p>
          </motion.div>

          {/* WhatsApp CTA */}
          <div className="flex justify-center mb-12">
            <motion.a 
              href="https://wa.me/6282242908154?text=Halo%20Lejel%20Labs%20Media,%20saya%20tertarik%20dengan%20program%20promosi%20gratis%20untuk%20restoran%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="bg-[#25D366] rounded-full p-4 sm:p-6 shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 group-hover:bg-[#128C7E]">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
            </motion.a>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Contact Info */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              variants={fadeInLeft}
            >
              <motion.div 
                className="bg-[#0a0e13] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-[#FFD369]/10"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 sm:mb-6">Informasi Kontak</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD369]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EEEEEE] mb-1 text-sm sm:text-base">Alamat</h4>
                      <p className="text-[#EEEEEE]/80 text-sm sm:text-base">
                        The Bellezza Office Tower Lt. 18, 23 & 27<br />
                        Jl. LetJend. Soepeno No. 34, Arteri<br />
                        Grogol Utara, Jakarta Selatan, 12210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD369]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EEEEEE] mb-1 text-sm sm:text-base">Telepon</h4>
                      <p className="text-[#EEEEEE]/80 text-sm sm:text-base">
                        Lejel Labs Media<br />
                        0821 4499 8975
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD369]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#EEEEEE] mb-1 text-sm sm:text-base">Email</h4>
                      <p className="text-[#EEEEEE]/80 text-sm sm:text-base break-all">Lejel25labs@gmail.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-[#FFD369] to-[#FFD369]/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-[#222831]"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Jam Operasional</h3>
                <p className="text-[#0f1419]/90 text-sm sm:text-base font-medium">
                  Senin - Jumat: 09:00 - 18:00<br />
                  Sabtu: 09:00 - 14:00<br />
                  Minggu & Hari Libur: Tutup
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="bg-[#0a0e13] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-[#FFD369]/10"
              variants={fadeInRight}
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 sm:mb-6">Kirim Pesan</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-[#EEEEEE] mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0f1419] border border-[#FFD369]/20 text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-transparent transition-all text-sm sm:text-base placeholder:text-[#EEEEEE]/40"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[#EEEEEE] mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0f1419] border border-[#FFD369]/20 text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-transparent transition-all text-sm sm:text-base placeholder:text-[#EEEEEE]/40"
                    placeholder="08xx xxxx xxxx"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#EEEEEE] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0f1419] border border-[#FFD369]/20 text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-transparent transition-all text-sm sm:text-base placeholder:text-[#EEEEEE]/40"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-[#EEEEEE] mb-2">
                    Nama Perusahaan / Brand
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0f1419] border border-[#FFD369]/20 text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-transparent transition-all text-sm sm:text-base placeholder:text-[#EEEEEE]/40"
                    placeholder="Nama perusahaan atau brand Anda"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-[#EEEEEE] mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#222831] border border-[#FFD369]/20 text-[#EEEEEE] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-transparent transition-all resize-none text-sm sm:text-base placeholder:text-[#EEEEEE]/40"
                    placeholder="Ceritakan kebutuhan bisnis Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-[#FFD369] text-[#222831] rounded-lg font-semibold transition-all shadow-lg text-xs sm:text-sm md:text-base ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#FFD369]/90 hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>

                {/* Success/Error Message */}
                {submitMessage && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-sm sm:text-base ${
                      submitMessage.includes('Terima kasih')
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1419] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start mb-3 sm:mb-4">
                <Image
                  src="/lejel-labs-logo-white.png"
                  alt="Lejel Labs Media"
                  width={300}
                  height={100}
                  className="h-12 sm:h-16 md:h-20 w-auto"
                />
              </div>
              <p className="text-[#EEEEEE]/70 text-sm sm:text-base">
                Divisi media dan digital marketing dari Lejel Home Shopping
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Link Cepat</h4>
              <ul className="space-y-2 text-[#EEEEEE]/70 text-sm sm:text-base">
                <li><a href="#about" className="hover:text-[#FFD369] transition-colors">Siapa Kami</a></li>
                <li><a href="#services" className="hover:text-[#FFD369] transition-colors">Promosi Gratis</a></li>
                <li><a href="#packages" className="hover:text-[#FFD369] transition-colors">Paket</a></li>
                <li><a href="#contact" className="hover:text-[#FFD369] transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Ikuti Kami</h4>
              <div className="flex space-x-3 justify-center sm:justify-start">
                {/* YouTube */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#FFD369] rounded-lg flex items-center justify-center hover:bg-[#FFD369]/80 transition-colors group"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#FFD369] rounded-lg flex items-center justify-center hover:bg-[#FFD369]/80 transition-colors group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* TikTok */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#FFD369] rounded-lg flex items-center justify-center hover:bg-[#FFD369]/80 transition-colors group"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-[#222831] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#393E46] pt-6 sm:pt-8 text-center text-[#EEEEEE]/70 text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} Lejel Labs Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
