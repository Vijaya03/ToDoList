import React, { Component, useEffect, useState } from 'react';
import dataalready from './data.json'
export const DataContext = React.createContext([]);

export default function DataList(props) {
    console.log(dataalready)
    const [data,setData] = useState(dataalready);
    const [leftWork,setLeftWork] = useState(data.length)
 
    useEffect(()=>{
        console.log(data)
    },[data]);
    return (
        <DataContext.Provider value={
            { value: [data,setData], value2: [leftWork,setLeftWork] }}>
            {props.children}
        </DataContext.Provider>
    )
}