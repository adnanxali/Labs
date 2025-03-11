import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Sec } from './components/Sec'
import { Third } from './components/Third'
import { Fourth } from './components/Fourth'
import { Six } from './components/Six'
import { Fifith } from './components/Fifth'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/1'></Route>
          <Route path='/2' element={<Sec></Sec>}></Route>
          <Route path='/3' element={<Third/>}></Route>
          <Route path='/4' element={<Fourth/>}></Route>
          <Route path='/5' element={<Fifith/>}></Route>
          <Route path='/6' element={<Six/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
