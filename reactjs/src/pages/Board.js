import { useState, useEffect, useContext, useCallback } from "react";
// import { mockData } from "../apis/mockData";
import AppBar from "../components/AppBar";
import BoardBar from "../components/BoardBar";
import BoardContent from "../components/BoardContent/BoardContent";
import { OverlayContext } from "../App";

import { BOARD_ID } from "../utils/constant";
import {
  fetchBoardDetailsAPI,
  updateBoardAPI,
  fetchColumnDetailsAPI,
  creatNewColumnAPI,
  updateColumnAPI,
  deleteColumnAPI,
  fetchCardDetailsAPI,
  creatNewCardAPI,
  updateCardAPI,
  deleteCardAPI,
} from "../apis";

function Board() {
  const [board, setBoard] = useState();

  const { isOverlay } = useContext(OverlayContext);

  const getBoard = useCallback(async () => {
    const board = await fetchBoardDetailsAPI(BOARD_ID);
    return board;
  }, []);

  const updateBoard = useCallback(async (boardId, updateBoardData) => {
    const updatedBoard = await updateBoardAPI(boardId, updateBoardData);
    return updatedBoard;
  }, []);

  const getColumn = useCallback(async (columnId) => {
    const column = await fetchColumnDetailsAPI(columnId);
    return column;
  }, []);

  const createNewColumn = useCallback(async (newColumnData) => {
    const createdColumn = await creatNewColumnAPI(newColumnData);
    return createdColumn;
  }, []);

  const updateColumn = useCallback(async (columnId, updateColumnData) => {
    const updatedColumn = await updateColumnAPI(columnId, updateColumnData);
    return updatedColumn;
  }, []);

  const deleteColumn = useCallback((columnId) => {
    deleteColumnAPI(columnId);
  }, []);

  const getCard = useCallback(async (cardId) => {
    const card = await fetchCardDetailsAPI(cardId);
    return card;
  }, []);

  const createNewCard = useCallback(async (newCardData) => {
    const createdCard = await creatNewCardAPI({
      ...newCardData,
    });
    return createdCard;
  }, []);

  const updateCard = useCallback(async (cardId, updateCardData) => {
    const updatedCard = await updateCardAPI(cardId, updateCardData);
    return updatedCard;
  }, []);

  const deleteCard = useCallback((cardId) => {
    deleteCardAPI(cardId);
  }, []);

  useEffect(() => {
    fetchBoardDetailsAPI(BOARD_ID).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    board && (
      <>
        <AppBar />
        <BoardBar title={board.title} />
        <BoardContent
          boardObj={board}
          getBoard={getBoard}
          updateBoard={updateBoard}
          getColumn={getColumn}
          createNewColumn={createNewColumn}
          updateColumn={updateColumn}
          deleteColumn={deleteColumn}
          getCard={getCard}
          createNewCard={createNewCard}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
        <div className={`overlay ${isOverlay ? "hidden" : ""}`}></div>
      </>
    )
  );
}

export default Board;
