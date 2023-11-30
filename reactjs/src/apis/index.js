import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Board
export const fetchBoardDetailsAPI = async (boarId) => {
  try {
    const response = await axios.get(`${API_ROOT}/boards/${boarId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateBoardAPI = async (boardId, updateBoardData) => {
  try {
    const response = await axios.put(
      `${API_ROOT}/boards/${boardId}`,
      updateBoardData
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Column
export const fetchColumnDetailsAPI = async (columnId) => {
  try {
    const response = await axios.get(`${API_ROOT}/columns/${columnId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const creatNewColumnAPI = async (newColumnData) => {
  try {
    const response = await axios.post(`${API_ROOT}/columns`, newColumnData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateColumnAPI = async (columnId, updateColumnData) => {
  try {
    console.log(columnId, updateColumnData);
    const response = await axios.put(
      `${API_ROOT}/columns/${columnId}`,
      updateColumnData
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteColumnAPI = (columnId) => {
  try {
    axios.delete(`${API_ROOT}/columns/${columnId}`);
  } catch (err) {
    console.log(err);
  }
};

// Card
export const fetchCardDetailsAPI = async (cardId) => {
  try {
    const response = await axios.get(`${API_ROOT}/cards/${cardId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const creatNewCardAPI = async (newCardData) => {
  try {
    const response = await axios.post(`${API_ROOT}/cards`, newCardData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCardAPI = async (cardId, updateCardData) => {
  try {
    console.log(cardId, updateCardData);
    const response = await axios.put(
      `${API_ROOT}/cards/${cardId}`,
      updateCardData
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCardAPI = (cardId) => {
  try {
    axios.delete(`${API_ROOT}/cards/${cardId}`);
  } catch (err) {
    console.log(err);
  }
};
