import React, { useState, useEffect } from "react";
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
  AiOutlineGlobal,
  AiOutlineHeart,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  FiActivity,
  FiDatabase,
  FiCloud,
  FiZap,
  FiShield,
  FiUsers,
  FiTrendingUp,
  FiLock,
  FiSmile,
  FiEye,
} from "react-icons/fi";
import logo from "../media/Design a modern, fut.png";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketing Manager",
      company: "TechFlow Inc.",
      comment:
        "Concentria helped me understand exactly how my data was being used. For the first time, I feel like I have real control over my digital footprint.",
      avatar: "👩‍💼",
      location: "San Francisco, CA",
    },
    {
      name: "Marcus Rodriguez",
      role: "Freelance Developer",
      company: "Independent",
      comment:
        "As someone who builds apps, I know how valuable user data is. Concentria gives me the transparency I've always wanted as a user.",
      avatar: "👨‍💻",
      location: "Austin, TX",
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "MedTech Solutions",
      comment:
        "The peace of mind Concentria provides is invaluable. I can focus on my research knowing my data is protected and monitored.",
      avatar: "👩‍🔬",
      location: "Boston, MA",
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrollY > 50
              ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <img
                      src={logo}
                      className="w-8 h-8 rounded-lg"
                      alt="Concentria"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Concentria
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Privacy First</p>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-8">
                <NavLink href="#why-us">Why Choose Us</NavLink>
                <NavLink href="#how-it-works">How It Works</NavLink>
                <NavLink href="#testimonials">Stories</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
                <Link
                  to="/auth"
                  className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <span className="text-white">Start Protecting</span>
                  <AiOutlineArrowRight className="text-white h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8 border border-green-200">
                <FiShield className="h-4 w-4 mr-2" />
                Trusted by 50,000+ privacy-conscious users
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Digital Life
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Should Be Private
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30"></div>
                </span>
              </h1>

              {/* Subheadline with Human Touch */}
              <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed font-light">
                We believe privacy isn't a luxury—it's a fundamental right.
                <br />
                <span className="font-medium text-gray-900">
                  Concentria helps real people like you take back control of
                  their digital footprint.
                </span>
              </p>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <Link
                  to="/auth"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-3 min-w-[200px] justify-center"
                >
                  <AiOutlineRocket className="text-white h-5 w-5 group-hover:animate-bounce" />
                  <span className="text-white">Start Free Today</span>
                </Link>

                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <AiOutlineCheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">No credit card</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AiOutlineCheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Setup in 2 minutes</span>
                  </div>
                </div>
              </div>

              {/* Human Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <HumanStat
                  icon={<FiUsers className="h-6 w-6" />}
                  number="50K+"
                  label="Protected Users"
                  color="blue"
                />
                <HumanStat
                  icon={<AiOutlineGlobal className="h-6 w-6" />}
                  number="120+"
                  label="Countries"
                  color="green"
                />
                <HumanStat
                  icon={<FiShield className="h-6 w-6" />}
                  number="99.9%"
                  label="Uptime"
                  color="purple"
                />
                <HumanStat
                  icon={<FiSmile className="h-6 w-6" />}
                  number="4.9/5"
                  label="User Rating"
                  color="orange"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Problem Is Real
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Every day, your personal data is collected, sold, and used
                without your knowledge. It's time to change that story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProblemCard
                icon="😰"
                title="Data Sold Without Permission"
                description="Your browsing habits, location data, and personal preferences are being sold to the highest bidder."
                stat="87% of users"
              />
              <ProblemCard
                icon="😔"
                title="Zero Transparency"
                description="You have no idea who has your data, what they're doing with it, or how to stop it."
                stat="9 out of 10 people"
              />
              <ProblemCard
                icon="😡"
                title="Feeling Powerless"
                description="Complex privacy policies and hidden settings make it nearly impossible to protect yourself."
                stat="95% report feeling"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="why-us" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                We're Changing The Game
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Concentria gives you the tools and transparency you deserve.
                Here's how we're different.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <SolutionFeature
                  icon={<FiEye className="h-6 w-6" />}
                  title="Complete Transparency"
                  description="See exactly who's accessing your data, when, and why. No more guessing games."
                  gradient="from-blue-500 to-blue-600"
                />
                <SolutionFeature
                  icon={<FiLock className="h-6 w-6" />}
                  title="Instant Protection"
                  description="Block unwanted data collection with one click. Take control of your digital footprint immediately."
                  gradient="from-purple-500 to-purple-600"
                />
                <SolutionFeature
                  icon={<FiZap className="h-6 w-6" />}
                  title="Real-Time Alerts"
                  description="Get notified the moment someone tries to access your data. Stay informed, stay protected."
                  gradient="from-green-500 to-green-600"
                />
                <SolutionFeature
                  icon={<FiTrendingUp className="h-6 w-6" />}
                  title="Easy to Understand"
                  description="No technical jargon. Clear, simple reports that anyone can understand and act on."
                  gradient="from-orange-500 to-orange-600"
                />
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Privacy Dashboard
                      </h3>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <PrivacyMetric
                        label="Location Tracking"
                        value="BLOCKED"
                        status="good"
                      />
                      <PrivacyMetric
                        label="Data Brokers"
                        value="12 FOUND"
                        status="warning"
                      />
                      <PrivacyMetric
                        label="Ad Trackers"
                        value="BLOCKED"
                        status="good"
                      />
                      <PrivacyMetric
                        label="Privacy Score"
                        value="89/100"
                        status="good"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Live Example Dashboard
                    </p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Getting Started Is Simple
              </h2>
              <p className="text-xl text-gray-700">
                Privacy protection shouldn't be complicated. Here's our
                human-friendly approach:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <HumanStep
                step="01"
                title="Tell Us About You"
                description="Share what matters most to you. We'll customize your protection based on your lifestyle and concerns."
                icon="👋"
                color="blue"
              />
              <HumanStep
                step="02"
                title="We Set Everything Up"
                description="Our team handles the technical stuff. You'll get a personalized dashboard showing your privacy status."
                icon="⚙️"
                color="purple"
              />
              <HumanStep
                step="03"
                title="Live Your Life Privately"
                description="Browse, shop, and connect with confidence. We'll keep you informed and protected 24/7."
                icon="🌟"
                color="green"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real Stories From Real People
              </h2>
              <p className="text-xl text-gray-700">
                Here's what our community has to say about taking back control
              </p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-6xl mb-6">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <blockquote className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].comment}"
                  </blockquote>
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role} •{" "}
                      {testimonials[currentTestimonial].company}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Human-Centered CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🛡️</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to Take Back Control?
                </h2>
                <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of people who've already taken the first step
                  towards digital privacy. Your future self will thank you.
                </p>

                <div className="space-y-4">
                  <Link
                    to="/auth"
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 space-x-3"
                  >
                    <span>🚀 Start Your Privacy Journey</span>
                    <AiOutlineArrowRight className="h-5 w-5" />
                  </Link>

                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/80 text-sm">
                    <div className="flex items-center space-x-2">
                      <AiOutlineCheckCircle className="h-4 w-4" />
                      <span>Free forever plan available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AiOutlineClockCircle className="h-4 w-4" />
                      <span>2-minute setup</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AiOutlineHeart className="h-4 w-4" />
                      <span>Made by humans, for humans</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <img src={logo} className="w-8 h-8 rounded-lg" alt="Logo" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Concentria</h3>
                    <p className="text-gray-400 text-sm">Privacy for Humans</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                  We believe privacy is a human right. Our mission is to make
                  digital privacy accessible, understandable, and effective for
                  everyone.
                </p>
                <div className="flex space-x-4">
                  <SocialIcon icon={AiOutlineTwitter} />
                  <SocialIcon icon={AiOutlineLinkedin} />
                  <SocialIcon icon={AiOutlineGithub} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <FooterLinks
                  links={["How it Works", "Features", "Pricing", "Security"]}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <FooterLinks
                  links={[
                    "Help Center",
                    "Contact Us",
                    "Privacy Policy",
                    "Terms",
                  ]}
                />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2025 Concentria. Built with ❤️ for your privacy.
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AiOutlinePhone className="h-4 w-4" />
                    <span>24/7 Human Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Component Definitions
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group"
  >
    {children}
    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
  </a>
);

const HumanStat = ({ icon, number, label, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/90 transition-all duration-300 text-center group">
      <div
        className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const ProblemCard = ({ icon, title, description, stat }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <div className="text-2xl font-bold text-red-600 mb-2">{stat}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const SolutionFeature = ({ icon, title, description, gradient }) => (
  <div className="flex items-start space-x-4 group">
    <div
      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const PrivacyMetric = ({ label, value, status }) => {
  const statusColors = {
    good: "text-green-600 bg-green-50",
    warning: "text-orange-600 bg-orange-50",
    bad: "text-red-600 bg-red-50",
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 text-sm">{label}</span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {value}
      </span>
    </div>
  );
};

const HumanStep = ({ step, title, description, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div className="text-center group">
      <div className="relative mb-6">
        <div
          className={`w-20 h-20 bg-gradient-to-r ${colorClasses[color]} rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform`}
        >
          {step}
        </div>
        <div className="absolute -top-2 -right-2 text-2xl">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
    <Icon className="h-5 w-5" />
  </button>
);

const FooterLinks = ({ links }) => (
  <div className="space-y-3">
    {links.map((link, index) => (
      <a
        key={index}
        href="#"
        className="block text-gray-400 hover:text-white transition-colors text-sm"
      >
        {link}
      </a>
    ))}
  </div>
);
