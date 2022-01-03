import React from 'react'
import { useState } from 'react'
import { ACTIONS } from './App'


export default function Todo({ todo, dispatch }) {
    const [toggleEdit, setToggleEdit] = useState(false)
    const [taskEdit, setTaskEdit] = useState(todo.task)


    function handleEdit(e) {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }

    function handleSubmitEdit(e) {
        e.preventDefault();
        dispatch({type: ACTIONS.EDIT, payload: {id: todo.id, task: taskEdit}})
        setToggleEdit(!toggleEdit)
    }

    return (
        <div>
            <button onClick={() => dispatch({type: ACTIONS.COMPLETE, payload: {id: todo.id}})} >COMPLETE</button>

            {toggleEdit ? 
                <form onSubmit={handleSubmitEdit}>
                    <input type="text" value={taskEdit} onChange={e => setTaskEdit(e.target.value)} />
                </form>
                : <span onDoubleClick={handleEdit} style={{color: todo.complete ? 'grey':'black'}}>{todo.task}</span>
            
            }
            

            <button onClick={() => dispatch({type: ACTIONS.DELETE, payload: {id: todo.id}})} >DELETE</button>
        </div>
    )
}
