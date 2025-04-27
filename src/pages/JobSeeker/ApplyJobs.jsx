// src/App.jsx
import React from 'react';
import { 
  Button,
  IconButton, 
  Chip,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Favorite as FavoriteIcon,
  Event as EventIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Check as CheckIcon
} from '@mui/icons-material';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Button 
          variant="contained" 
          color="primary" 
          className="min-w-[100px]" 
          endIcon={<KeyboardArrowDownIcon />}
        >
          Jobs
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
        >
          Salary (High to Low)
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
          startIcon={<FilterListIcon />}
        >
          <Badge badgeContent={4} color="primary">
            Filters
          </Badge>
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
          endIcon={<KeyboardArrowDownIcon />}
        >
          Location
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
          endIcon={<KeyboardArrowDownIcon />}
        >
          Work Type
        </Button>
        
        <Button 
          variant="outlined"
          color="inherit" 
          className="bg-white"
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Badge badgeContent={1} color="primary">
            User Type
          </Badge>
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Badge badgeContent={1} color="primary">
            Domain
          </Badge>
        </Button>
        
        <Button 
          variant="outlined" 
          color="inherit" 
          className="bg-white"
          endIcon={<KeyboardArrowDownIcon />}
        >
          Category
        </Button>
        
        <div className="flex-grow"></div>
        
        <Button 
          variant="outlined" 
          color="success" 
          startIcon={<CheckIcon />}
          className="bg-white"
        >
          Quick Apply
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Job Cards */}
        <div className="md:col-span-1 space-y-4">
          {/* Job Card 1 */}
          <div className="bg-white p-4 rounded shadow relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white text-xs">
                <img src="/api/placeholder/48/48" alt="Blitz Tech" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-xs text-gray-500 mb-1">Job</div>
                <h3 className="text-blue-500 font-semibold">Recruitment & Talent Acquisition Associate</h3>
                <div className="text-gray-700">Blitz Tech Solutions</div>
                <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                  <PersonIcon fontSize="small" />
                  <span>4,448 Applied</span>
                  <AccessTimeIcon fontSize="small" className="ml-2" />
                  <span>5 days left</span>
                </div>
                <div className="mt-2">
                  <Button variant="outlined" size="small" className="text-gray-500 rounded-full">
                    All
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Card 2 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white text-xs">
                <img src="/api/placeholder/48/48" alt="Blitz Tech" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-xs text-gray-500 mb-1">Job</div>
                <h3 className="text-gray-800 font-semibold">Finance & Accounts Executive</h3>
                <div className="text-gray-700">Blitz Tech Solutions</div>
                <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                  <PersonIcon fontSize="small" />
                  <span>1,203 Applied</span>
                  <AccessTimeIcon fontSize="small" className="ml-2" />
                  <span>2 days left</span>
                </div>
                <div className="mt-2">
                  <Button variant="outlined" size="small" className="text-gray-500 rounded-full">
                    All
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Card 3 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-400">
                <img src="/api/placeholder/48/48" alt="Neelam" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-xs text-gray-500 mb-1">Job</div>
                <h3 className="text-gray-800 font-semibold">Customer Service Representative</h3>
                <div className="text-gray-700">Neelam</div>
                <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                  <PersonIcon fontSize="small" />
                  <span>446 Applied</span>
                  <AccessTimeIcon fontSize="small" className="ml-2" />
                  <span>8 months left</span>
                </div>
                <div className="mt-2">
                  <Button variant="outlined" size="small" className="text-gray-500 rounded-full">
                    All
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Card 4 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white border flex items-center justify-center">
                <img src="/api/placeholder/48/48" alt="SIP Check" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-xs text-gray-500 mb-1">Job</div>
                <h3 className="text-gray-800 font-semibold">Back End Developer</h3>
                <div className="text-gray-700">SIP Check</div>
                <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                  <PersonIcon fontSize="small" />
                  <span>2,036 Applied</span>
                  <AccessTimeIcon fontSize="small" className="ml-2" />
                  <span>5 days left</span>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Button variant="outlined" size="small" className="text-gray-500 rounded-full">
                    Engineering Students
                  </Button>
                  <Button variant="outlined" size="small" className="text-gray-500 rounded-full">
                    MBA Students
                  </Button>
                  <span className="text-gray-500 text-sm flex items-center">+2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Card 5 */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white border flex items-center justify-center">
                <img src="/api/placeholder/48/48" alt="SIP Check" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-xs text-gray-500 mb-1">Job</div>
                <h3 className="text-gray-800 font-semibold">Front End Developer</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Job Details */}
        <div className="md:col-span-2 space-y-4">
          {/* Job Header */}
          <div className="bg-white p-6 rounded shadow">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-black flex items-center justify-center text-white">
                <img src="/api/placeholder/64/64" alt="Blitz Tech" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800">Recruitment & Talent Acquisition Associate</h2>
                <div className="text-lg">Blitz Tech Solutions</div>
                <div className="text-gray-600 mt-2 flex items-center">
                  <EventIcon fontSize="small" className="mr-1" />
                  <span>Updated On: Apr 16, 2025</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <IconButton>
                  <EventIcon />
                </IconButton>
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                className="px-8"
              >
                Quick Apply
              </Button>
            </div>
          </div>

          {/* Job Stats */}
          <div className="bg-white p-6 rounded shadow flex justify-between">
            <div className="flex items-center">
              <PersonIcon className="text-gray-500 mr-3" />
              <div>
                <div className="text-gray-500">Applied</div>
                <div className="text-xl font-semibold">4,448</div>
              </div>
            </div>
            <div className="flex items-center">
              <AccessTimeIcon className="text-gray-500 mr-3" />
              <div>
                <div className="text-gray-500">Application Deadline</div>
                <div className="text-xl font-semibold">5 days left</div>
              </div>
            </div>
            <div className="flex items-center">
              <VisibilityIcon className="text-gray-500 mr-3" />
              <div>
                <div className="text-gray-500">Impressions</div>
                <div className="text-xl font-semibold">83,822</div>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white p-6 rounded shadow">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold">Eligibility</h3>
            </div>
            <div className="mt-4 flex items-center">
              <PersonIcon className="text-gray-500 mr-2" />
              <span>Everyone can apply</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white p-6 rounded shadow">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold">Job Description</h3>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Overview:</h4>
              <p className="mt-2">
                We are looking for a <span className="italic">Junior HR Recruiter</span> who is enthusiastic about helping people find the right job opportunities. This role is ideal for someone who is just starting out in the recruitment space and wants to grow their career by learning the end-to-end hiring process in a dynamic and supportive environment.
              </p>
              
              <h4 className="font-semibold mt-4">Responsibilities:</h4>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Assist in sourcing candidates through job portals, social media, and referrals.</li>
                <li>Screen resumes and conduct initial telephonic interactions to assess candidate fit.</li>
                <li>Coordinate interviews and follow-ups between candidates and hiring managers.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;