import React, { memo, useState } from 'react'
import style from '../components/board.module.css'
import { Draggable } from 'react-beautiful-dnd'
import { ModalWindow } from './ModalWindow'
import { NavLink, Route } from 'react-router-dom'
import { DeleteFilled } from '@ant-design/icons'

export const Card = memo((props) => {

    const onCardDelete = () => {
        props.cardDel(props.boardIndex, props.index)
    }


    return (
        <div>
            <Draggable index={props.index} draggableId={String(props.card.id)}>
                {
                    provided => (
                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <NavLink to={`/board${props.route}/card${props.card.id}`}>
                                <div className={style.card__inner}>
                                    <p className={style.card__text}>
                                        {props.card.text}
                                    </p>
                                    <h3 onClick={onCardDelete} className={style.delCard__btn}>
                                        <DeleteFilled style={{ fontSize: '20px', color: '#08c' }} />
                                    </h3>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
            </Draggable>

            <Route path={`/board${props.route}/card${props.card.id}`} render={() => <ModalWindow
                cardEdit={props.cardEdit} route={props.route} cardDel={props.cardDel} board={props.board} card={props.card}
                index={props.index} boardIndex={props.boardIndex} cardDescrAdd={props.cardDescrAdd} />
            }
            />
        </div>
    )
})