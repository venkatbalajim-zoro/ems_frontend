import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import LoginPage from './pages/login'
import HomePage from './pages/home'
import NotFoundPage from './pages/not_found'
import RegisterPage from './pages/register'
import RecoveryPage from './pages/recovery'
import AddDepartmentPage from './pages/add_dept'
import UploadCSVPage from './pages/upload_csv'
import AddEmployeePage from './pages/add_employee'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/recover' element={<RecoveryPage/>}/>
      <Route path='/add-department' element={< AddDepartmentPage/>} />
      <Route path='/update-department' element={< AddDepartmentPage/>} />
      <Route path='/upload-csv' element={< UploadCSVPage/>} />
      <Route path='/add-employee' element={< AddEmployeePage/>} />
      <Route path='/update-employee' element={< AddEmployeePage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
