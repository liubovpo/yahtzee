import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div>
      <header>

      </header>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/game' element={<SignupPage />} />
        <Route path='/score' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
