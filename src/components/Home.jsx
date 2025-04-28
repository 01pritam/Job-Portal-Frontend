// import React from 'react';
// import { Button } from '@mui/material';
// import { Check, ChevronRight, Add, ExpandMore } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate('/user-type');
//   };

//   return (
//     <div className="font-sans">
//       {/* Hero Section */}
//       <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center py-16 px-6 relative">
//         <div className="max-w-5xl mx-auto">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
//             Find Your Dream Job<br /> With JobPortal
//           </h1>
//           <p className="text-xl mb-8 max-w-2xl text-gray-600">
//             Connect with the best companies and opportunities worldwide
//           </p>
//           <Button 
//             variant="contained" 
//             onClick={handleGetStarted}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-200"
//           >
//             Get Started
//           </Button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-6">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold mb-12 text-gray-800">How It Works</h2>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Create Account",
//                 description: "Sign up and create your professional profile",
//                 icon: <Add className="text-blue-600" />
//               },
//               {
//                 title: "Find Jobs",
//                 description: "Search and apply to your dream jobs",
//                 icon: <Check className="text-blue-600" />
//               },
//               {
//                 title: "Get Hired",
//                 description: "Get noticed by top companies",
//                 icon: <ChevronRight className="text-blue-600" />
//               }
//             ].map((feature, index) => (
//               <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs Section */}
//       <section className="py-16 px-6 bg-gray-50">
//         {/* ... Rest of the featured jobs section ... */}
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-6">
//         <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
//           {[
//             { number: "1M+", label: "Active Users" },
//             { number: "50K+", label: "Companies" },
//             { number: "100K+", label: "Jobs Posted" }
//           ].map((stat, index) => (
//             <div key={index} className="text-center">
//               <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
//               <p className="text-gray-600">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 px-6 bg-blue-600 text-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
//           <p className="text-xl mb-8">Join thousands of professionals finding their dream jobs</p>
//           <Button 
//             variant="contained" 
//             onClick={handleGetStarted}
//             className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg transition duration-200"
//           >
//             Get Started Now
//           </Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             {/* Footer content */}
//           </div>
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>© 2025 JobPortal. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;



