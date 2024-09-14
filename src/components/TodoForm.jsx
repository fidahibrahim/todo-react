import React from 'react'
import { useState } from 'react'
import { message }from "antd" ;

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('')
 
    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = /^[a-zA-Z0-9\s]+$/.test(value.trim());

        if (!value.trim()) {
            message.error('Task cannot be blank!');
        } else if (!isValid) {
            message.error('Task can only contain letters, numbers!');
        } else {
            const added = addTodo(value.trim());
            if(added){
                setValue('')
            }
        } 

    }


    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type='text' className='todo-input'
                value={value}
                placeholder='Outline your tasks for today.!'
                onChange={(e) => setValue(e.target.value)}
            />
            <button type='submit' className='todo-btn' > Add Task </button>
        </form>
    )
}

export default TodoForm
