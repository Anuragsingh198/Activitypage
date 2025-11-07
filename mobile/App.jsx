import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import activitiesReducer from '../client/src/store/slices/activitiesSlice'
import Home from './components/Home'

// Configure store matching web app structure
const store = configureStore({ 
  reducer: { 
    activities: activitiesReducer 
  } 
})

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}
