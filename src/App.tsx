import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Temperature from './Temperature';
import { useEffect } from "react";


function App() {

  return (
    <div className="App">
      <Temperature />
    </div>
  )
}

export default App
