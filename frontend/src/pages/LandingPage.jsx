import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineLock,
  AiOutlineTeam,
  AiOutlineRocket,
  AiOutlineCheckCircle,
  AiOutlineArrowRight,
  AiOutlineStar,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from "react-icons/ai";
import {
  FiActivity,
  FiDatabase,
  FiCloud,
  FiZap,
  FiShield,
} from "react-icons/fi";
import logo from "../media/Design a modern, fut.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10">
        {/* Clean Navigation */}
        <nav className="bg-white/40 backdrop-blur-2xl border-b border-white/30 px-6 py-4 sticky top-0">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src={logo}
                  className="w-8 h-8 rounded-lg"
                  alt="Concentria"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Concentria
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
              >
                How it Works
              </a>
              <a
                href="#team"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
              >
                About
              </a>
              <Link
                to="/auth"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-white">Get Started Free</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section - More Engaging */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/30 mb-8 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">
                  🎉 Trusted by many users worldwide
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-8 leading-tight">
                Your Privacy,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your Control
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Take back control of your digital life with Concentria's
                powerful privacy tools. Monitor, protect, and manage your data
                with ease.
                <span className="font-semibold text-blue-600">
                  {" "}
                  It's that simple.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <Link
                  to="/auth"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <AiOutlineRocket className="text-white h-5 w-5 group-hover:animate-bounce" />
                  <span className="text-white">Start Protecting Now</span>
                  <AiOutlineArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <a
                    href="https://www.youtube.com/watch?v=RoitOTJOT1w"
                    target="_blank"
                  >
                    ▶️ Watch Demo
                  </a>
                </button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <HeroStat number="99.9%" label="Uptime" />
                <HeroStat number="♾️" label="Happy Users" />
                <HeroStat number="100%" label="Privacy Focused" />
                <HeroStat number="24/7" label="Support" />
              </div>
            </div>
          </div>
        </section>

        {/* Simple Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Choose Concentria?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple, powerful tools that actually protect your privacy. No
                complicated setup required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SimpleFeatureCard
                emoji="🛡️"
                title="Instant Protection"
                description="Protect your data in seconds. No technical knowledge needed."
                gradient="from-blue-500 to-cyan-500"
              />
              <SimpleFeatureCard
                emoji="👁️"
                title="See Everything"
                description="Know exactly who's accessing your data and when."
                gradient="from-purple-500 to-pink-500"
              />
              <SimpleFeatureCard
                emoji="⚡"
                title="Lightning Fast"
                description="Real-time protection that doesn't slow you down."
                gradient="from-green-500 to-emerald-500"
              />
              <SimpleFeatureCard
                emoji="🔒"
                title="Bank-Level Security"
                description="Military-grade encryption keeps your data safe."
                gradient="from-red-500 to-orange-500"
              />
              <SimpleFeatureCard
                emoji="🌍"
                title="Works Everywhere"
                description="Protect your privacy across all your devices and apps."
                gradient="from-indigo-500 to-blue-500"
              />
              <SimpleFeatureCard
                emoji="🎯"
                title="Zero Complexity"
                description="Set it up once and forget about it. We handle the rest."
                gradient="from-yellow-500 to-orange-500"
              />
            </div>
          </div>
        </section>

        {/* How It Works - Simple Steps */}
        <section id="how-it-works" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                Get Started in 3 Easy Steps
              </h2>
              <p className="text-lg text-gray-600">
                Privacy protection shouldn't be complicated. Here's how simple
                it is:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                step="1"
                title="Sign Up"
                description="Create your account in under 30 seconds. No credit card required."
                color="blue"
              />
              <StepCard
                step="2"
                title="Connect"
                description="Link your accounts and apps with one-click integration."
                color="purple"
              />
              <StepCard
                step="3"
                title="Relax"
                description="Your privacy is now protected 24/7. We'll handle everything else."
                color="green"
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Loved by Users Worldwide
                </h2>
                <p className="text-lg text-gray-600">
                  See what our community is saying about Concentria
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard
                  name="Sarah M."
                  role="Digital Marketer"
                  comment="Finally, a privacy tool that actually works! Super easy to use and gives me peace of mind."
                  rating={5}
                />
                <TestimonialCard
                  name="Mike L."
                  role="Software Developer"
                  comment="The dashboard is clean and the features are exactly what I needed. Highly recommended!"
                  rating={5}
                />
                <TestimonialCard
                  name="Emma K."
                  role="Small Business Owner"
                  comment="Protects my business data without any hassle. The setup was incredibly simple."
                  rating={5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to Take Control?
                </h2>
                <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                  Join thousands of users who trust Concentria to protect their
                  digital privacy. Start your free trial today!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/auth"
                    className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                  >
                    <span>🚀 Start Free Trial</span>
                    <AiOutlineArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-white/80 text-sm">
                    No credit card • 14-day free trial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Footer */}
        <footer className="bg-white/40 backdrop-blur-xl border-t border-white/30 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <img src={logo} className="w-8 h-8 rounded-lg" alt="Logo" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Concentria
                </span>
              </div>

              <div className="flex items-center space-x-8 mb-6 md:mb-0">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </div>

              <div className="flex space-x-4">
                <SocialButton icon={AiOutlineGithub} />
                <SocialButton icon={AiOutlineTwitter} />
                <SocialButton icon={AiOutlineLinkedin} />
              </div>
            </div>

            <div className="border-t border-gray-200/50 mt-8 pt-8 text-center">
              <p className="text-gray-600">
                © 2025 Concentria. Made with ❤️ for your privacy.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Hero Stat Component
const HeroStat = ({ number, label }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all duration-300">
      <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
};

// Simple Feature Card Component
const SimpleFeatureCard = ({ emoji, title, description, gradient }) => {
  return (
    <div className="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 hover:bg-white/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center">
      <div
        className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        {emoji}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Step Card Component
const StepCard = ({ step, title, description, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div className="text-center group">
      <div
        className={`w-16 h-16 bg-gradient-to-r ${colorClasses[color]} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {step}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, comment, rating }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/90 transition-all duration-300">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <AiOutlineStar
            key={i}
            className="h-5 w-5 text-yellow-500 fill-current"
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{comment}"</p>
      <div>
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
    </div>
  );
};

// Social Button Component
const SocialButton = ({ icon: Icon }) => {
  return (
    <button className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white/80 transition-all duration-300 border border-white/30 hover:scale-110">
      <Icon className="h-5 w-5" />
    </button>
  );
};
