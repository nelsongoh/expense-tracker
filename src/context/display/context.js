import { createContext } from "react";

const DisplayContext = createContext({ 
  isMobileDisplay: false, 
  setIsMobileDisplay: null,
  maxContentHeight: null,
  setMaxContentHeight: null,
});

export default DisplayContext;