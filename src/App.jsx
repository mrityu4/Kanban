import React from 'react'
import Card from './components/Card'
import Display from './components/Display'
import Header from './components/Header'
import './App.css';
import { AuthProvider } from './components/AuthContext'

const App = () => {
  return (
    <>
    <AuthProvider>
    <Header></Header>
    <Display/>
    </AuthProvider>
    </>
    
  )
}

export default App