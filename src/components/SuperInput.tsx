import React, {ChangeEvent} from 'react';

type PropsType={
    setInputTitle:(inputTitle:string)=>void
    inputTitle:string
}

export const SuperInput = (props:PropsType) => {
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
       props.setInputTitle(event.currentTarget.value)
    }
    return (
        <input value={props.inputTitle} onChange={onChangeHandler}/>
    );
};