"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  Paper,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Check,
  ChevronRight,
  Add,
  AdminPanelSettings,
  BusinessCenter,
  Person,
  Search,
  Payment,
  Message,
  Settings,
  Star,
  LocationOn,
  TrendingUp,
  Devices,
  ArrowForward,
  GitHub,
  Twitter,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGetStarted = () => {
    navigate("/user-type");
  };

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-2 py-1 bg-blue-100 rounded-md text-xs font-medium text-blue-800 mb-4">
                Job Portal Platform
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Find Your Dream Career Path
              </h1>
              <p className="text-lg mb-6 text-gray-600">
                Connect with the best companies and opportunities worldwide. Our
                platform serves job seekers, employers, and administrators with
                powerful tools to streamline the hiring process.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  variant="contained"
                  onClick={handleGetStarted}
                  style={{ backgroundColor: "#0969da" }}
                  className="px-4 py-2 rounded-md shadow-sm"
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  style={{ borderColor: "#0969da", color: "#0969da" }}
                  className="px-4 py-2 rounded-md"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="text-yellow-500 mr-1" fontSize="small" />
                <span>Trusted by 10,000+ professionals worldwide</span>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden shadow-md border border-gray-200 rounded-lg">
                <img
                  src="https://i.pinimg.com/1200x/46/78/c8/4678c82f3748f61d9672eca3cbc915f9.jpg"
                  alt="Job Portal Dashboard"
                  className="w-full h-auto"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Comprehensive Job Portal Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Our platform offers powerful tools for all users, making the
              hiring process seamless and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "For Administrators",
                description:
                  "Powerful management tools to oversee the entire platform, manage users, and ensure smooth operations.",
                icon: <AdminPanelSettings className="text-white text-2xl" />,
                iconBg: "#0969da",
                features: [
                  "Manage user profiles",
                  "Process payments",
                  "Add new services",
                  "Send notifications",
                  "Manage authentication",
                ],
                panel: "admin",
              },
              {
                title: "For Employers",
                description:
                  "Comprehensive recruitment tools to post jobs, search resumes, and connect with qualified candidates.",
                icon: <BusinessCenter className="text-white text-2xl" />,
                iconBg: "#2ea44f",
                features: [
                  "Post detailed job listings",
                  "Search candidate resumes",
                  "Track applications",
                  "Company profile management",
                  "Applicant communication",
                ],
                panel: "employer",
              },
              {
                title: "For Job Seekers",
                description:
                  "User-friendly tools to create profiles, search for jobs, and apply with just a few clicks.",
                icon: <Person className="text-white text-2xl" />,
                iconBg: "#bf3989",
                features: [
                  "One-click job applications",
                  "Resume builder",
                  "Job search filters",
                  "Application tracking",
                  "Profile privacy controls",
                ],
                panel: "jobseeker",
              },
            ].map((card, index) => (
              <Card
                key={index}
                className="rounded-lg h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: card.iconBg }}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: card.iconBg }}
                    >
                      {card.icon}
                    </div>
                    <Typography
                      variant="h6"
                      component="h3"
                      className="font-bold"
                    >
                      {card.title}
                    </Typography>
                  </div>
                  <Typography className="text-gray-600 mb-4 text-sm">
                    {card.description}
                  </Typography>
                  <Divider className="my-4" />
                  <div className="space-y-2 mb-6">
                    {card.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check
                          className="text-green-500 mr-2 mt-1"
                          fontSize="small"
                        />
                        <Typography variant="body2" className="text-gray-700">
                          {feature}
                        </Typography>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<ChevronRight />}
                    style={{ borderColor: card.iconBg, color: card.iconBg }}
                    className="mt-2 hover:bg-gray-50"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section - Redesigned with Tabs */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Explore our comprehensive feature set designed for administrators,
              employers, and job seekers.
            </p>
          </div>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="platform features tabs"
                centered
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    minWidth: 120,
                  },
                  "& .Mui-selected": { color: "#0969da" },
                  "& .MuiTabs-indicator": { backgroundColor: "#0969da" },
                }}
              >
                <Tab
                  label={
                    <div className="flex items-center">
                      <AdminPanelSettings fontSize="small" className="mr-2" />
                      Administrators
                    </div>
                  }
                />
                <Tab
                  label={
                    <div className="flex items-center">
                      <BusinessCenter fontSize="small" className="mr-2" />
                      Employers
                    </div>
                  }
                />
                <Tab
                  label={
                    <div className="flex items-center">
                      <Person fontSize="small" className="mr-2" />
                      Job Seekers
                    </div>
                  }
                />
              </Tabs>
            </Box>

            {/* Admin Features */}
            <div role="tabpanel" hidden={tabValue !== 0}>
              {tabValue === 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
                      <AdminPanelSettings fontSize="large" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        Administrator Features
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Powerful tools to manage the entire platform efficiently
                      </Typography>
                    </div>
                  </div>

                  <Grid container spacing={3}>
                    {[
                      {
                        icon: <Person />,
                        text: "Manage Job Seeker and Employer Profiles",
                        color: "#dbeafe",
                      },
                      {
                        icon: <Payment />,
                        text: "Manage Payments of Both Employer and Job Seekers",
                        color: "#dcfce7",
                      },
                      {
                        icon: <Add />,
                        text: "Add new services for employers and job seekers",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Message />,
                        text: "Send messages for subscription notifications",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Settings />,
                        text: "Provide roles and authentication to users",
                        color: "#ffedd5",
                      },
                      {
                        icon: <Settings />,
                        text: "Change site look and feel with templates",
                        color: "#dbeafe",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Display most recent jobs on home page",
                        color: "#dcfce7",
                      },
                      {
                        icon: <Search />,
                        text: "Search jobs by keyword, category, location",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Settings />,
                        text: "Create/Edit/Save icon sets",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Settings />,
                        text: "Location management console",
                        color: "#ffedd5",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Manage premium employers",
                        color: "#dbeafe",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Add/Edit/Delete/Approve/Disapprove jobs",
                        color: "#dcfce7",
                      },
                    ].map((feature, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          elevation={0}
                          className="p-4 flex items-start rounded-lg h-full transition-all duration-300 hover:shadow-md"
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            height: "100%",
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: feature.color }}
                          >
                            {feature.icon}
                          </div>
                          <Typography
                            variant="body2"
                            className="mt-1 text-gray-700"
                          >
                            {feature.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </div>

            {/* Employer Features */}
            <div role="tabpanel" hidden={tabValue !== 1}>
              {tabValue === 1 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white mr-4">
                      <BusinessCenter fontSize="large" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        Employer Features
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Comprehensive tools to find and hire the best talent
                      </Typography>
                    </div>
                  </div>

                  <Grid container spacing={3}>
                    {[
                      {
                        icon: <Search />,
                        text: "Search resumes by keywords, category, and recency",
                        color: "#dcfce7",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Post detailed job descriptions",
                        color: "#dbeafe",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Create and edit company profile",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Add />,
                        text: "Add company logo",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Message />,
                        text: "Retrieve password via automated email",
                        color: "#ffedd5",
                      },
                      {
                        icon: <Person />,
                        text: "Employer Registration",
                        color: "#dcfce7",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Reporting on job posting time and CV access",
                        color: "#dbeafe",
                      },
                      {
                        icon: <Payment />,
                        text: "Payment options by invoice, credit/debit card",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Track vacancy viewings and applications",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Person />,
                        text: "Register for memberships and job packages",
                        color: "#ffedd5",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "Include company profile and logo",
                        color: "#dcfce7",
                      },
                      {
                        icon: <Message />,
                        text: "New account notification emails",
                        color: "#dbeafe",
                      },
                    ].map((feature, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          elevation={0}
                          className="p-4 flex items-start rounded-lg h-full transition-all duration-300 hover:shadow-md"
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            height: "100%",
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: feature.color }}
                          >
                            {feature.icon}
                          </div>
                          <Typography
                            variant="body2"
                            className="mt-1 text-gray-700"
                          >
                            {feature.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </div>

            {/* Job Seeker Features */}
            <div role="tabpanel" hidden={tabValue !== 2}>
              {tabValue === 2 && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white mr-4">
                      <Person fontSize="large" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        Job Seeker Features
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        User-friendly tools to help you find your dream job
                      </Typography>
                    </div>
                  </div>

                  <Grid container spacing={3}>
                    {[
                      {
                        icon: <BusinessCenter />,
                        text: "Apply for jobs with one click",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Person />,
                        text: "Resume posting",
                        color: "#dbeafe",
                      },
                      {
                        icon: <Message />,
                        text: "Retrieve passwords by email",
                        color: "#dcfce7",
                      },
                      {
                        icon: <Person />,
                        text: "Job seeker registration",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Settings />,
                        text: "Login and update profile",
                        color: "#ffedd5",
                      },
                      {
                        icon: <BusinessCenter />,
                        text: "View application history",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Search />,
                        text: "Powerful online job search tool",
                        color: "#dbeafe",
                      },
                      {
                        icon: <Settings />,
                        text: "Set privacy level for resume visibility",
                        color: "#dcfce7",
                      },
                      {
                        icon: <Search />,
                        text: "Search jobs by multiple criteria",
                        color: "#fef9c3",
                      },
                      {
                        icon: <Settings />,
                        text: "Hide contact information",
                        color: "#ffedd5",
                      },
                      {
                        icon: <Person />,
                        text: "Add multiple qualifications and experiences",
                        color: "#f3e8ff",
                      },
                      {
                        icon: <Person />,
                        text: "Add photos to profile",
                        color: "#dbeafe",
                      },
                    ].map((feature, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          elevation={0}
                          className="p-4 flex items-start rounded-lg h-full transition-all duration-300 hover:shadow-md"
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            height: "100%",
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                            style={{ backgroundColor: feature.color }}
                          >
                            {feature.icon}
                          </div>
                          <Typography
                            variant="body2"
                            className="mt-1 text-gray-700"
                          >
                            {feature.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </div>
          </Box>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Featured Jobs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Discover the latest job openings from top companies around the
              world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Senior UX Designer",
                company: "Google",
                location: "San Francisco, CA",
                salary: "$120K - $150K",
                type: "Full-time",
                logo: "https://i.pinimg.com/1200x/3b/e2/63/3be2637a22aecf5e5acaffb9720aafd3.jpg",
                color: "#4285F4",
              },
              {
                title: "Full Stack Developer",
                company: "Microsoft",
                location: "Seattle, WA",
                salary: "$110K - $140K",
                type: "Full-time",
                logo: "https://i.pinimg.com/1200x/4d/62/51/4d625155d96d551da640fb03f6762be8.jpg",
                color: "#00a4ef",
              },
              {
                title: "Product Manager",
                company: "Apple",
                location: "Cupertino, CA",
                salary: "$130K - $160K",
                type: "Full-time",
                logo: "https://i.pinimg.com/1200x/a8/78/4a/a8784a597312d24e1b89a217be50d96f.jpg",
                color: "#A2AAAD",
              },
            ].map((job, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="h-1"
                  style={{ backgroundColor: job.color }}
                ></div>
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${job.color}20` }}
                        >
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <Typography
                            variant="subtitle1"
                            className="font-bold text-gray-900"
                          >
                            {job.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {job.company}
                          </Typography>
                        </div>
                      </div>
                      <Chip
                        label={job.type}
                        size="small"
                        style={{
                          backgroundColor: `${job.color}20`,
                          color: job.color,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      />
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <LocationOn
                          className="text-gray-400 mr-1"
                          fontSize="small"
                        />
                        <Typography variant="body2">{job.location}</Typography>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Payment
                          className="text-gray-400 mr-1"
                          fontSize="small"
                        />
                        <Typography variant="body2">{job.salary}</Typography>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <Typography variant="caption" className="text-gray-500">
                      Posted 2 days ago
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<ArrowForward fontSize="small" />}
                      style={{ color: job.color }}
                      className="hover:bg-gray-100"
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outlined"
              style={{ borderColor: "#0969da", color: "#0969da" }}
              className="px-4 py-2 rounded-md"
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Our streamlined process makes finding jobs or hiring talent quick
              and easy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-100 hidden md:block"></div>

            {[
              {
                title: "Create Your Profile",
                description:
                  "Sign up as a job seeker or employer and create your professional profile with all relevant details.",
                icon: <Add className="text-white" />,
                color: "#0969da",
                number: "01",
              },
              {
                title: "Explore Opportunities",
                description:
                  "Search for jobs or browse resumes of qualified candidates using our powerful filters.",
                icon: <Search className="text-white" />,
                color: "#2ea44f",
                number: "02",
              },
              {
                title: "Connect & Succeed",
                description:
                  "Apply to jobs or hire the perfect candidate for your position and track your progress.",
                icon: <Check className="text-white" />,
                color: "#bf3989",
                number: "03",
              },
            ].map((step, index) => (
              <div key={index} className="relative z-10">
                <Card
                  className="rounded-lg h-full transition-all duration-300 hover:shadow-lg"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold absolute -top-4 right-4"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>
                    <Typography
                      variant="h6"
                      component="h3"
                      className="font-bold mb-3"
                    >
                      {step.title}
                    </Typography>
                    <Typography className="text-gray-600 text-sm">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Platform Statistics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Our platform has helped millions of job seekers and employers
              connect and succeed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                number: "1M+",
                label: "Active Users",
                icon: <Person />,
                color: "#dbeafe",
                iconColor: "#0969da",
              },
              {
                number: "50K+",
                label: "Companies",
                icon: <BusinessCenter />,
                color: "#dcfce7",
                iconColor: "#2ea44f",
              },
              {
                number: "100K+",
                label: "Jobs Posted",
                icon: <BusinessCenter />,
                color: "#fef9c3",
                iconColor: "#d4a72c",
              },
              {
                number: "500K+",
                label: "Successful Hires",
                icon: <Check />,
                color: "#f3e8ff",
                iconColor: "#bf3989",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="rounded-lg text-center transition-all duration-300 hover:shadow-md"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: stat.color,
                }}
              >
                <CardContent className="p-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="text-2xl" style={{ color: stat.iconColor }}>
                      {stat.icon}
                    </div>
                  </div>
                  <Typography
                    variant="h4"
                    className="font-bold text-gray-900 mb-1"
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
              Job Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Explore jobs in these in-demand categories across various
              industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Information Technology",
                icon: <Devices />,
                count: "5,234 jobs",
                color: "#dbeafe",
                iconColor: "#0969da",
              },
              {
                name: "Healthcare",
                icon: <Person />,
                count: "3,456 jobs",
                color: "#dcfce7",
                iconColor: "#2ea44f",
              },
              {
                name: "Finance",
                icon: <Payment />,
                count: "2,567 jobs",
                color: "#fef9c3",
                iconColor: "#d4a72c",
              },
              {
                name: "Education",
                icon: <Person />,
                count: "1,890 jobs",
                color: "#f3e8ff",
                iconColor: "#bf3989",
              },
              {
                name: "Marketing",
                icon: <TrendingUp />,
                count: "2,345 jobs",
                color: "#ffedd5",
                iconColor: "#c2410c",
              },
              {
                name: "Engineering",
                icon: <Settings />,
                count: "3,210 jobs",
                color: "#dbeafe",
                iconColor: "#0969da",
              },
              {
                name: "Customer Service",
                icon: <Message />,
                count: "1,678 jobs",
                color: "#dcfce7",
                iconColor: "#2ea44f",
              },
              {
                name: "Sales",
                icon: <BusinessCenter />,
                count: "2,789 jobs",
                color: "#fef9c3",
                iconColor: "#d4a72c",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: category.color,
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: "white" }}
                    >
                      <div style={{ color: category.iconColor }}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <Typography
                        variant="subtitle2"
                        className="font-bold text-gray-900"
                      >
                        {category.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-700">
                        {category.count}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Card
            className="rounded-lg overflow-hidden transition-all duration-300"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(to right, #f0f9ff, #e0f2fe)",
            }}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-700 mb-6">
                Join thousands of professionals finding their dream jobs and
                companies hiring top talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="contained"
                  onClick={handleGetStarted}
                  style={{ backgroundColor: "#0969da" }}
                  className="px-6 py-2 rounded-md shadow-sm"
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  style={{ borderColor: "#0969da", color: "#0969da" }}
                  className="px-6 py-2 rounded-md"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Typography variant="h6" className="font-bold mb-4">
                JobPortal
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-4">
                Connecting talent with opportunity worldwide. Find your dream
                job or the perfect candidate.
              </Typography>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <GitHub />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <LinkedIn />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram />
                </a>
              </div>
            </div>

            <div>
              <Typography variant="subtitle1" className="font-bold mb-4">
                For Job Seekers
              </Typography>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Create Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Job Alerts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Career Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Typography variant="subtitle1" className="font-bold mb-4">
                For Employers
              </Typography>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Post Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Browse Resumes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Recruiting Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Typography variant="subtitle1" className="font-bold mb-4">
                Company
              </Typography>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Divider className="my-6 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <Typography variant="caption" className="text-gray-400">
              © 2025 JobPortal. All rights reserved.
            </Typography>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
