import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import './Nav.css'
import Session from '../Session/Session'

const useStyles = makeStyles({
  list: {
    width: '95vw',
    height: '100vh',
    color: 'white',
    backgroundColor: 'black',
    border: '3px solid rgba(168, 168, 168, 0.26)',
  },
})

export default function Nav() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    //! false
    left: false,
  })

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const navList = (side) => (
    <div
      className={classes.list}
      //   role='presentation'
      //   onClick={toggleDrawer(side, false)}
      //   onKeyDown={toggleDrawer(side, false)}
    >
      <List className='nav-items'>
        <img
          src='./under_construction-tape-png.png'
          alt='under_construction-tape'
          style={{width: '100%', position: 'absolute', opacity: '0.5', marginTop: '30vh'}}
        ></img>
        <div
          className='closeicon'
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <img src='./close.png' alt='close menu icon'></img>
        </div>

        <Session />
      </List>
    </div>
  )

  return (
    <div>
      <div onClick={toggleDrawer('left', true)} className='menuicon'>
        <img src='./menu.png' alt='menu icon'></img>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {navList('left')}
      </Drawer>
    </div>
  )
}
