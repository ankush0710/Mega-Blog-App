import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth/authsService';
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(()=>{
      dispatch(logout());
    }).catch(){
      throw new Error("Something went wrong...");
    }
  }

  return (
    <div>
      <button onClick={()=>handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutBtn
