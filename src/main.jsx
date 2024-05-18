import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import LoginScreen from './screens/loginScreen.jsx'
import RegisterScreen from './screens/registerScreen.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import Home from './screens/home.jsx'
import NewTicket from './screens/newTicket.jsx'
import UpdateTicket from './screens/updateTicket.jsx'
import PrivateRoute from './components/privateRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* PRIVATE ROUTE */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/newTicket' element={<NewTicket />} />
        <Route path='/updateTicket' element={<UpdateTicket />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <React.StrictMode>
      <RouterProvider router = {router} />
    </React.StrictMode>
  </Provider>
)
