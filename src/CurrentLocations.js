import { useLocation } from 'react-router-dom';

const CurrentLocation = ({ children }) => {
  const location = useLocation();
  
  console.log(location.pathname); // outputs currently active route
  return children;
};

export default CurrentLocation;