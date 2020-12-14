import React, { useState } from 'react'
import style from '../components/board.module.css'
import { withRouter } from 'react-router-dom'
import { DeleteFilled } from '@ant-design/icons'
import { Form } from './Form'

export const ModalWindow = withRouter((props) => {

    const [descrCreation, setDescrCreation] = useState(Date.now() - props.card.descrCreation)
    const [editCardText, setEditCardText] = useState(false)

    const onModalHide = () => {
        props.history.push(`/board${props.route}`)
    }

    const onCardDescrAdd = (e) => {
        e.preventDefault()
        const data = e.target[1].value
        if (data) {
            props.cardDescrAdd(props.boardIndex, props.card.id, data, Date.now())
            setDescrCreation(Date.now() - props.card.descrCreation)
            e.target.reset()
        }
    }

    const onModalCardDel = () => {
        props.cardDel(props.boardIndex, props.index)
    }

    const cardEdit = () => {
        setEditCardText(true)
    }

    const onCardTextChange = (e) => {
        e.preventDefault()
        const data = e.target[1].value
        if (data) {
            setEditCardText(false)
            props.cardEdit(props.boardIndex, props.card.id, data, Date.now())
            setDescrCreation(Date.now() - props.card.descrCreation)
            e.target.reset()
        }

    }

    const time = new Date(props.card.cardCreation)
    const minutes = Math.floor((descrCreation / 1000 / 60) << 0)


    return (
        <div className={style.modalWindow} onClick={onModalHide}>
            <div className={style.modalWindow__content} onClick={e => e.stopPropagation()}>
                <div onClick={onModalCardDel} className={style.modalDel__btn}>
                    <DeleteFilled style={{ fontSize: '30px', color: '#08c' }} />
                </div>
                <p>board : {props.board.title}</p>
                <p>Creation time : {time.toLocaleString()}</p>

                <div className={style.modalCard__inner}>
                    <h3 onClick={cardEdit} className={style.shortDescr}>Card text : {props.card.text}</h3>
                    {editCardText
                        ? <Form textareaStyle={style.modalTextarea} formStyle={style.modal__form}
                            buttonStyle={style.modalEdit__btn} onSubmit={onCardTextChange} textarea={'Edit'} buttonText={'Edit'} />
                        : null
                    }
                </div>

                <p className={style.fullDescr}>Card description : {props.card.descr}</p>

                <Form textareaStyle={style.modalTextarea} buttonStyle={style.modalEdit__btn} formStyle={style.modal__form}
                    buttonText={props.card.descr ? 'Edit' : 'Add'}
                    textarea={props.card.descr ? 'Description' : 'Full Description'}
                    onSubmit={onCardDescrAdd} />

                <p>{props.card.descr
                    ? `has been changed ${minutes} minutes ago`
                    : null}
                </p>
            </div>
        </div>
    )
})