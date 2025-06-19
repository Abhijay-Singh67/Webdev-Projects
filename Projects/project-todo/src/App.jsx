import { useState, useRef, useEffect } from "react"
import Navbar from "./components/Navbar"
import Todo from "./components/Todo"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState("")
  const inputRef = useRef(null);
  const [showFinished, setShowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let items = JSON.parse(localStorage.getItem("todos"));
      setTodos(items);
      console.log(items);
    }
  }, [])

  window.addEventListener("beforeunload", ()=>{
    saveToLS();
  })

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    let items = JSON.parse(localStorage.getItem("todos"));
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleDelete = (key) => {
    setTodos(todos.filter((value) => {
      return (value.id != key) ? (true) : (false);
    }))
    saveToLS();
  }
  const handleAdd = () => {
    if (!edit) {
      if (todo.trim().length > 0) {
        setTodos([...todos, { todo: todo.trim(), isCompleted: false, id: uuidv4() }]);
        setTodo("");
      }
    } else {
      if (todo.trim().length > 0) {
        const newTodos = [...todos]
        const item = newTodos.filter(i => i.id === editId)[0]
        newTodos[newTodos.indexOf(item)] = { todo: todo.trim(), isCompleted: item.isCompleted, id: editId }
        setTodos(newTodos);
        setTodo("");
        setEditID("");
        setEdit(false);
      } else {
        setTodos(todos.filter((value) => {
          return (value.id != editId) ? (true) : (false);
        }))
        setTodo("");
        setEditID("");
        setEdit(false);
      }
    }
    saveToLS();
  }
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }
  const handleEdit = (key) => {
    const item = todos.filter((value) => { return (value.id === key) ? (true) : (false) })
    setTodo(item[0].todo)
    setEdit(true);
    setEditID(item[0].id)
    inputRef.current.focus();
  }
  const handleComplete = (key) => {
    const newTodos = [...todos]
    const item = todos.filter((value) => { return (value.id === key) ? (true) : (false) })[0]
    newTodos[newTodos.indexOf(item)] = { todo: item.todo, isCompleted: !item.isCompleted, id: item.id }
    setTodos(newTodos);
    saveToLS();
  }
  return (
    <>
      <Navbar />
      <main>
        <div className="container  mx-auto my-5 w-[50vw] flex flex-col space-y-7 p-10 h-[80vh] rounded-2xl bg-[#E3E9FF] overflow-auto no-scrollbar">
          <h1 className="text-3xl font-bold text-center">iTask - Manage your todos at one place</h1>
          <h1 className="text-2xl font-bold">Add a Todo</h1>
          <div className="input flex justify-between space-x-5">
            <input ref={inputRef} type="text" onChange={handleChange} onKeyDown={handleEnter} value={todo} className="flex-grow rounded-full px-5" />
            <div onClick={() => { handleAdd(edit) }} className="add bg-customPurple w-max py-2 px-3 rounded-full text-white cursor-pointer">
              <h1 className='hover:text-purple-600 transition-colors'>Add</h1>
            </div>
          </div>
          <div className="finished flex space-x-3 items-center">
            <input type="checkbox" checked={showFinished} onChange={() => { setShowFinished(!showFinished) }} className='appearance-none w-5 h-5 border-2 border-gray-700 checked:bg-customPurple' />
            <h1>Show Finished</h1>
          </div>
          <div className="seperator w-4/5 h-[2px] bg-gray-300 self-center"></div>
          <div className="todos flex flex-col">
            <h1 className="text-2xl font-bold mb-5">Your Todos</h1>
            {todos.length === 0 && <div className="text-center">No Todos to display</div>}
            {(showFinished) ? (todos.map((item) => {
              return <Todo todo={item} onDelete={() => { handleDelete(item.id) }} onEdit={() => { handleEdit(item.id) }} onComplete={() => { handleComplete(item.id) }} key={item.id} />
            })) : todos.filter(i => i.isCompleted === false).map((item) => {
              return <Todo todo={item} onDelete={() => { handleDelete(item.id) }} onEdit={() => { handleEdit(item.id) }} onComplete={() => { handleComplete(item.id) }} key={item.id} />
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
