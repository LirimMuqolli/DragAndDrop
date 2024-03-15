import React from "react";
import { useDrop } from "react-dnd";
import ItemComponent from "./ItemComponent";
import { Card, Item } from "../types";

interface Props {
  card: Card;
  items: Item[];
  onDrop: (itemId: number, cardId: number) => void;
}

const CardComponent: React.FC<Props> = ({ card, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: any) => onDrop(item.id, card.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const cardTitleClass = `card-title card-${card.id}`;
  return (
    <div className="card-container">
      <div ref={drop} className={`card ${isOver ? "hover" : ""}`}>
        <h3 className={cardTitleClass}>Card {card.id}</h3>
        <div className="items">
          {card.items.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default CardComponent;
