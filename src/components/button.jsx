import React from 'react'



export const Button = (props) => {
    return (
        <form onSubmit={props.onSubmit}> 
            <button>{props.buttonText}</button>
           <textarea />
        </form>
    )
}