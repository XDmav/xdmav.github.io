import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [
                { id: '3', content: '3 task' },
            ],
        },
        done: {
            name: 'Done',
            items: [],
        },
        blocked: {
            name: 'Blocked',
            items: [
                { id: '4', content: 'Четыре task' },
            ],
        },
    });

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });                                    
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    const removeItem = (droppableId, draggableId) => {
        const sourceColumn = columns[droppableId];

        setColumns({
            ...columns,
            [droppableId]:{
                ...sourceColumn,
                items: sourceColumn.items.filter((item) => item.id !== draggableId)
            }
        })
    }

    let nav = useNavigate();
    const redir = () => {
        nav("/")
    }
    
    return (
        <div>
            <button onClick={redir}>Главная страница</button>
            <div style={{
                display: 'flex', justifyContent: 'center',  
                height: '100%'
            }}>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], _index) => {
                    return (
                    <div
                        className='list_of_lists'
                        key={columnId}>
                        
                        <h2>{column.name}</h2>

                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='list'
                                    style={{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                    }}>
                                    {column.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => {
                                                return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='list_item'
                                                    style={{
                                                        userSelect: 'none',
                                                        backgroundColor: snapshot.isDragging
                                                            ? '#263B4A'
                                                            : '#456C86',
                                                        ...provided.draggableProps.style,
                                                    }}>
                                                    {item.content}
                                                    <button style={{display: ("block")}} onClick={() => removeItem(columnId, item.id)}>Remove</button>
                                                </div>);
                                            }}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>);
                            }}
                        </Droppable>
                    </div>);
                })}
            </DragDropContext>
            </div>
        </div>
    );
}

export default DndPage;