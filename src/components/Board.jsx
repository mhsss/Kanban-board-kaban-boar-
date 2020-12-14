import style from '../components/board.module.css'
import React, { useState, memo } from 'react'
import { Card } from './Card'
import { Form } from './Form'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { DeleteFilled } from '@ant-design/icons'
import { PlusSquareOutlined } from '@ant-design/icons'

export const Board = memo((props) => {

    const cardAdd = props.cardAdd
    const cards = props.board.cards
    const boardIndex = props.index

    const [editMode, setEditMode] = useState(false)
    const [editBoardText, setEditBoardText] = useState(false)

    const onCardAdd = (e) => {
        e.preventDefault()
        const data = e.target[1].value
        if (data) {
            cardAdd(data, boardIndex, Date.now())
            setEditMode(false)
        }
        e.target.reset()
    }

    const onBoardDelete = () => {
        props.boardDel(boardIndex)
    }

    const onTextAdd = () => {
        setEditMode(true)
    }

    const boardEditMode = () => {
        setEditBoardText(true)
    }

    const onBoardTextEdit = (e) => {
        e.preventDefault()
        const data = e.target[1].value
        if (data) {
            props.boardEdit(boardIndex, data)
            setEditBoardText(false)
        }
    }


    return (
        <Draggable draggableId={String(props.board.id)} index={props.index} >
            {
                provided => (
                    <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(props.board.id)}>
                            {
                                (provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className={style.board__inner}>
                                        <div className={style.board__text_inner}>
                                            <div className={style.board__text_box} onClick={boardEditMode}>
                                                <p className={style.board__text}>{props.board.title}</p>
                                                {
                                                    editBoardText
                                                        ? <Form style={style.form} buttonStyle={style.editBoard__btn}
                                                            textarea={'type...'} onSubmit={onBoardTextEdit} buttonText={'Edit'} />
                                                        : null
                                                }
                                            </div>
                                            <h2 onClick={onBoardDelete} className={style.delBoard__btn}>
                                                <DeleteFilled style={{ fontSize: '25px', color: '#08c' }} />
                                            </h2>
                                        </div>

                                        {
                                            cards.map((card, index) => <Card cardEdit={props.cardEdit} route={props.route} board={props.board}
                                                cardDescrAdd={props.cardDescrAdd} setModalHide={props.setModalHide} cardDel={props.cardDel}
                                                card={card} index={index} key={card.id} boardIndex={boardIndex} />)
                                        }

                                        {editMode
                                            ? <Form buttonStyle={style.addCardEditMode__btn} formStyle={style.cardAdd__form}
                                                textareaStyle={style.addCard__textarea} buttonText={'Add Card'} onSubmit={onCardAdd} textarea={'Add Card'} />
                                            : <p className={style.addCard__btn} onClick={onTextAdd}>
                                                <PlusSquareOutlined style={{ fontSize: '25px', color: '#08c' }} />
                                            </p>
                                        }
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </div>
                )
            }
        </Draggable>
    )
})