import { memo } from "react";

import "./BoardBar.scss";

function BoardBar({ title }) {
  // console.log("Re-render ở Board bar");

  return (
    <nav className="navbar-board">
      {title}
      <i className="fa fa-star"></i>
    </nav>
  );
}

export default memo(BoardBar);
