import { configureStore } from '@reduxjs/toolkit';

import todoData from './addTodo';

const store = configureStore({
    reducer:{addData: todoData.reducer}
})

export default store;
