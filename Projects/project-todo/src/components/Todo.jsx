import React, { useState } from 'react'

const Todo = ({todo,onDelete, onEdit, onComplete}) => {
    return (
        <div className='todo flex space-x-3 justify-between items-center p-1 hover:bg-[#d8e5fc] rounded-xl'>
            <div className="content flex space-x-3 items-center">
                <input type="checkbox" checked={todo.isCompleted} onChange={onComplete} className='appearance-none w-3 h-3 border-2 border-gray-700 rounded-full checked:bg-customPurple' />
                <h1 className={todo.isCompleted ? "line-through text-red-400" : ""}>{todo.todo}</h1>
            </div>
            <div className="buttons flex space-x-2">
                <div onClick={onEdit} className="add bg-customPurple w-max py-2 px-3 rounded-full text-white cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white hover:text-purple-600 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                </div>
                <div onClick={onDelete} className="add bg-customPurple w-max py-2 px-3 rounded-full text-white cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white hover:text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 011-1h4a1 1 0 011 1m-7 0h8"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Todo