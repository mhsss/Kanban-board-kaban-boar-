import React from 'react'
import { EditFilled,CheckOutlined } from '@ant-design/icons';
import TextareaAutosize from 'react-textarea-autosize'
import style from './board.module.css'


export const Form = (props) => {

    return (
        <form className={props.formStyle} onSubmit={props.onSubmit}>
            {
                (props.buttonText === "Edit")
                    ? <button className={style.wrappBtn + ' ' + props.buttonStyle}>
                        <EditFilled style={{ fontSize: '25px', color: '#08c' }} className={props.buttonStyle} />
                    </button>
                    : <button className={style.wrappBtn + ' ' + props.buttonStyle}>
                        <CheckOutlined style={{ fontSize: '25px', color: '#08c' }} className={props.buttonStyle}/>
                    </button>
            }
            {/* <button className={props.buttonStyle}>{props.buttonText}</button> */}
            {props.textarea ?
                <TextareaAutosize className={props.textareaStyle} placeholder={props.textarea} />
                : null}
            {props.input ? <input className={props.wallAddInput} placeholder={props.input} /> : null}
            
        </form>
    )
}