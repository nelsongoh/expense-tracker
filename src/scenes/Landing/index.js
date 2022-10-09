import { useContext } from "react";
import DisplayContext from "../../context/display/context";
import AuthForm from "../../components/Forms/Auth";

const LandingScene = () => {
  const { isMobileDisplay } = useContext(DisplayContext);

  return (
    <AuthForm isMobileDisplay={isMobileDisplay} />
  );
}

export default LandingScene;