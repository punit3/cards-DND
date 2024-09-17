import React, { useEffect, useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './dnd.module.css';
import "../../styles/card-list.css";
import { CardItem } from '../CardItem/CardItem';
import { Loader, Text } from '@mantine/core';

export function DndList() {
  const [listOne, setListOne] = useState<any[]>([]); 
  const [listTwo, setListTwo] = useState<any[]>([]);
  const [changed, setChanged] = useState(false); 
  const [isSaving, setIsSaving] = useState(false); 
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data');
        const data = await response.json();

       
        const splitIndex = Math.ceil(data.length / 2);
        setListOne(data.slice(0, splitIndex));
        setListTwo(data.slice(splitIndex));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const saveData = useCallback(async () => {
    if (!changed) return; 

    setIsSaving(true);

   
    setTimeout(async () => {
      try {
        const updatedData = [...listOne, ...listTwo]; 

        const response = await fetch('/data/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          setChanged(false); 
          setLastSavedTime(Date.now()); 
        } else {
          console.error('Failed to save data:', await response.text());
        }
      } catch (error) {
        console.error('Error saving data:', error);
      } finally {
        setIsSaving(false);
      }
    }, 2000); 
  }, [changed, listOne, listTwo]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveData(); 
    }, 5000);

    return () => clearInterval(interval);
  }, [saveData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSavedTime) {
        const secondsPassed = Math.floor((Date.now() - lastSavedTime) / 1000);
        
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [lastSavedTime]);

  const updateSequentialPositions = (updatedListOne: any[], updatedListTwo: any[]) => {
    const combinedList = [...updatedListOne, ...updatedListTwo];

    combinedList.forEach((item, index) => {
      item.position = index + 1; 
    });

    const splitIndex = updatedListOne.length;
    setListOne(combinedList.slice(0, splitIndex));
    setListTwo(combinedList.slice(splitIndex));
  };

  const handleDragEnd = ({ source, destination }: any) => {
    if (!destination) return;

    const sourceList = source.droppableId === 'listOne' ? listOne : listTwo;
    const destinationList = destination.droppableId === 'listOne' ? listOne : listTwo;

    if (source.droppableId === destination.droppableId) {
      const reorderedList = Array.from(sourceList);
      const [movedItem] = reorderedList.splice(source.index, 1);
      reorderedList.splice(destination.index, 0, movedItem);

      if (source.droppableId === 'listOne') {
        updateSequentialPositions(reorderedList, listTwo);
      } else {
        updateSequentialPositions(listOne, reorderedList);
      }
    } else {
      const sourceCopy = Array.from(sourceList);
      const [movedItem] = sourceCopy.splice(source.index, 1);
      const destinationCopy = Array.from(destinationList);
      destinationCopy.splice(destination.index, 0, movedItem);

      if (source.droppableId === 'listOne') {
        updateSequentialPositions(sourceCopy, destinationCopy);
      } else {
        updateSequentialPositions(destinationCopy, sourceCopy);
      }
    }

    setChanged(true); 
  };

  const renderItems = (list: any[]) => (
    list.map((item, index) => (
      <Draggable key={item.title} index={index} draggableId={item.title}>
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
              flex: '1 0 ',
              margin: '10px',
              justifyContent: "center"
            }}
          >
            <CardItem title={item.title} imageUrl={item.image} position={item.position} />
          </div>
        )}
      </Draggable>
    ))
  );

  return (
    <div>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Droppable droppableId="listOne">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                minHeight: '200px',
                padding: '10px',
              }}
            >
              {renderItems(listOne)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="listTwo">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                minHeight: '200px',
                padding: '10px',
              }}
            >
              {renderItems(listTwo)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>

    {/* Show loading spinner when saving */}
    {isSaving && (
      <div className="spinner-container">
        <div className="spinner">
          <Loader />
          <div>Saving...</div>
        </div>
      </div>
    )}

   
    {lastSavedTime && (
      <Text>
        Time since last save: {Math.floor((Date.now() - lastSavedTime) / 1000)} seconds
      </Text>
    )}
  </div>
  );
}