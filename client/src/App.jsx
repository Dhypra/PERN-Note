import { Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import NewNote from '../components/NewNote'
import Detail from '../components/Detail'
import Home from '../components/Home'
import About from '../components/About'
import NotFound from '../components/NotFound'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/newNote' element={<NewNote />}/>
        <Route path='/api/note/edit/:id' element={<NewNote />}/>
        <Route path='/api/note/details/:id' element={<Detail />}/>
        <Route path='/about' element={<About />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    
    </>
  )
}

export default App
