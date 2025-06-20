import React, { useState, useEffect, useRef } from 'react';

const ScrollAnimations = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Check visibility of sections
            sectionsRef.current.forEach((section, index) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                    setIsVisible(prev => ({
                        ...prev,
                        [index]: isInView
                    }));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToRefs = (el, index) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current[index] = el;
        }
    };

    return (
        <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
            {/* Hero Section with Parallax */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`
                    }}
                />
                <div
                    className="relative z-10 text-center"
                    style={{
                        transform: `scale(${1 + scrollY * 0.001}) translateY(${scrollY * 0.3}px)`,
                        opacity: Math.max(0, 1 - scrollY * 0.002)
                    }}
                >
                    <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                        SCROLL MAGIC
                    </h1>
                    <p className="text-2xl opacity-80">Experience the power of scroll animations</p>
                </div>

                {/* Floating elements */}
                <div
                    className="absolute top-20 left-20 w-4 h-4 bg-pink-400 rounded-full"
                    style={{
                        transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px) rotate(${scrollY * 0.5}deg)`
                    }}
                />
                <div
                    className="absolute bottom-40 right-32 w-6 h-6 bg-yellow-400 rounded-full"
                    style={{
                        transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.2}px) rotate(${-scrollY * 0.3}deg)`
                    }}
                />
            </section>

            {/* Zooming Text Section */}
            <section
                ref={(el) => addToRefs(el, 0)}
                className="min-h-screen flex items-center justify-center relative"
            >
                <div
                    className={`text-center transition-all duration-1000 ${isVisible[0] ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}
                    style={{
                        transform: `scale(${isVisible[0] ? 1 + Math.min(0.5, Math.max(0, (scrollY - 800) * 0.001)) : 0.5})`
                    }}
                >
                    <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        ZOOM IN
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                        Watch this text grow as you scroll down. The scaling effect creates
                        an immersive reading experience that draws attention to key content.
                    </p>
                </div>
            </section>

            {/* Horizontal Scrolling Section */}
            <section className="py-20 overflow-hidden">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-bold mb-4">Horizontal Journey</h2>
                    <p className="text-xl opacity-80">Elements slide in from different directions</p>
                </div>

                <div className="relative h-96 flex items-center">
                    <div
                        className="flex space-x-8 transition-transform duration-1000"
                        style={{
                            transform: `translateX(${Math.min(0, -scrollY + 1200)}px)`
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="min-w-80 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold shadow-2xl transform hover:scale-105 transition-transform"
                            >
                                Card {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Staggered Animation Section */}
            <section
                ref={(el) => addToRefs(el, 1)}
                className="py-20"
            >
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-5xl font-bold text-center mb-16">Staggered Reveals</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className={`p-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl transform transition-all duration-1000 ${isVisible[1]
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-20 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 200}ms`
                                }}
                            >
                                <div className="text-4xl mb-4">🚀</div>
                                <h3 className="text-2xl font-bold mb-4">Feature {index + 1}</h3>
                                <p className="opacity-90">
                                    Each card animates in with a slight delay, creating a beautiful
                                    staggered effect that guides the user's attention.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Text Reveal Section */}
            <section
                ref={(el) => addToRefs(el, 2)}
                className="py-20 bg-gradient-to-r from-gray-900 to-black"
            >
                <div className="max-w-4xl mx-auto px-8">
                    <div className="space-y-8">
                        {[
                            "Words appear as you scroll",
                            "Creating a dynamic reading experience",
                            "Each line has its own timing",
                            "Building anticipation and engagement"
                        ].map((text, index) => (
                            <p
                                key={index}
                                className={`text-3xl font-light leading-relaxed transition-all duration-1000 ${isVisible[2]
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-10'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 300}ms`
                                }}
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rotation Section */}
            <section
                ref={(el) => addToRefs(el, 3)}
                className="py-20 flex items-center justify-center"
            >
                <div
                    className={`text-center transition-all duration-1000 ${isVisible[3] ? 'rotate-0 scale-100 opacity-100' : 'rotate-12 scale-75 opacity-0'
                        }`}
                >
                    <div className="text-8xl mb-8">⚡</div>
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        ROTATING IN
                    </h2>
                    <p className="text-xl opacity-80">Elements can rotate and scale simultaneously</p>
                </div>
            </section>

            {/* Final Parallax Section */}
            <section className="h-screen relative overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900 via-pink-900 to-red-900"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`
                    }}
                />

                <div className="relative z-10 text-center">
                    <h2 className="text-6xl font-bold mb-8">
                        THE END
                    </h2>
                    <p className="text-2xl opacity-80 mb-8">
                        You've experienced the full scroll journey
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Back to Top
                    </button>
                </div>

                {/* Animated background elements */}
                <div
                    className="absolute top-1/4 left-1/4 w-8 h-8 bg-pink-400 rounded-full opacity-60"
                    style={{
                        transform: `translate(${Math.sin(scrollY * 0.01) * 50}px, ${Math.cos(scrollY * 0.01) * 30}px)`
                    }}
                />
                <div
                    className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-yellow-400 rounded-full opacity-40"
                    style={{
                        transform: `translate(${Math.cos(scrollY * 0.008) * 40}px, ${Math.sin(scrollY * 0.008) * 60}px) rotate(${scrollY * 0.1}deg)`
                    }}
                />
            </section>
        </div>
    );
};

export default ScrollAnimations;