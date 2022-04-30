import React, { Component, useState, useContext, useEffect } from 'react';
import './index.css';
import { DataContext } from '../../Context';
const AlterList = () =>{
    const { value, value2 } = useContext(DataContext);
    const [data, setData] = value;
    const [leftWork,setLeftWork] = value2;
    
    useEffect(()=>{
        let length = data.length;
        data.map((x)=>x.completed === true ? length-- : length);
        setLeftWork(length)
    },[data])
    return (
       <div className="footer">
            <span className="left_items"> {leftWork} items left</span>
            <div className="action">
                <span className="all">All</span>
                <span className="active">Active</span>
                <span className="completed">Completed</span>
            </div>
            
            <span className="clear_completed">Clear Completed</span>
        </div>
    )
}
export default AlterList;