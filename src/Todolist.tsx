import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    callback: (filterInput: string) => void
}

export function Todolist(props: PropsType) {

    let [filterInput, setFilterInput] = useState('')

    const onClickHandler = () => {
        props.callback(filterInput)
        setFilterInput('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterInput(event.currentTarget.value)
    }
    const onKeypressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            return onClickHandler()
        }
    }

    const AllChandgeFilter = (name: FilterValuesType) => {
        return props.changeFilter(name)
    }
    const  deleteTask = (id:string) => {
        props.removeTask(id)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={filterInput} onChange={onChangeHandler} onKeyDown={onKeypressHandler}/>
            <button onClick={() => onClickHandler()}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return ( <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            deleteTask(t.id)
                        }}>x
                        </button>
                    </li>)})

            }
        </ul>
        <div>
            <button onClick={() => AllChandgeFilter("all")}>
                All
            </button>
            <button onClick={() => AllChandgeFilter("active")}>
                Active
            </button>
            <button onClick={() => AllChandgeFilter("completed")}>
                Completed
            </button>
        </div>
    </div>
}
