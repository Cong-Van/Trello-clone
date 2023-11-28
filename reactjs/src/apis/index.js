import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Board
export const fetchBoardDetailsAPI = async (boarId) => {
  const response = await axios.get(`${API_ROOT}/boards/${boarId}`);
  return response.data;
};

export const updateBoardAPI = async (boardId, updateBoardData) => {
  const response = await axios.put(
    `${API_ROOT}/boards/${boardId}`,
    updateBoardData
  );
  return response.data;
};

// Column
export const fetchColumnDetailsAPI = async (columnId) => {
  const response = await axios.get(`${API_ROOT}/columns/${columnId}`);
  return response.data;
};

export const creatNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/columns`, newColumnData);
  return response.data;
};

export const updateColumnAPI = async (columnId, updateColumnData) => {
  console.log(columnId, updateColumnData);
  const response = await axios.put(
    `${API_ROOT}/columns/${columnId}`,
    updateColumnData
  );
  console.log(response.data);
  return response.data;
};

export const deleteColumnAPI = (columnId) => {
  axios.delete(`${API_ROOT}/columns/${columnId}`);
};

// Card
export const fetchCardDetailsAPI = async (cardId) => {
  const response = await axios.get(`${API_ROOT}/cards/${cardId}`);
  return response.data;
};

export const creatNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/cards`, newCardData);
  return response.data;
};

export const updateCardAPI = async (cardId, updateCardData) => {
  console.log(cardId, updateCardData);
  const response = await axios.put(
    `${API_ROOT}/cards/${cardId}`,
    updateCardData
  );
  return response.data;
};

export const deleteCardAPI = (cardId) => {
  axios.delete(`${API_ROOT}/cards/${cardId}`);
};
