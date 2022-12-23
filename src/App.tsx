import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SuperButton} from "./components/SuperButton";
import {SuperInput} from "./components/SuperInput";


type PropsType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

function App() {

    const [data, setData] = useState<PropsType[]>([])
    const [inputTitle, setInputTitle] = useState<string>('')
    console.log(data)


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setData(json))
    }

    const removeData = () => {
        setData([])
    }

    const addNewData = () => {
        const newData= {userId: 666, id: data.length+1, title: inputTitle, completed: false}
        setData([newData, ...data])
        setInputTitle('')
    }


    return (
        <div className="App">
            <div>
                <SuperInput setInputTitle={setInputTitle} inputTitle={inputTitle}/>
                <SuperButton title={'Add new data'} callBack={addNewData}/>
            </div>

            <div>
                <SuperButton title={"Show me data"} callBack={getData}/>
                <SuperButton title={"Remove data"} callBack={removeData}/>
            </div>

            <ul>
                {data.map(el => {
                    return (
                        <li key={el.id}>
                            <span>{el.id} - </span>
                            <span>{el.title}</span>
                            <input type={'checkbox'} checked={el.completed}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
