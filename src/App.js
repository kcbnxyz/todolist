import { useState, useEffect, useReducer } from "react"
import Todo from "./Todo";

export const ACTIONS = {
  ADD: 'ADD',
  COMPLETE: 'COMPLETE',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  TOGGLE_ALL: 'TOGGLE_ALL',
  DELETE_COMPLETED: 'DELETE_COMPLETED'
}


function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState('')
  const [all, setAll] = useState(true)
  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [toggleall, setToggleAll] = useState(false)
  let showTask = null;
  
  if (all) {
    showTask = todos.map( todo => <Todo key={todos.id} todo={todo} dispatch={dispatch} />)
  } else if (active) {
    showTask = todos.map(todo => !todo.complete && <Todo key={todos.id} todo={todo} dispatch={dispatch} /> )
  } else if (completed) {
    showTask = todos.map(todo => todo.complete && <Todo key={todos.id} todo={todo} dispatch={dispatch} /> )
  }

  
  function reducer(todos, action) {
    switch(action.type) {
      case ACTIONS.ADD:
        return [...todos, newTask(action.payload.task)]
      case ACTIONS.COMPLETE:
        return (todos.map(todo => todo.id === action.payload.id ? {...todo, complete: !todo.complete} : todo ))
      case ACTIONS.DELETE:
        return (todos.filter(todo => todo.id !== action.payload.id))
      case ACTIONS.EDIT:
        return (todos.map(todo => todo.id === action.payload.id? {...todo, task:action.payload.task} : todo ))
      case ACTIONS.TOGGLE_ALL:
        return (todos.map(todo => ({...todo, complete:action.payload.complete})))
      case ACTIONS.DELETE_COMPLETED:
        return (todos.filter(todo => !todo.complete))
      default:
        return todos
    }
  }

  function newTask(task) {
    return {id:Date.now(), task:task, complete:false}
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({type: ACTIONS.ADD, payload: {task:task} })
    setTask('')
    setToggleAll(false)
  }

  function handleAll() {
    if (!all) {
      setAll(!all)
      setActive(false)
      setCompleted(false)
    } 
  }

  function handleActive() {
    if(!active) {
      setActive(!active)
      setAll(false)
      setCompleted(false)
    }
  }

  function handleCompleted() {
    if(!completed) {
      setCompleted(!completed)
      setAll(false)
      setActive(false)
    }
  }
  
  function handleToggleComplete() {
    dispatch({type: ACTIONS.TOGGLE_ALL, payload:{complete:!toggleall}})
    setToggleAll(!toggleall)
  }

  function handleDeleteCompleted() {
    dispatch({type: ACTIONS.DELETE_COMPLETED})
  }

  return (
    <div>
      <button style={{opacity: todos.length > 0 ? '1':'0', backgroundColor: toggleall && 'white'}} onClick={handleToggleComplete}>TOGGLE ALL</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={e => setTask(e.target.value)} />
      </form>
      {showTask}
      
      { todos.length >0 &&
        <div>
          <span>{todos.filter(todo => todo.complete === false).length} items left</span>
          <button style={{ backgroundColor: all && 'white'}} onClick={handleAll}>All</button>
          <button style={{ backgroundColor: active && 'white'}} onClick={handleActive} >Active</button>
          <button style={{ backgroundColor: completed && 'white'}} onClick={handleCompleted}>Complete</button>
          <button style={{opacity: todos.filter(todo => todo.complete).length > 0 ? '1':'0'}} onClick={handleDeleteCompleted} >Clear completed</button>
        </div>}
      
    </div>
  );
}

export default App;