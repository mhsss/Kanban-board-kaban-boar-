import { useState, useEffect } from 'react'
import style from './components/board.module.css'
import React from 'react'
import { Boards } from './components/Boards'
import { Route, NavLink } from 'react-router-dom'
import { Form } from './components/Form'
import { withRouter } from 'react-router-dom'
import { DeleteFilled } from '@ant-design/icons'
import 'antd/dist/antd.css'



const App = withRouter((props) => {

  let [walls, setWalls] = useState([])

  useEffect(() => {
    setWalls(JSON.parse(localStorage.getItem('walls')))
  }, [])

  useEffect(() => {
    localStorage.setItem('walls', JSON.stringify(walls))
  }, [walls])

  const onWallAdd = (e) => {
    e.preventDefault()
    if (e.target[1].value) {
      setWalls([...walls, e.target[1].value])
      e.target.reset()
    }
  }

  const onWallDel = (index) => {
    walls.splice(index, 1)
    setWalls([...walls])
  }


  return (
    <div className={style.main__app}>

      <div>
        {(props.history.location.pathname === '/')
          ? <Route path='/' render={() => <NavLink to='/walls'> <h2>Add walls</h2> </NavLink>} />
          : <p className={style.backToWalls__link}> <NavLink to='/walls'> Walls </NavLink> </p>
        }

        {
          walls.map((item, index) => <Route key={index} path={`/board${item}`} render={() => <Boards item={item} key={index} />} />)
        }
      </div>


      <Route path={`/walls/`} render={() =>
        <Form onSubmit={onWallAdd} input={'Add ur wall'} wallAddInput={style.wallAdd__input} formStyle={style.wallAdd} buttonStyle={style.addWall__btn} />}
      />

      <div className={style.walls__inner}>
        <Route path={`/walls/`} render={() =>
          walls.map((item, index) => <div className={style.wall} key={index}>
            <>
              <p className={style.wallDel} onClick={() => onWallDel(index)}>
                <DeleteFilled style={{ fontSize: '20px', color: '#08c' }} />
              </p>
              <NavLink to={`board${item}`}>
                <div>
                  <p>Wall name : {item}</p>
                </div>
              </NavLink>
            </>
          </div>)
        } />
      </div>
    </div>
  )
})


export default App
