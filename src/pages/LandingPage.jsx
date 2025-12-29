import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../translations";

// Import các components con mới
import Header from "./landing/Header";
import Hero from "./landing/Hero";
import Features from "./landing/Features";
import Testimonials from "./landing/Testimonials";
import Pricing from "./landing/Pricing";
import FAQ from "./landing/FAQ";
import CTA from "./landing/CTA";
import Contact from "./landing/Contact";
import Footer from "./landing/Footer";

// Import file CSS của bạn
import "../styles/langdingpage.css";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    center: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://xink-edu-backend-459095746983.asia-southeast1.run.app/contact", formData);
      console.log(res);
      if (res.status === 200) {
        alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.");
        setFormData({ name: "", email: "", message: "", center: "", phone: "" }); // Reset form
      } else {
        alert("Lỗi khi gửi liên hệ! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Lỗi khi gửi liên hệ! Vui lòng thử lại.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

  <div className="min-h-screen w-full antialiased text-slate-800 bg-gradient-to-b from-green-50 via-white to-green-100 overflow-x-hidden">
        
        {/* Glow blobs nền chung */}
        <div className="glow-wrap fixed -z-10">
          <div className="blob blob-cyan w-80 h-80 -top-10 -left-10" />
          <div className="blob blob-blue w-96 h-96 top-10 right-10" />
          <div className="blob blob-lime w-72 h-72 bottom-20 left-1/3" />
        </div>

        <Header 
          user={user} 
          onLoginClick={() => setShowLogin(true)} 
          t={t} 
        />

        <main>
          <Hero
            t={t}
            onLoginClick={() => setShowLogin(true)} 
          />
          <Features t={t} />
          <Testimonials t={t} />
          <Pricing t={t} />
          <FAQ t={t} />
          <CTA t={t} />
          <Contact
            t={t}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </main>

        <Footer t={t} />
      </div>
    </>
  );
}