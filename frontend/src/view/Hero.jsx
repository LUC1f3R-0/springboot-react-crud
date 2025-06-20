// Hero.jsx

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
// import HeroCanvas from './HeroCanvas'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const container = useRef(null)
    const heroRef = useRef(null)
    const textRef = useRef(null)
    const letterRef = useRef(null)

    useGSAP(() => {
        const heroElement = heroRef.current
        const textElement = textRef.current
        const letterElement = letterRef.current

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroElement,
                start: 'top top',
                end: '+=2000',
                scrub: true,
                pin: heroElement,
                markers: import.meta.env.NODE_ENV === 'development',
            },
        })

        tl.fromTo(
            textElement,
            {
                scale: 1,
                transformOrigin: '50% 50%',
                opacity: 1,
            },
            {
                scale: 20,
                opacity: 0,
                ease: 'none',
            }
        )

        tl.fromTo(
            letterElement,
            {
                scale: 1,
                transformOrigin: '50% 50%',
                opacity: 1,
            },
            {
                scale: 20,
                opacity: 0,
                ease: 'none',
            }
        )
    }, { scope: container })

    return (
        <div ref={container}>
            <div
                ref={heroRef}
                className='flex min-h-screen flex-col justify-between p-24 items-center'
            >
                <div ref={textRef} className='flex-1 pt-36 padding-x'>
                    <h1 className='hero_title uppercase tracking-widest text-center'>
                        <span> Testi</span>
                        <span ref={letterRef}>n</span>
                        <span>g</span>{' '}
                        <span className='bg-gradient-to-r from-accent-3 via-accent-2 to-accent-1 inline-block text-transparent bg-clip-text'>
                            GSAP
                        </span>
                        <br />
                        <span> Placeholder </span>{' '}
                        <span className='bg-gradient-to-r from-accent-3 via-accent-2 to-accent-1 inline-block text-transparent bg-clip-text'>
                            Text
                        </span>
                    </h1>
                </div>

                <HeroCanvas />
            </div>
        </div>
    )
}

export default Hero
