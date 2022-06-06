import React, { Component, useState, useEffect } from 'react';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';
import { todoAction } from '../../store/addTodo';
import cross from '../../images/icon-cross.svg';
import dataalready from '../../data.json';
import './index.css';
const TodoList = () =>{
    const data = useSelector((state)=> state.addData.items);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(todoAction.reArrange(dataalready))
        dispatch(todoAction.updatingDummyData(dataalready))
    },[]);
      const onDragEnd = (result)=> {
        if (!result.destination) {
          return;
        }
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        dispatch(todoAction.reArrange(items))
        dispatch(todoAction.updatingDummyData(items))
      }
        const getItemStyle = (isDragging, draggableStyle) => (
            {
        background: isDragging ? "linear-gradient(hsl(192, 100%, 67%) , hsl(280, 87%, 65%))": "var(--inputFieldBackgound)",
        color:"var(--textColor)",
        width:"100%",
        minHeight:"50px",
        userSelect: "none",
        display:"grid",
        alignItems: "center",
        gridTemplateRows:"1fr",
        gridTemplateColumns:"50px 1fr 50px",
        gridTemplateAreas:"'radio content cross'",
        borderBottom:".2px solid var(--borderBottom)" ,
        "&:hover + .cross": {
            opacity: 1
          },
          "&:focus":{
            outline:"5px solid white"
          },
        ...draggableStyle
        });

        const getListStyle = (isDraggingOver) => ({
            background: isDraggingOver ? "linear-gradient(hsl(192, 100%, 67%) , hsl(280, 87%, 65%))": "var(--inputFieldBackgound)",
            width: "100%",
            minHeight:"301px",
            display:"flex",
            flexDirection:"column",
            overflowY:"auto",
            border:"none",
            
        });
      const handleCheck = (id,completed) =>{
        const objIndex = data.findIndex(x => x.id === id);
        const updatedObj = { ...data[objIndex], completed:completed ? false:true};
        const updatedProjects = [
            ...data.slice(0, objIndex),
            updatedObj,
            ...data.slice(objIndex + 1),
        ];
        dispatch(todoAction.reArrange(updatedProjects))
        dispatch(todoAction.updatingDummyData(updatedProjects))
      }
    return (
        <div className="list-section">
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                {data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            <label aria-label={item.id}  tabindex="0" className="container" >
                                <input type="checkbox" id={item.id} defaultChecked={item.completed} onClick={()=>handleCheck(item.id,item.completed)   } />
                                <span className="checkmark"></span>
                            </label> 
                           <span className="content" id ={ (item.completed ? 'uncheck' : '')} >{item.name}</span>
                           <span className="cross"><img src={cross} alt="delete" onClick={()=>dispatch(todoAction.deleteItems(item.id))}/></span> 
                        </div>
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
                </div>
            )}
            </Droppable>
        </DragDropContext>
</div>
    )
}
export default TodoList;