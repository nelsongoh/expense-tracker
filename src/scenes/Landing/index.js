import { useContext } from "react";
import DisplayContext from "../../context/display/context";
import RegisterForm from "../../components/Forms/Register";

const LandingScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);

  return (
    <RegisterForm isMobileDisplay={isMobileDisplay}/>
  );
}

export default LandingScene;