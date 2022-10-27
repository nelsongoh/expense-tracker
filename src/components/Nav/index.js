import { useContext, useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import DisplayContext from "../../context/display/context";
import MobileNav from "./mobile";
import Constants from "../../constants";

const Navbar = () => {
  const { isMobileDisplay } = useContext(DisplayContext);
  const location = useLocation();
  const [currNavIdx, setCurrNavIdx] = useState(null);

  useEffect(() => {
    const currPath = location.pathname;
    if (
      currPath === Constants.PATHS.HOME ||
      currPath === Constants.PATHS.HOME_CREATE_EXPENSE
    ) {
      setCurrNavIdx(0);
    } else if (currPath === Constants.PATHS.CONFIG_ONE) {
      setCurrNavIdx(2);
    }
  }, [location.pathname]);

  // If this is exactly the root path, redirect to the Home scene
  if (location.pathname === Constants.PATHS.INDEX.ROOT) {
    return (
      <Navigate to={Constants.PATHS.HOME} replace />
    );
  }

  // TODO: Render the desktop version of the navigation
  return (
    isMobileDisplay ? (
      <MobileNav navValue={currNavIdx} /> 
    ): null
  );
}

export default Navbar;