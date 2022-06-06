import { createSlice } from '@reduxjs/toolkit';

const todoData = createSlice({
    name:"addData",
    initialState:{
        dummyData:[],
        items:[],
        listCount:0
    },
    reducers:{
        remainingWork(state,action){
            let length = state.dummyData.length;
            if(state.dummyData){
                state.dummyData.map((item)=>{
                    if(item.completed){
                        length--;
                    }
                })
            }
            state.listCount = length;
        },
        deleteItems(state,action){
            state.items = state.items.filter((item)=>item.id!=action.payload);
            let length = state.dummyData.length;
            if(state.dummyData){
                state.dummyData.map((item)=>{
                    if(item.completed){
                        length--;
                    }
                })
            }
            state.dummyData = [...state.items];
            state.listCount = length;
        },
        updatingDummyData(state,action){
            state.dummyData = [...action.payload];
            let length = state.dummyData.length;
            if(state.dummyData){
                state.items.map((item)=>{
                    if(item.completed){
                        length--;
                    }
                })
            }
            state.listCount = length;
        },
        reArrange(state,action){
            state.items = action.payload;
            let length = state.dummyData.length;
            if(state.dummyData){
                state.items.map((item)=>{
                    if(item.completed){
                        length--;
                    }
                })
            }
            state.listCount = length;
        },
        addTodoData(state,action){
            const newItem = action.payload;
            const existingItem = state.items.find((item)=> item.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    completed: newItem.completed
                })
                let length = state.dummyData.length;
                if(state.dummyData){
                    state.dummyData.map((item)=>{
                        if(item.completed){
                            length--;
                        }
                    })
                }
                state.dummyData = [...state.items];
                state.listCount = length;
            }
            else{
                return
            }
        }
    }
})
export const todoAction = todoData.actions;
export default todoData;
