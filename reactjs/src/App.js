import { createContext, useState } from "react";

import "./App.scss";
import Board from "./pages/Board";

export const OverlayContext = createContext();

function App() {
  const [isOverlay, setIsOverlay] = useState(true);

  function toggleOverlay() {
    setIsOverlay(!isOverlay);
  }

  const overlay = {
    isOverlay,
    toggleOverlay,
  };

  return (
    <OverlayContext.Provider value={overlay}>
      <div className="app-master">
        <Board />
      </div>
    </OverlayContext.Provider>
  );
}

export default App;
