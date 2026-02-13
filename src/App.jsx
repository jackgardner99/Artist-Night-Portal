
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Portal } from './components/portal/Portal'

function App() {
  

  return (
    <Routes>
      <Route path='/' element={
        <Outlet />
      }>
        <Route index element={<Portal />}/>
      </Route>
    </Routes>
  )
}

export default App
