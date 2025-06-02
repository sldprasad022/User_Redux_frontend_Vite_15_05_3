import { ToastContainer } from 'react-toastify'
import './App.css'
import MainRoute from './MainRoute'

function App() {

  return (
    <>
    <ToastContainer position='top-right' autoClose={3000}/>
      <MainRoute/>
    </>
  )
}

export default App
