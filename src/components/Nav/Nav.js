import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
// import AnchorLink from 'react-anchor-link-smooth-scroll'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import './Nav.css'

const useStyles = makeStyles({
  list: {
    width: '20vw',
    height: '100vh',
    backgroundColor: 'rgba(234, 247, 247, 0.762)',
    backgroundImage: 'url(/binaryEmmaVanninen.png)',
    backgroundRepeat: 'repeat',
    backgroundSize: '100%'
  }
})

export default function Nav() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const navList = side => (
    <div
      className={classes.list}
      //   role='presentation'
      //   onClick={toggleDrawer(side, false)}
      //   onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <div
          className='closeMenu'
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          x{/* <img src='./cancel.png' alt='close menu icon'></img> */}
        </div>
        <ul className='nav-list'>
          <li>
            <RegisterForm />
          </li>
          <li>
            <LoginForm />
          </li>
        </ul>
      </List>
    </div>
  )

  return (
    <div>
      <div onClick={toggleDrawer('left', true)} className='menuicon'>
        MENU
        {/* <img src='./menu.png' alt='menu icon'></img> */}
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {navList('left')}
      </Drawer>
    </div>
  )
}
