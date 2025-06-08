
import React, { useState, useEffect } from 'react';
import { Clock, Volume2, Eye, Cigarette, RotateCcw, Trash2, ChevronRight, Menu, X } from 'lucide-react';
import './Home.css';

// Import images
import srccImage from '../images/Home/heroImage.jpg';
import mirandaImage from '../images/Home/miranda.jpg';
import stephensImage from '../images/Home/stephens.jpg';
import lsrImage from '../images/Home/lsr.jpg';
import hinduImage from '../images/Home/hindu.jpg';
import hansrajImage from '../images/Home/hansraj.jpg';
import gargiImage from '../images/Home/gargi.jpg';
import ramjasImage from '../images/Home/ramjas.jpg';
import kmcImage from '../images/Home/kmc.jpg';
import jmcImage from '../images/Home/jmc.jpg';
import heroBackgroundImage from '../images/Home/heroImage.jpg';
import messImage from '../images/Home/mess.jpg';

const HomeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedHostel, setSelectedHostel] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced hostel data
  const hostels = [
    {
      id: 1,
      name: 'SRCC',
      capacity: 150,
      location: 'SRCC Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. N.S. Nigam',
      image: srccImage,
      description: 'Premier hostel facility with modern amenities and excellent academic environment.',
      facilities: ['WiFi', 'Library', 'Sports Complex', 'Cafeteria']
    },
    {
      id: 2,
      name: 'Miranda House',
      capacity: 200,
      location: 'Miranda House Campus, North Campus, University of Delhi',
      type: 'Girls',
      warden: 'Dr. Bijayalaxmi Nanda',
      image: mirandaImage,
      description: 'Safe and secure accommodation for female students with 24/7 security.',
      facilities: ['Security', 'Common Room', 'Garden', 'Study Hall']
    },
    {
      id: 3,
      name: 'St. Stephen\'s College',
      capacity: 180,
      location: 'St. Stephen\'s Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. John Varghese',
      image: stephensImage,
      description: 'Historic hostel with rich tradition and excellent academic culture.',
      facilities: ['Heritage Building', 'Chapel', 'Sports Ground', 'Library']
    },
    {
      id: 4,
      name: 'Lady Shri Ram College',
      capacity: 160,
      location: 'LSR Campus, South Campus, University of Delhi',
      type: 'Girls',
      warden: 'Dr. Suman Sharma',
      image: lsrImage,
      description: 'Modern hostel facility with emphasis on women empowerment and academics.',
      facilities: ['Modern Rooms', 'Gym', 'Reading Room', 'Recreation Area']
    },
    {
      id: 5,
      name: 'Hindu College',
      capacity: 220,
      location: 'Hindu College Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. Anju Srivastava',
      image: hinduImage,
      description: 'Large capacity hostel with diverse student community and cultural activities.',
      facilities: ['Cultural Center', 'Auditorium', 'Sports Complex', 'Medical Center']
    },
    {
      id: 6,
      name: 'Hansraj College',
      capacity: 140,
      location: 'Hansraj Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. Rama Sharma',
      image: hansrajImage,
      description: 'Cozy hostel environment promoting academic excellence and personal growth.',
      facilities: ['Study Rooms', 'Computer Lab', 'Playground', 'Canteen']
    },
    {
      id: 7,
      name: 'Gargi College',
      capacity: 190,
      location: 'Gargi Campus, South Campus, University of Delhi',
      type: 'Girls',
      warden: 'Dr. Promila Kumar',
      image: gargiImage,
      description: 'Well-equipped hostel focusing on holistic development of female students.',
      facilities: ['Art Studio', 'Dance Room', 'Yoga Hall', 'Garden']
    },
    {
      id: 8,
      name: 'Ramjas College',
      capacity: 170,
      location: 'Ramjas Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. Manoj Khanna',
      image: ramjasImage,
      description: 'Dynamic hostel community with focus on academic and extracurricular excellence.',
      facilities: ['Debate Hall', 'Music Room', 'Sports Facilities', 'Study Center']
    },
    {
      id: 9,
      name: 'Kirori Mal College',
      capacity: 210,
      location: 'KMC Campus, North Campus, University of Delhi',
      type: 'Boys',
      warden: 'Dr. Vibha Singh Chauhan',
      image: kmcImage,
      description: 'Spacious hostel with excellent infrastructure and academic support.',
      facilities: ['Large Rooms', 'Conference Hall', 'Gym', 'Cafeteria']
    },
    {
      id: 10,
      name: 'Jesus and Mary College',
      capacity: 130,
      location: 'JMC Campus, South Campus, University of Delhi',
      type: 'Girls',
      warden: 'Dr. Lilly Ganjoo',
      image: jmcImage,
      description: 'Intimate hostel community with personalized care and academic support.',
      facilities: ['Chapel', 'Library', 'Common Room', 'Garden']
    }
  ];

  const messDetails = {
    overview: "The DU hostel mess facilities are managed centrally to provide nutritious and hygienic meals to all residents. Our mess system operates on a subscription-based model where students can choose from multiple meal plans according to their dietary preferences and requirements.",
    
    facilities: [
      "Modern kitchen equipment with gas connections and safety systems",
      "Separate cooking areas for vegetarian and non-vegetarian meals",
      "Cold storage and freezer facilities for fresh ingredients",
      "Water purification systems for safe drinking water",
      "Spacious dining halls with comfortable seating arrangements",
      "Clean washbasins and sanitization stations"
    ],

    mealPlans: [
      {
        name: "Full Board",
        price: "₹4,500/month",
        includes: "Breakfast, Lunch, Snacks, Dinner",
        popular: true
      },
      {
        name: "Two Meals",
        price: "₹3,200/month", 
        includes: "Lunch and Dinner",
        popular: false
      },
      {
        name: "Single Meal",
        price: "₹1,800/month",
        includes: "Choice of Lunch or Dinner",
        popular: false
      }
    ],

    timings: {
      breakfast: "7:00 AM - 9:00 AM",
      lunch: "12:00 PM - 2:00 PM", 
      snacks: "4:00 PM - 5:00 PM",
      dinner: "7:30 PM - 9:30 PM"
    }
  };

  const messRules = [
    'Once a student joins a mess, he / she shall be deemed to have become a permanent member of that mess throughout the semester. No change of mess is permissible during the semester.',
    'Students who absent themselves on the date of reopening of the Institute after any semester vacation/recess will be deemed to have joined the mess wherein they dined during the previous semester and will be charged accordingly.',
    'Students should sign the Mess Joining Register kept in the messes at the time of their joining the mess and also register themselves for biometric machine attendance.',
    'Mess timings must be strictly followed. Late entry may result in meal unavailability.',
    'Students must maintain proper hygiene and cleanliness while dining.',
    'Food wastage is strictly prohibited and may result in penalty charges.',
    'Outside food is not allowed in the mess dining area.',
    'Students must carry their mess cards for meal access verification.'
  ];

  const hostelRules = [
    { id: 1, text: 'Please adhere to the check-in and check-out times.', icon: Clock, category: 'Timing' },
    { id: 2, text: 'Please refrain from making noise for other guests.', icon: Volume2, category: 'Discipline' },
    { id: 3, text: 'Items placed in the room are for viewing only.', icon: Eye, category: 'Property' },
    { id: 4, text: 'Smoking is permitted only in designated areas.', icon: Cigarette, category: 'Health' },
    { id: 5, text: 'Request a towel replacement only if necessary.', icon: RotateCcw, category: 'Resources' },
    { id: 6, text: 'Clean up after using shared spaces.', icon: Trash2, category: 'Cleanliness' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'hostels', 'mess', 'rules', 'about'];
      const scrollPosition = window.scrollY + 150;
      
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 50);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextHostel = () => {
    setSelectedHostel((prev) => (prev + 1) % hostels.length);
  };

  const prevHostel = () => {
    setSelectedHostel((prev) => (prev - 1 + hostels.length) % hostels.length);
  };

  return (
    <div className="hostel-management-system">
      {/* Enhanced Navigation Header */}
      <nav className={`nav-header ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo">
              <HomeIcon />
              <span className="logo-text">DU HMS</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-menu desktop-menu">
              <div className="nav-links">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'hostels', label: 'Hostels' },
                  { id: 'mess', label: 'Mess' },
                  { id: 'rules', label: 'Rules' },
                  { id: 'about', label: 'About' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                    <span className="nav-link-indicator"></span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <button className="login-btn">
              <span className="login-icon">👤</span>
              <span>Login</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'hostels', label: 'Hostels' },
            { id: 'mess', label: 'Mess' },
            { id: 'rules', label: 'Rules' },
            { id: 'about', label: 'About' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`mobile-nav-link ${activeSection === item.id ? 'mobile-nav-link-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Enhanced Home Section */}
      <section id="home" className="home-section">
        <div className="hero-container">
          <div className="hero-bg">
            <img src={heroBackgroundImage} alt="Hero Background" className="hero-bg-img" />
            <div className="hero-overlay"></div>
            <div className="hero-particles"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-text">University of Delhi</span>
              </div>
              <h1 className="hero-title">
                <span className="title-main">Hostel Management</span>
                <span className="title-accent">System</span>
              </h1>
              <p className="hero-subtitle">
                Your gateway to comfortable and modern hostel living with state-of-the-art facilities
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Hostels</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1800+</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
              <button 
                className="hero-cta"
                onClick={() => scrollToSection('hostels')}
              >
                Explore Hostels
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Hostels Section */}
      <section id="hostels" className="hostels-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Hostels</h2>
            <p className="section-subtitle">Discover comfortable living spaces across Delhi University</p>
          </div>
          
          {/* Enhanced Hostel Selector */}
          <div className="hostel-selector">
            <div className="hostel-cards-container">
              <div className="hostel-cards">
                {hostels.map((hostel, index) => (
                  <button
                    key={hostel.id}
                    onClick={() => setSelectedHostel(index)}
                    className={`hostel-card ${selectedHostel === index ? 'hostel-card-active' : ''}`}
                  >
                    <div className="hostel-card-content">
                      <span className="hostel-card-name">{hostel.name}</span>
                      <span className="hostel-card-type">{hostel.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Hostel Details */}
          <div className="hostel-details">
            <div className="hostel-details-content">
              <div className="hostel-images">
                <div className="hostel-main-image">
                  <img 
                    src={hostels[selectedHostel].image} 
                    alt={hostels[selectedHostel].name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="placeholder-content" style={{ display: 'none' }}>
                    <div className="placeholder-icon">🏢</div>
                    <p className="placeholder-text">Hostel Building</p>
                  </div>
                  <div className="image-overlay">
                    <div className="capacity-badge">
                      <span className="capacity-number">{hostels[selectedHostel].capacity}</span>
                      <span className="capacity-label">Students</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hostel-info">
                <div className="hostel-header">
                  <h3 className="hostel-name">{hostels[selectedHostel].name}</h3>
                  <span className="hostel-type-badge">{hostels[selectedHostel].type}</span>
                </div>
                
                <p className="hostel-description">{hostels[selectedHostel].description}</p>
                
                <div className="hostel-info-content">
                  <div className="info-section">
                    <h4 className="info-section-title">Details</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-icon">👥</span>
                        <div className="info-text">
                          <span className="info-label">Capacity</span>
                          <span className="info-value">{hostels[selectedHostel].capacity} students</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div className="info-text">
                          <span className="info-label">Location</span>
                          <span className="info-value">{hostels[selectedHostel].location}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">👨‍🏫</span>
                        <div className="info-text">
                          <span className="info-label">Warden</span>
                          <span className="info-value">{hostels[selectedHostel].warden}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4 className="info-section-title">Facilities</h4>
                    <div className="facilities-grid">
                      {hostels[selectedHostel].facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          <span className="facility-dot"></span>
                          <span className="facility-text">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="hostel-navigation">
                  <button className="nav-btn nav-btn-prev" onClick={prevHostel}>
                    ←
                  </button>
                  <span className="hostel-counter">
                    {selectedHostel + 1} of {hostels.length}
                  </span>
                  <button className="nav-btn nav-btn-next" onClick={nextHostel}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mess Section */}
      <section id="mess" className="mess-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Mess Facilities</h2>
            <p className="section-subtitle">Nutritious meals and modern dining facilities</p>
          </div>
          
          <div className="mess-overview">
            <p className="mess-description">{messDetails.overview}</p>
          </div>

          <div className="mess-content-grid">
            <div className="mess-image-container">
              <img 
                src={messImage} 
                alt="Mess" 
                className="mess-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="placeholder-content" style={{ display: 'none' }}>
                <div className="placeholder-icon">🍽️</div>
                <p className="placeholder-text">Mess Facility</p>
              </div>
              <div className="mess-image-overlay">
                <div className="quality-badge">
                  <span>Hygienic & Nutritious</span>
                </div>
              </div>
            </div>

            <div className="mess-details-container">
              <div className="mess-section">
                <h3 className="mess-section-title">Meal Plans</h3>
                <div className="meal-plans">
                  {messDetails.mealPlans.map((plan, index) => (
                    <div key={index} className={`meal-plan-card ${plan.popular ? 'popular' : ''}`}>
                      {plan.popular && <div className="popular-badge">Most Popular</div>}
                      <h4 className="meal-plan-name">{plan.name}</h4>
                      <div className="meal-plan-price">{plan.price}</div>
                      <p className="meal-plan-includes">{plan.includes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mess-section">
                <h3 className="mess-section-title">Mess Timings</h3>
                <div className="mess-timings">
                  {Object.entries(messDetails.timings).map(([meal, time]) => (
                    <div key={meal} className="timing-item">
                      <span className="timing-icon">
                        {meal === 'breakfast' && '🌅'}
                        {meal === 'lunch' && '☀️'}
                        {meal === 'snacks' && '🍪'}
                        {meal === 'dinner' && '🌙'}
                      </span>
                      <div className="timing-content">
                        <span className="timing-label">{meal.charAt(0).toUpperCase() + meal.slice(1)}</span>
                        <span className="timing-value">{time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mess-facilities">
            <h3 className="mess-section-title">Available Facilities</h3>
            <div className="facilities-grid">
              {messDetails.facilities.map((facility, index) => (
                <div key={index} className="facility-card">
                  <span className="facility-icon">✅</span>
                  <span className="facility-text">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mess-rules-section">
            <h3 className="mess-section-title">Rules & Regulations</h3>
            <div className="mess-rules">
              {messRules.map((rule, index) => (
                <div key={index} className="mess-rule">
                  <div className="rule-number">{index + 1}</div>
                  <p className="rule-text">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Rules Section */}
      <section id="rules" className="rules-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Hostel Rules</h2>
            <p className="section-subtitle">Guidelines for a harmonious living environment</p>
          </div>
          
          <div className="rules-grid">
            {hostelRules.map((rule) => {
              const IconComponent = rule.icon;
              return (
                <div key={rule.id} className="rule-card">
                  <div className="rule-header">
                    <div className="rule-number">{rule.id}</div>
                    <div className="rule-category">{rule.category}</div>
                  </div>
                  <div className="rule-content">
                    <IconComponent className="rule-icon" />
                    <p className="rule-text">{rule.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">About Us</h2>
            <p className="section-subtitle">Committed to providing excellent hostel management services</p>
          </div>
          
          <div className="about-content">
            <div className="about-description">
              <p>
                The DU Hostel Management System is a centralized platform designed to streamline 
                hostel-related services across Delhi University, aiming to provide a seamless digital 
                experience for students residing in various DU hostels. With a strong focus on 
                comfort, transparency, and convenience, the system reflects our mission to enhance 
                student well-being by delivering efficient, transparent, and tech-enabled hostel 
                management across all affiliated colleges of Delhi University.
              </p>
            </div>
            
            <div className="contact-section">
              <div className="contact-cards">
                <div className="contact-card">
                  <h3 className="contact-card-title">Office Hours</h3>
                  <div className="contact-card-content">
                    <div className="hours-item">
                      <span className="hours-day">Monday - Friday</span>
                      <span className="hours-time">9:00 AM – 5:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span className="hours-day">Saturday</span>
                      <span className="hours-time">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span className="hours-day">Sunday</span>
                      <span className="hours-time">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <h3 className="contact-card-title">Contact Information</h3>
                  <div className="contact-card-content">
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <div className="contact-text">
                        <span className="contact-label">Phone</span>
                        <span className="contact-value">+91-11-2766XXXX</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">✉️</span>
                      <div className="contact-text">
                        <span className="contact-label">Email</span>
                        <span className="contact-value">duhostelhelp@du.ac.in</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">📍</span>
                      <div className="contact-text">
                        <span className="contact-label">Address</span>
                        <span className="contact-value">University of Delhi, North Campus, Delhi – 110007</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <HomeIcon />
            <span>DU HMS</span>
          </div>
          <p className="footer-text">© 2024 Delhi University Hostel Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;