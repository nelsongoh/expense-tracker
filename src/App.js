import { Routes, Route } from 'react-router-dom';
import Constants from './constants';
import LandingScene from './scenes/Landing';

const App = () => {
  return (
    <Routes>
      <Route path={Constants.PATHS.INDEX} element={<LandingScene />} />
    </Routes>
  );
}

export default App;
