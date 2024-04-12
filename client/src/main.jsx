import React from "react"
import ReactDOM from 'react-dom/client' 
import App from './App'
import './App.css'
let virtualDOM = ReactDOM.createRoot(document.getElementById('root'))
virtualDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)