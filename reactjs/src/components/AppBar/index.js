import { memo } from "react";
import "./AppBar.scss";

function AppBar() {
  // console.log("Re-render ở App bar");

  return (
    <nav className="navbar-app">
      <i className="fa fa-trello"></i>Trello
    </nav>
  );
}

export default memo(AppBar);
