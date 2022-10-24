import { useContext } from "react";
import DisplayContext from '../../context/display/context';
import HomeScreenMobile from "./mobile";
import HomeScreenDesktop from "./desktop";

const HomeScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);
  return (
    isMobileDisplay ? <HomeScreenMobile /> : <HomeScreenDesktop />
  );
}

export default HomeScene;