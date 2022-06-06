import React, { Component, useState,useMemo, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './index.css';
import { todoAction } from '../../store/addTodo';
const AlterList = () =>{
    // const length = useSelector((state)=> state.addData.listCount);
    const lengthRemaining = useSelector((state)=> state.addData.listCount);
    const dummyData = useSelector((state)=> state.addData.dummyData);
    const dispatch = useDispatch();
    const handleAll = () =>{
        dispatch(todoAction.reArrange(dummyData)) ;
    }
    const handleComplete = () =>{
        const duplicateData = [...dummyData];
        const updatedData = duplicateData.filter((item)=>item.completed )
        dispatch(todoAction.reArrange(updatedData));
    }
    const handleActive = () =>{
        const duplicateData = [...dummyData];
        const updatedData = duplicateData.filter((item)=>!item.completed )
        dispatch(todoAction.reArrange(updatedData)) ;
    }
    const handleClearCompleted = () =>{
        const duplicateData = [...dummyData];
        const updatedData = duplicateData.filter((item)=>!item.completed )
        dispatch(todoAction.updatingDummyData(updatedData)) ;
        dispatch(todoAction.reArrange(updatedData)) ;
    }
    return (
        <div className="footer">
            <span className="left_items">
             {lengthRemaining}&nbsp;items left
             </span>
            <div className="action">
                <button className="all" tabindex="0" onClick={handleAll} >All</button>
                <button className="active" tabindex="0" onClick={handleActive}>Active</button>
                <button className="completed" tabindex="0" onClick={handleComplete}>Completed</button>
            </div>
            <button className="clear_completed" tabindex="0" onClick={handleClearCompleted}>Clear Completed</button>
        </div>
    )
}
export default AlterList;