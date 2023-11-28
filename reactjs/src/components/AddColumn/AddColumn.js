import { useState, useRef, useEffect, memo } from "react";

import "./AddColumn.scss";

function AddColumn({ handleAddNewColumn }) {
  console.log("Re-render ở Add Column");

  const [isShowAddColumn, setIsShowAddColumn] = useState(false);

  const inputNewColumnRef = useRef();

  const toggleShowAddColumn = () => {
    setIsShowAddColumn(!isShowAddColumn);
  };

  const addNewColumn = async (e) => {
    e.preventDefault();
    if (!inputNewColumnRef.current.value.trim()) return;
    const inputColumnTitle = inputNewColumnRef.current;
    await handleAddNewColumn(inputColumnTitle.value.trim());
    inputColumnTitle.value = "";
    inputColumnTitle.focus();
  };

  useEffect(() => {
    if (isShowAddColumn && inputNewColumnRef) inputNewColumnRef.current.focus();
  }, [isShowAddColumn]);

  return (
    <>
      {isShowAddColumn ? (
        <div className="content-add-column">
          <form onSubmit={addNewColumn}>
            <input
              type="text"
              ref={inputNewColumnRef}
              placeholder="Add a title for the column..."
            />
            <div className="group-btn">
              <button type="submit">Add list</button>
              <i className="fa fa-times" onClick={toggleShowAddColumn}></i>
            </div>
          </form>
        </div>
      ) : (
        <div className="add-new-column" onClick={toggleShowAddColumn}>
          <i className="fa fa-plus"></i> Add another column
        </div>
      )}
    </>
  );
}

export default memo(AddColumn);
