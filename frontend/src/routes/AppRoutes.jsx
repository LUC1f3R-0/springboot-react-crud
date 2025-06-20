import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../view/Home'
import ScrollAnimations from '../view/Scroll'
import Hero from '../view/Hero'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<ScrollAnimations />} />
            <Route path='/hero' element={<Hero />} />
        </Routes>
    )
}

export default AppRoutes
