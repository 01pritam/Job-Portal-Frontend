import React from 'react';

const Jobs = () => {
  const jobList = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechSpark Inc.',
      location: 'Bengaluru, India',
      type: 'Full-Time',
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Insight Labs',
      location: 'Remote',
      type: 'Part-Time',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'CloudNest',
      location: 'Pune, India',
      type: 'Full-Time',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">Available Jobs</h1>
      <div className="grid grid-cols-1 gap-5">
        {jobList.map((job) => (
          <div key={job.id} className="p-5 border rounded-md shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location} • {job.type}</p>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;