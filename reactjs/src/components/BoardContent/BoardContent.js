import { useState, useRef, memo, useCallback } from "react";

import "./BoardContent.scss";
import Column from "../Column/Column";
import AddColumn from "../AddColumn/AddColumn";
import { mapOrder } from "../../utils/sorts";

function BoardContent({
  boardObj,
  getBoard,
  updateBoard,
  getColumn,
  createNewColumn,
  updateColumn,
  deleteColumn,
  getCard,
  createNewCard,
  updateCard,
  deleteCard,
}) {
  console.log("Re-render ở Board content");

  const [board, setBoard] = useState(boardObj);

  const draggingElement = useRef();
  const replaceColumn = useRef();

  const getAndSetBoard = async () => {
    const board = await getBoard();
    setBoard(board);
  };

  const handleAddNewColumn = useCallback(async (newColumnTitle) => {
    const newColumnData = {
      title: newColumnTitle,
      boardId: board._id,
    };
    await createNewColumn(newColumnData);

    // Cập nhật State
    await getAndSetBoard();
  }, []);

  const handleDeleteColumn = useCallback(async (columnId) => {
    const board = await getBoard();
    const updatedBoard = { ...board };
    updatedBoard.columns = updatedBoard.columns.filter(
      (col) => col._id !== columnId
    );
    updatedBoard.columnOrder = updatedBoard.columnOrder.filter(
      (id) => id !== columnId
    );
    await deleteColumn(columnId);
    await updateBoard(board._id, { columnOrder: updatedBoard.columnOrder });
    console.log(updatedBoard.columnOrder);
    setBoard(updatedBoard);
  }, []);

  const handleDragStart = (e) => {
    draggingElement.current = e.target;
    draggingElement.current.classList.add("is-dragging");
    draggingElement.clone = e.target.cloneNode(true);
  };

  const handleDragOverColumn = (e) => {
    e.preventDefault();
    const columnUnder = e.target.closest(".column");
    if (!columnUnder) return;
    // Xử lý khi kéo Card trong Column
    if (draggingElement.clone.classList.contains("task-card")) {
      const cardListEl = columnUnder.querySelector(".card-list");
      if (
        !cardListEl.contains(draggingElement.clone) ||
        e.target.closest("footer") ||
        e.target.classList.contains("column")
      )
        cardListEl.appendChild(draggingElement.clone);
      if (e.target.closest("header")) {
        cardListEl.insertBefore(draggingElement.clone, cardListEl.firstChild);
      }
      return;
    } else {
      // Xử lý khi kéo Column
      if (draggingElement.current === columnUnder) return;
      const columnUnderPos = columnUnder.getBoundingClientRect();
      const curPosition = { x: e.clientX, y: e.clientY };
      replaceColumn.id = columnUnder.getAttribute("data-id");
      const boardEl = e.target.closest(".board-columns");
      if (curPosition.x - columnUnderPos.x < columnUnder.clientWidth / 2) {
        replaceColumn.pos = "before";
        boardEl.insertBefore(draggingElement.current, columnUnder);
      } else {
        replaceColumn.pos = "after";
        boardEl.insertBefore(draggingElement.current, columnUnder.nextSibling);
      }
    }
  };

  const handleDragOverCard = (e) => {
    e.preventDefault();
    if (draggingElement.clone.classList.contains("column")) return;
    const cardListEl = e.target.closest(".card-list");
    const cardUnder = e.target.closest(".task-card");
    if (!cardListEl || !cardUnder || draggingElement.current === cardUnder) {
      draggingElement.current.style.display = "none";
      return;
    }
    if (!cardListEl.contains(draggingElement.clone))
      cardListEl.appendChild(draggingElement.clone);
    const cardUnderPos = cardUnder.getBoundingClientRect();
    const curPosition = { x: e.clientX, y: e.clientY };
    if (curPosition.y - cardUnderPos.y < cardUnder.clientHeight / 2) {
      cardListEl.insertBefore(draggingElement.clone, cardUnder);
    } else {
      const nextCardUnder = cardUnder.nextSibling;
      if (!nextCardUnder || !cardListEl.contains(draggingElement.clone)) {
        cardListEl.appendChild(draggingElement.clone);
      }
      cardListEl.insertBefore(draggingElement.clone, nextCardUnder);
    }
  };

  const handleDragOver = (e) => {
    handleDragOverColumn(e);
    handleDragOverCard(e);
  };

  const handleDropColumn = async () => {
    const columnId = draggingElement.current.getAttribute("data-id");
    if (!replaceColumn.id) return;
    const board = await getBoard();
    console.log(board.columnOrder);
    const updatedBoard = { ...board };
    const oldOrderIndex = board.columnOrder.findIndex((id) => id === columnId);
    updatedBoard.columnOrder.splice(oldOrderIndex, 1);
    let newOrderIndex = board.columnOrder.findIndex(
      (id) => id === replaceColumn.id
    );
    if (replaceColumn.pos === "after") {
      newOrderIndex++;
    }
    updatedBoard.columnOrder.splice(newOrderIndex, 0, columnId);
    updateBoard(board._id, { columnOrder: updatedBoard.columnOrder });
    setBoard(updatedBoard);
    replaceColumn.id = null;
  };

  const updateOldColumn = async (columnId, cardId) => {
    console.log("update old column");
    const board = await getBoard();
    const updatedColumn = {
      ...board.columns.find((column) => column._id === columnId),
    };
    updatedColumn.cardOrder = updatedColumn.cardOrder.filter(
      (id) => id !== cardId
    );
    await updateColumn(columnId, { cardOrder: updatedColumn.cardOrder });
  };

  const updateNewColumn = async (columnId, cardId, nextCard) => {
    console.log("update new column");
    const board = await getBoard();
    const updatedColumn = {
      ...board.columns.find((column) => column._id === columnId),
    };
    if (!nextCard) updatedColumn.cardOrder.push(cardId);
    else {
      const newOrderIndex = updatedColumn.cardOrder.findIndex(
        (id) => id === nextCard.dataset.id
      );
      updatedColumn.cardOrder.splice(newOrderIndex, 0, cardId);
    }
    await updateColumn(columnId, { cardOrder: updatedColumn.cardOrder });
    await updateCard(cardId, { columnId: columnId });
  };

  const updateOnlyOneColumn = async (columnId, cardId, nextCard) => {
    console.log("Update 1 column: ", columnId, nextCard);
    const board = await getBoard();
    // Update data and State
    const cardListEl = draggingElement.current.parentNode;
    draggingElement.current.style.display = "flex";
    const updatedColumn = board.columns.find(
      (column) => column._id === columnId
    );

    console.log(updatedColumn);
    const oldOrderIndex = updatedColumn.cardOrder.findIndex(
      (id) => id === cardId
    );
    updatedColumn.cardOrder.splice(oldOrderIndex, 1);
    if (!nextCard) {
      updatedColumn.cardOrder.push(cardId);
      cardListEl.appendChild(draggingElement.current);
    } else {
      const newOrderIndex = updatedColumn.cardOrder.findIndex(
        (id) => id === nextCard.dataset.id
      );
      updatedColumn.cardOrder.splice(newOrderIndex, 0, cardId);
      cardListEl.insertBefore(draggingElement.current, nextCard);
    }
    await updateColumn(columnId, { cardOrder: updatedColumn.cardOrder });
  };

  const handleDropCard = async () => {
    if (!draggingElement.clone.classList.contains("task-card")) return;
    const columnEl = draggingElement.clone.closest(".column");
    const oldColumnId = draggingElement.clone.dataset.columnId;
    const newColumnId = columnEl.dataset.id;
    const nextCard = draggingElement.clone.nextSibling;
    const cardId = draggingElement.clone.dataset.id;

    if (oldColumnId === newColumnId) {
      await updateOnlyOneColumn(oldColumnId, cardId, nextCard);
    } else {
      await updateOldColumn(oldColumnId, cardId);
      await updateNewColumn(newColumnId, cardId, nextCard);
    }
    await getAndSetBoard();
  };

  const handleDrop = async () => {
    if (draggingElement.clone.classList.contains("column"))
      await handleDropColumn();
    else await handleDropCard();
  };

  const handleDragEnd = useCallback(() => {
    draggingElement.current.classList.remove("is-dragging");
    draggingElement.clone.remove();
    draggingElement.clone = null;
  }, []);

  const columns = mapOrder(board.columns, board.columnOrder, "_id");

  return (
    <>
      <div
        className="board-columns"
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns?.length > 0 &&
          columns.map((column) => {
            return (
              <>
                <Column
                  key={column._id}
                  columnObj={column}
                  data-id={column._id}
                  getColumn={getColumn}
                  updateColumn={updateColumn}
                  handleDeleteColumn={handleDeleteColumn}
                  getCard={getCard}
                  createNewCard={createNewCard}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                />
              </>
            );
          })}
        <AddColumn handleAddNewColumn={handleAddNewColumn} />
      </div>
    </>
  );
}

export default memo(BoardContent);
