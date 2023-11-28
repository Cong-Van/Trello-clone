export const mockData = {
  board: {
    _id: "board-1",
    title: "Work list each day",
    columnOrder: ["column-2", "column-1", "column-3", "column-4"],
    columns: [
      {
        _id: "column-1",
        boardId: "board-1",
        title: "Todo 1",
        cardOrder: ["card-2", , "card-1"],
        cards: [
          {
            _id: "card-1",
            columnId: "column-1",
            title: "Title of card 1",
          },
          {
            _id: "card-2",
            columnId: "column-1",
            title: "Title of card 2",
          },
        ],
      },
      {
        _id: "column-2",
        boardId: "board-1",
        title: "Todo 2",
        cardOrder: ["card-5", "card-3", "card-6", "card-4"],
        cards: [
          {
            _id: "card-5",
            columnId: "column-2",
            title: "Title of card 5",
          },
          {
            _id: "card-3",
            columnId: "column-1",
            title: "Title of card 3",
          },
          {
            _id: "card-4",
            columnId: "column-2",
            title: "Title of card 4",
          },
          {
            _id: "card-6",
            columnId: "column-2",
            title: "Title of card 6",
          },
        ],
      },
      {
        _id: "column-4",
        boardId: "board-1",
        title: "Todo 4",
        cardOrder: ["card-13", "card-15"],
        cards: [
          {
            _id: "card-15",
            columnId: "column-4",
            title: "Title of card 15",
          },
          {
            _id: "card-13",
            columnId: "column-4",
            title: "Title of card 13",
          },
        ],
      },
      {
        _id: "column-3",
        boardId: "board-1",
        title: "Todo 3",
        cardOrder: ["card-8", "card-9", "card-10"],
        cards: [
          {
            _id: "card-8",
            columnId: "column-3",
            title: "Title of card 8",
          },
          {
            _id: "card-9",
            columnId: "column-3",
            title: "Title of card 9",
          },
          {
            _id: "card-10",
            columnId: "column-3",
            title: "Title of card 10",
          },
        ],
      },
    ],
  },
};
