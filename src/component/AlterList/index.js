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
                <span className="all" onClick={handleAll} >All</span>
                <span className="active" onClick={handleActive}>Active</span>
                <span className="completed" onClick={handleComplete}>Completed</span>
            </div>
            <span className="clear_completed" onClick={handleClearCompleted}>Clear Completed</span>
        </div>
    )
}
export default AlterList;