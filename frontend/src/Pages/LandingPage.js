// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';
// import axios from 'axios';
// import MapComponent from '../components/MapComponent';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [location, setLocation] = useState('');

//   const handleFindMechanic = () => {
//     if (location) {
//       console.log('Searching for mechanics in:', location);
//       // Navigate to mechanic results page or implement search logic here
//     }
//   };

//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <h1>FixiGo</h1>
//         </div>
//         <div className="navbar-links">
//           <button className="btn" onClick={() => navigate('/signup')}>Sign Up</button>
//           <button className="btn" onClick={() => navigate('/login')}>Log In</button>
//           <button className="btn" onClick={handleFindMechanic}>Find Mechanic</button>
//         </div>
//       </nav>

//       <section className="middle-section">
//         <h2>Your Trusted Mechanic Finder</h2>
//         <p>FixiGo helps you find verified mechanics near your location. Book online and get your car serviced right at your doorstep!</p>
//         <div className="find-mechanic">
//           <input 
//             type="text" 
//             placeholder="Enter your location" 
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <button className="btn find-btn" onClick={handleFindMechanic}>Find Mechanic</button>
//         </div>
//       </section>

//       <section className="testimonials">
//         <h3>What Our Users Say</h3>
//         <div className="testimonial-card">
//           <p>"FixiGo saved me during an emergency. The mechanic arrived within 30 minutes and fixed my car quickly!"</p>
//           <span>- Sarmaa</span>
//         </div>
//         <div className="testimonial-card">
//           <p>"The best car service platform! I was able to book a mechanic without leaving my home."</p>
//           <span>-pakee</span>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import axios from 'axios';
import MapComponent from '../components/MapComponent';

const LandingPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const handleFindMechanic = async () => {
    if (location) {
      try {
        const response = await axios.get(`http://localhost:5000/api/mechanics`, { params: { location } });

        if (response.data.length > 0) {
          setMapCenter({ lat: response.data[0].location.lat, lng: response.data[0].location.lng });
          setShowMap(true);
        }
        console.log('Found mechanics:', response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    }
  };

  // LandingPage.js



  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>FixiGo</h1>
        </div>
        <div className="navbar-links">
          <button className="btn" onClick={() => navigate('/signup')}>Sign Up</button>
          <button className="btn" onClick={() => navigate('/login')}>Log In</button>
        </div>
      </nav>

      <section className="middle-section">
        <h2>Your Trusted Mechanic Finder</h2>
        <p>FixiGo helps you find verified mechanics near your location. Book online and get your car serviced right at your doorstep!</p>
        <div className="find-mechanic">
          <input 
            type="text" 
            placeholder="Enter your location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn find-btn" onClick={handleFindMechanic}>Find Mechanic</button>
        </div>
      </section>

      {showMap && <MapComponent center={mapCenter} mechanics={mechanics} />}

      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonial-card">
          <p>"FixiGo saved me during an emergency. The mechanic arrived within 30 minutes and fixed my car quickly!"</p>
          <span>- Sarmaa</span>
        </div>
        <div className="testimonial-card">
          <p>"The best car service platform! I was able to book a mechanic without leaving my home."</p>
          <span>- Pakee</span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
