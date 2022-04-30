import React, { Component, useState, useContext } from 'react';
import { DataContext } from '../../Context';
import {useForm} from 'react-hook-form';
import { nanoid } from 'nanoid';
import './index.css';
const CardSection = () =>{
    const { value, value2 } = useContext(DataContext);
    const [data, setData] = value;
    const {register,handleSubmit} = useForm();
    const onSubmit = (input) => {
        const id = nanoid();
        setData([...data, { id, name: input.name , completed:false }])
    }
    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="inputField"type="text" {...register("name")} 
                   placeholder="Create a new todo.."
                   onKeyPress={event => {
                        if (event.key === 'Enter') {
                            onSubmit();
                        }
                    }}
              />
                {/* <input type="submit" value="Add"/> */}
            </form>
        </div>
    )
}
export default CardSection;