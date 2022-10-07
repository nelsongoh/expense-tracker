import { createContext } from "react";

const DisplayContext = createContext({ isMobileDisplay: false, setIsMobileDisplay: null });

export default DisplayContext;