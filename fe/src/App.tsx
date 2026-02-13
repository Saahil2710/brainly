import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashborad } from './pages/Dashboard'
import SignUp  from './pages/Signup'
import  SignIn  from './pages/Signin'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard" element={<Dashborad/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
