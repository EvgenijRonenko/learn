import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');
    const errorMessageStyles = {color: 'red', margin: 0}
    const errorMessage = <p style={errorMessageStyles}>'Please, enter title'</p>
    const inputClasses= error ? 'inputError' : undefined
    return <div>
        <h3>{props.title} </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={inputClasses}
            />
            <button onClick={addTask}>+</button>
            {error && errorMessage}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
                    const isDoneClasses = t.isDone ? 'isDone' : 'notIsDone'

                    return <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeTaskStatus}/>
                        <span className={isDoneClasses}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'activeFilter' : undefined} onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'activeFilter' : undefined}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'activeFilter' : undefined}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
