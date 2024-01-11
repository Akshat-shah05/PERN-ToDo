/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'

const ListTodos = () => {

    const [todos, setTodos] = useState([])

    // DELETE FUNCTION

    const deleteTodo = async (id) => {
        console.log(id)
        try {
            const deleteTodo = await fetch(`http://localhost:3001/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTodos = async() => {
        try {
            
            const response = await fetch('http://localhost:3001/todos')
            const jsonData = await response.json()

            setTodos(jsonData)
            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

   return (
    <>
        <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>*/}
                    {/* ADD KEY Later */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td> 
                        <td>Edit</td>
                        <td>
                            <button 
                                className="btn btn-danger" 
                                onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ListTodos