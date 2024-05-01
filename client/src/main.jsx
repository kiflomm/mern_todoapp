import React from "react"
import ReactDOM from 'react-dom/client' 
import App from './App' 
let virtualDOM = ReactDOM.createRoot(document.getElementById('root'))
virtualDOM.render(
  <React.StrictMode>
      <App />
   </React.StrictMode>
)