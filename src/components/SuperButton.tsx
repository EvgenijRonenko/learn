
type PropsType={
    title:string,
    callBack:()=>void
}

export const SuperButton=(props:PropsType)=>{
    const onClickHandler=()=>{
        props.callBack()
    }
    return(
        <button onClick={onClickHandler}>{props.title}</button>
    )
}