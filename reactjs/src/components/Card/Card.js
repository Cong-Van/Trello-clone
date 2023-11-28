import { useRef, useState, useContext, useEffect } from "react";
import "./Card.scss";

import { OverlayContext } from "../../App";

function Card({ cardObj, updateCard, onDelete, ...props }) {
  const [isEditCard, setIsEditCard] = useState(false);
  const [card, setCard] = useState(cardObj);

  const inputCardRef = useRef();

  const { toggleOverlay } = useContext(OverlayContext);

  const toggleEditCard = () => {
    setIsEditCard(!isEditCard);
    toggleOverlay();
  };

  const handleChangeCardTitle = async (e) => {
    e.preventDefault();
    const inputCard = inputCardRef.current;
    if (!inputCard.value.trim()) return;
    const newCard = { ...card };
    newCard.title = inputCard.value.trim();
    await updateCard(card._id, { title: newCard.title });
    setCard(newCard);
    toggleEditCard();
  };

  useEffect(() => {
    if (isEditCard) inputCardRef.current.focus();
  }, [isEditCard]);

  return (
    <div className="task-card" draggable {...props}>
      {isEditCard && (
        <form
          className={`form-edit-card ${isEditCard ? "display" : ""}`}
          onSubmit={(e) => handleChangeCardTitle(e)}
        >
          <input ref={inputCardRef} defaultValue={card.title} />
          <button type="submit" onClick={(e) => handleChangeCardTitle(e)}>
            Save
          </button>
        </form>
      )}
      <li onClick={toggleEditCard}>{card.title}</li>
      <i
        className="fa fa-trash"
        onClick={() => onDelete(card._id, card.columnId, card.title)}
      ></i>
    </div>
  );
}

export default Card;
