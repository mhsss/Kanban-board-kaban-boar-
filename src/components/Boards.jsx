import { Board } from './Board'
import { useState, useEffect, memo } from 'react'
import style from './board.module.css'
import React from 'react'
import { Form } from './Form'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'



export const Boards = memo((props) => {

  let boardName = props.item
  let [boards, setBoardsCount] = useState([])


  useEffect(() => {
    setBoardsCount(JSON.parse(localStorage.getItem(JSON.stringify(boardName))) || boards)
  }, [])

  useEffect(() => {
    localStorage.setItem(JSON.stringify(boardName), JSON.stringify(boards))
  }, [boards])

  const boardAdd = (data) => {
    setBoardsCount([...boards, { id: Date.now(), title: data, cards: [] }])
  }

  const cardAdd = (data, index, time) => {
    boards[index].cards.push({ id: Date.now(), text: data, cardCreation: time })
    setBoardsCount([...boards])
    localStorage.setItem(JSON.stringify(boardName), JSON.stringify(boards))
  }

  const cardDescrAdd = (index, id, data, time) => {
    const card = boards[index].cards.find(card => card.id === id)
    card.descr = data
    card.descrCreation = time
    setBoardsCount([...boards])
  }

  const boardDel = (listIndex) => {
    boards.splice(listIndex, 1)
    setBoardsCount([...boards])
  }

  const cardDel = (listIndex, cardIndex) => {
    boards[listIndex].cards.splice(cardIndex, 1)
    setBoardsCount([...boards])
  }

  const onBoardAdd = (e) => {
    e.preventDefault()
    const data = e.target[1].value
    if (data) {
      boardAdd(data)
    }
    e.target.reset()
  }

  const boardEdit = (index, data) => {
    boards[index].title = data
    setBoardsCount([...boards])
  }

  const cardEdit = (index, id, data, time) => {
    const card = boards[index].cards.find(card => card.id === id)
    card.text = data
    card.descrCreation = time
    setBoardsCount([...boards])
    console.log(card)

  }

  //-  DRAG N DROP START

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (type === 'board') {
      const board = boards.splice(source.index, 1)
      boards.splice(destination.index, 0, ...board)
      setBoardsCount([...boards])
    }

    // source.droppableId = drpAblIdStart,
    // destination.droppableId = drpAblIdEnd,
    // source.index = drpAblIndStrt,
    // destination.index = drpAblIndEnd,
    // draggableId

    if (source.droppableId !== destination.droppableId) {
      const boardStart = boards.find(board => source.droppableId === String(board.id))
      const card = boardStart.cards.splice(source.index, 1)
      const boardEnd = boards.find(board => destination.droppableId === String(board.id))
      boardEnd.cards.splice(destination.index, 0, ...card)
      setBoardsCount([...boards])
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId !== 'id') {
        // const newBoards = [...boards]
        const board = boards.find(board => source.droppableId === String(board.id))
        const card = board.cards.splice(source.index, 1)
        board.cards.splice(destination.index, 0, ...card)
        console.log(board)
        setBoardsCount([...boards])
      }
    }
  }

  //-  DRAG N DROP END

  
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId='id' direction='horizontal' type='board'>
            {
              provided => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={style.app}>
                  {
                    boards.map((board, index) => <Board cardEdit={cardEdit} boardEdit={boardEdit} route={props.item}
                      cardDescrAdd={cardDescrAdd} cardDel={cardDel} cardAdd={cardAdd} boardDel={boardDel}
                      board={board} index={index} key={board.id} />)
                  }
                  <Form formStyle={style.form__style} textareaStyle={style.main__textarea}
                    buttonStyle={style.main__button} onSubmit={onBoardAdd} buttonText={'Add Board'} textarea={'Add Board'} />
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
})
