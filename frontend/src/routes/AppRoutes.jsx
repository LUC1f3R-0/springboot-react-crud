import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../view/Home'
import ScrollAnimations from '../view/Scroll'
import Hero from '../view/Hero'
import Edit from '../view/Edit'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<ScrollAnimations />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/hero' element={<Hero />} />
        </Routes>
    )
}

export default AppRoutes
