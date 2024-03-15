import React from 'react';
import { useDrag } from 'react-dnd';
import { Item } from '../types';

interface Props {
  item: Item;
}

const ItemComponent: React.FC<Props> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { type: 'ITEM', id: item.id } as const,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`item ${isDragging ? 'dragging' : ''}`}>
      {item.content}
    </div>
  );
};

export default ItemComponent;
