import React, { Component, useState, useContext } from 'react';
import { DataContext } from '../../Context';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import './index.css';
import cross from '../../images/icon-cross.svg';
const TodoList = () =>{
    const { value, value2 } = useContext(DataContext);
    const [data, setData] = value;
    const [checked,setChecked] = useState(false);
    const deleteitems = (id) =>{
        setData(data.filter(x=>x.id!=id));
    }
    const handleEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
      };
      const onDragEnd = (result)=> {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setData(items);
      }
        const getItemStyle = (isDragging, draggableStyle) => (
            {
        // some basic styles to make the items look a bit nicer
        background: isDragging ? "lightgreen": "var(--inputFieldBackgound)",
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
        // padding: grid * 2,
        // margin: `0 0 ${grid}px 0`,
        
        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
        });

        const getListStyle = (isDraggingOver) => ({
            background: isDraggingOver ? "lightgreen": "var(--inputFieldBackgound)",
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
        setData(updatedProjects);
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
                                <label className="container" >
                                    <input type="checkbox" onClick={()=>handleCheck(item.id,item.completed)   } />
                                    <span className="checkmark"></span>
                                </label> 
                               <span className="content" id ={ (item.completed ? 'uncheck' : '')} >{item.name}</span>
                               <span className="cross"><img src={cross} onClick={()=>deleteitems(item.id)}/></span> 
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
        // <div className="list-section">
        //     {data.map((items,index)=>(
        //         <div key={items.id}>
        //             <span>{items.name}</span>
        //             <span className="cross"><img src={cross} onClick={()=>deleteitem(items.id)}/></span>
        //         </div>
        //     ))}
        // </div>
    )
}
export default TodoList;