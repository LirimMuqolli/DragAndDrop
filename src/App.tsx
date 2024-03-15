import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardComponent from "./components/CardComponent";
import { Card, Item } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    const storedItems = localStorage.getItem("items");

    if (storedCards && storedItems) {
      setCards(JSON.parse(storedCards));
      setItems(JSON.parse(storedItems));
    } else {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((data) => {
        const { cards, items } = data;
        console.log("Fetched cards:", cards);
        console.log("Fetched items:", items);
        setCards(cards);
        setItems(items);

        // Store fetched data in localStorage
        localStorage.setItem("cards", JSON.stringify(cards));
        localStorage.setItem("items", JSON.stringify(items));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDrop = (itemId: number, cardId: number) => {
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        if (!card.items.some((item) => item.id === itemId)) {
          return {
            ...card,
            items: [...card.items, items.find((i) => i.id === itemId)!],
          };
        }
      } else {
        return {
          ...card,
          items: card.items.filter((item) => item.id !== itemId),
        };
      }
      return card;
    });
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="container">
          {cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              items={card.items}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
