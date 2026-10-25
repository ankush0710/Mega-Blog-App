import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { Container, LogoutBtn, Logo } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate()
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Posts",
      url: "/add-posts",
      active: authStatus
    }
  ]
  return (
    <header>
      <Container >
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width="70px" />
            </Link>
          </div>
           <ul>
            {
              navItems.map((items) => 
              items.active ? (
                <li key={items.name}>
                  <button onClick={() => navigate(items.url)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{items.name}</button>
                </li>
              ): null
            )}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
           </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
