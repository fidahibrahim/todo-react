import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
import { message } from 'antd'
uuidv4()

const TodoWrapper = () => {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos')
        return storedTodos ? JSON.parse(storedTodos) : []
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (todo) => {
        const isDuplicate = todos.some(t=> t.task.toLowerCase() === todo.toLowerCase())
        if(isDuplicate){
            message.error('Task already exists!')
            return false
        }else{
            setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }])
            console.log(todos);
            message.success('New Task Listed');
            return true
        }
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                if (!todo.completed) {
                    message.success('You Completed A Task');
                }
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    };


    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        message.success('Task Deleted!')
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo))
    }

    const sortedTodos = todos.slice().sort((a, b) => a.completed - b.completed)
    return (
        <div className='TodoWrapper' >
            <h1>  Get Things Done </h1>
            < TodoForm addTodo={addTodo} />
            {sortedTodos.map((todo, index) => (
                todo.isEditing ? (< EditTodoForm editTodo={editTask} task={todo} />) :
                    (
                        < Todo task={todo} key={index}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo} />
                    )
            ))}

        </div>
    )
}

export default TodoWrapper
