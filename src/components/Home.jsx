import React from 'react';
import { Button } from '@mui/material';
import { Check, ChevronRight, Add, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/user-type');
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Find Your Dream Job<br /> With JobPortal
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-gray-600">
            Connect with the best companies and opportunities worldwide
          </p>
          <Button 
            variant="contained" 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-200"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Account",
                description: "Sign up and create your professional profile",
                icon: <Add className="text-blue-600" />
              },
              {
                title: "Find Jobs",
                description: "Search and apply to your dream jobs",
                icon: <Check className="text-blue-600" />
              },
              {
                title: "Get Hired",
                description: "Get noticed by top companies",
                icon: <ChevronRight className="text-blue-600" />
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-6 bg-gray-50">
        {/* ... Rest of the featured jobs section ... */}
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { number: "1M+", label: "Active Users" },
            { number: "50K+", label: "Companies" },
            { number: "100K+", label: "Jobs Posted" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of professionals finding their dream jobs</p>
          <Button 
            variant="contained" 
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg transition duration-200"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Footer content */}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;