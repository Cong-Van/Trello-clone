import { useState, useRef, useEffect, memo } from "react";
import { MODAL_ACTION_DELETE } from "../../utils/constant";
import { mapOrder } from "../../utils/sorts";
import _isEqual from "lodash/isEqual";

import "./Column.scss";
import Card from "../Card/Card";
import ConfirmModal from "../Common/ConfirmModal";
import Dropdown from "react-bootstrap/Dropdown";

function Column({
  columnObj,
  getColumn,
  updateColumn,
  handleDeleteColumn,
  getCard,
  createNewCard,
  updateCard,
  deleteCard,
  ...props
}) {
  const [column, setColumn] = useState(columnObj);
  const [isShowAddCard, setIsShowAddCard] = useState(false);
  const [isEdittingColumnTitle, setIsEdittingColumnTitle] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const inputNewCardRef = useRef();
  const inputEditColumnTitleRef = useRef();

  const getAndSetColumn = async () => {
    const column = await getColumn(columnObj._id);
    setColumn(column);
  };

  const toggleEditColumnTitle = () => {
    setIsEdittingColumnTitle(!isEdittingColumnTitle);
  };

  const handleChangeColumnTitle = async (e) => {
    e.preventDefault();
    if (
      !inputEditColumnTitleRef ||
      !inputEditColumnTitleRef.current.value.trim()
    )
      return;
    const newTitle = inputEditColumnTitleRef.current.value.trim();
    const updatedColumn = { ...column };
    updatedColumn.title = newTitle;
    console.log(updatedColumn);

    toggleEditColumnTitle();
    await updateColumn(column._id, { title: newTitle });
    setColumn(updatedColumn);
  };

  const toggleShowAddCard = () => {
    setIsShowAddCard(!isShowAddCard);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!inputNewCardRef.current.value.trim()) return;

    const inputNewCard = inputNewCardRef.current;
    const newCardData = {
      title: inputNewCard.value.trim(),
      columnId: column._id,
      boardId: column.boardId,
    };
    await createNewCard(newCardData);

    // Update State
    await getAndSetColumn();
    inputNewCard.value = "";
    inputNewCard.focus();
  };

  const submitByEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCard(e);
    }
  };

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  const onConfirmModalDelete = async (type, columnId) => {
    if (type === MODAL_ACTION_DELETE) {
      await handleDeleteColumn(columnId);
    }
    toggleModal();
  };

  const handleDeleteCard = async (cardId, columnId, cardTitle) => {
    const isConfirmed = window.confirm(
      `Are you sure to delete Card "${cardTitle}"?`
    );

    if (!isConfirmed) {
      return;
    }
    const updatedColumn = await getColumn(columnId);
    updatedColumn.cardOrder = updatedColumn.cardOrder.filter(
      (id) => id !== cardId
    );
    console.log(updatedColumn.cardOrder, cardId, columnId);
    await deleteCard(cardId);
    await updateColumn(columnId, { cardOrder: updatedColumn.cardOrder });
    await getAndSetColumn();
  };

  useEffect(() => {
    if (isShowAddCard) inputNewCardRef.current.focus();
  }, [isShowAddCard]);

  useEffect(() => {
    if (isEdittingColumnTitle) {
      inputEditColumnTitleRef.current.focus();
      inputEditColumnTitleRef.current.select();
    }
  }, [isEdittingColumnTitle]);

  const cardList = mapOrder(column.cards, column.cardOrder, "_id");

  console.log(columnObj);

  useEffect(() => {
    setColumn(columnObj);
  }, [columnObj]);

  return (
    <>
      <div className="column" draggable {...props}>
        <header>
          <div className="column-title">
            {isEdittingColumnTitle ? (
              <form
                onSubmit={handleChangeColumnTitle}
                onBlur={toggleEditColumnTitle}
                onDragStart={(e) => e.preventDefault()}
              >
                <input
                  ref={inputEditColumnTitleRef}
                  defaultValue={column.title}
                />
              </form>
            ) : (
              <div onClick={toggleEditColumnTitle}>{column.title}</div>
            )}
          </div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Add card...</Dropdown.Item>
                <Dropdown.Item href="#">
                  Move all cards in this list
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  Remove all cards in this list
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={toggleModal}>
                  Remove this list
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>

        <ul className="card-list">
          {cardList?.length > 0 &&
            cardList.map((card) => {
              return (
                <Card
                  key={card._id}
                  data-id={card._id}
                  data-column-id={column._id}
                  cardObj={card}
                  onDelete={handleDeleteCard}
                  updateCard={updateCard}
                />
              );
            })}
        </ul>

        <footer>
          {isShowAddCard ? (
            <form onSubmit={(e) => handleAddCard(e)}>
              <textarea
                ref={inputNewCardRef}
                placeholder="Enter a title for this card..."
                onKeyDown={(e) => submitByEnter(e)}
              ></textarea>
              <div className="group-btn">
                <button type="submit">Add card</button>
                <i className="fa fa-times" onClick={toggleShowAddCard}></i>
              </div>
            </form>
          ) : (
            <div onClick={toggleShowAddCard}>
              <i className="fa fa-plus"></i>Add another card
            </div>
          )}
        </footer>
      </div>
      <ConfirmModal
        show={isShowModalDelete}
        title={"Remove a column"}
        content={`Are you sure to remove this column "${column.title}"`}
        onAction={(type) => onConfirmModalDelete(type, column._id)}
      />
    </>
  );
}

export default memo(Column, _isEqual);
