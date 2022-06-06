import React, { Component, useState } from 'react';
import './index.css';
import moon from '../../images/icon-moon.svg';
import sun from '../../images/icon-sun.svg';
import useLocalstorage from 'use-local-storage';
import CardSection from '../CardSection';
import TodoList from '../TodoList';
import AlterList from '../AlterList';
const MainPage = () =>{
    const [toggleButton,setToggle] = useState(moon)
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalstorage('theme', defaultDark ? 'dark' : 'light');
    function setToggleFn(){
        const changed = theme === 'light' ? 'dark' : 'light';
        setTheme(changed);
        setToggle(changed === 'light' ? moon : sun);
    }
    return (
            <div className="main-content" data-theme = {theme}>
                <div className="cover">
                    <div className="header_container">
                            <h1 className="header">TODO</h1>
                            <span className="toggle" onClick={setToggleFn}>
                                <img src={toggleButton} alt=""/>
                            </span>
                    </div>
                </div>
                <div className="card-section">
                        <CardSection></CardSection>
                        <TodoList></TodoList>
                        <AlterList></AlterList>
                </div>
                <div className="instruction">
                    <p className="instruct">Drag and Drop to reorder list</p>
                </div>
            </div>
    )
}
export default MainPage;