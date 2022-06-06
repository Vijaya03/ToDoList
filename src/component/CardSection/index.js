import React, { Component, useState ,useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { todoAction } from '../../store/addTodo';
import {useForm} from 'react-hook-form';
import { nanoid } from 'nanoid';
import './index.css';
const CardSection = () =>{
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const onsubmit = (input) => {
        console.log(input.name)
        const id = nanoid();
        const name= input.name;
        const completed = false;
        dispatch(todoAction.addTodoData({
            id,
            name , 
            completed
        }))
    }
    return (
        <div className="card">
            <form onSubmit={handleSubmit(onsubmit)}>
                <label htmlFor="todoInput" className="hide-element">Type</label>
                <input className="inputField"type="text" {...register("name")} 
                   placeholder="Create a new todo.."
                   onKeyPress={event => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            onsubmit({"name":event.target.value});
                            event.target.value = "";
                        }
                    }}
              />
            </form>
        </div>
    )
}
export default CardSection;