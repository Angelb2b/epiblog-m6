import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../MyNav/MyNav.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Assets/logo.png';

import React, { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { useSession } from '../../middlewares/ProtectedRoutes';
import { getAuthorById, getAuthors } from '../../Store/authorSlice';
const userSession = JSON.parse(localStorage.getItem('userLoggedIn'))

const MyNav = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authors.singleAuthor.authorById)
  const session = useSession()
  console.log(session)

  function logOut() {
    localStorage.removeItem('userLoggedIn')
    window.location.reload();
  }

  return (
    <Navbar
      expand="lg"
      className="bg-light"
      variant="light"
      sticky='top'
    >
      <Container className='container'>
        <Link style={{ textDecoration: 'none' }} to={'/'}>
        <Navbar.Brand><img src={logo} alt="logo Strive School" style={{height: '50px' }} /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to={'/authors'}>See the Authors</Nav.Link>
          </Nav>
          <Form className="d-flex">
            {!localStorage.getItem('userLoggedIn') ?
              <Button as={Link} to={`/login`} variant="info">Log In</Button> :
              <>
                <NavDropdown
                  title={<img style={{ width: '45px', height: '45px', borderRadius: '50px', border: 'solid 3px green' }} src={session.avatar || session.photos[0].value } />}
                  id="navbarScrollingDropdown"
                  className='mx-2'>
                    <NavDropdown.Item as={Link} to={`/dashboard/${session.id}`}>Your Dashboard</NavDropdown.Item>
                </NavDropdown>
                <Button onClick={() => logOut()} variant="outline-danger" >Logout</Button>
              </>
            }
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
