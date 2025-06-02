import React from 'react'
import AddUser from './components/AddUser'
import TotalUsersList from './components/TotalUsersList'
import { Route, Routes } from 'react-router-dom'

const MainRoute = () => {
  return (
    <>
      <Routes>
          <Route path='/' element={<AddUser/>}/>
          <Route path='/allUsers' element={<TotalUsersList/>}/>
      </Routes>
    </>
  )
}

export default MainRoute