import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, StarIcon, GiftIcon, HeartIcon, SunIcon } from '@heroicons/react/24/solid';

const SequentialNumber = ({ number, index }) => (
  <motion.div
    className="inline-block mx-1"
    initial={{ y: 100, opacity: 0, rotateX: -90 }}
    animate={{ 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 1,
      delay: index * 0.2,
      type: "spring",
      stiffness: 200,
      damping: 15
    }}
  >
    <motion.span
      animate={{
        color: ['#e879f9', '#818cf8', '#c084fc', '#e879f9'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
      className="text-6xl md:text-8xl font-bold"
    >
      {number}
    </motion.span>
  </motion.div>
);

const FloatingIcon = ({ children, delay = 0, duration = 4 }) => (
  <motion.div
    animate={{
      y: [-20, 0, -20],
      rotate: [-5, 5, -5],
      scale: [0.9, 1.1, 0.9],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const RadialLight = ({ color, delay }) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.1, 0.3, 0.1],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      width: '40vw',
      height: '40vw',
    }}
  />
);

const ShootingStar = () => (
  <motion.div
    className="fixed h-1 bg-gradient-to-r from-transparent via-white to-transparent"
    initial={{ 
      top: "-10%",
      left: "100%",
      width: "150px",
      opacity: 1,
      rotate: -45,
      scale: 0
    }}
    animate={{
      top: "100%",
      left: "-10%",
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }}
    transition={{
      duration: 1.5,
      delay: Math.random() * 10,
      repeat: Infinity,
      repeatDelay: Math.random() * 15
    }}
  />
);

const Card = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [year] = useState("2025".split(""));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e) => {
      if (!isMobile) {
        const { clientX, clientY, target } = e;
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (clientX - left - width/2) / 25;
        const y = (clientY - top - height/2) / 25;
        setMousePosition({ x, y });
      }
    };

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black flex items-center justify-center p-4 overflow-hidden">
      <RadialLight color="#4f46e5" delay={0} />
      <RadialLight color="#7e22ce" delay={2} />
      <RadialLight color="#6d28d9" delay={4} />

      {[...Array(8)].map((_, i) => (
        <ShootingStar key={`shooting-star-${i}`} />
      ))}

      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="fixed"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -Math.random() * 600],
            x: [0, Math.sin(i) * 300],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-50px",
          }}
        >
          {i % 5 === 0 ? (
            <SparklesIcon className="text-yellow-300 w-4 h-4" />
          ) : i % 5 === 1 ? (
            <StarIcon className="text-blue-300 w-3 h-3" />
          ) : i % 5 === 2 ? (
            <HeartIcon className="text-pink-300 w-3 h-3" />
          ) : i % 5 === 3 ? (
            <GiftIcon className="text-purple-300 w-4 h-4" />
          ) : (
            <SunIcon className="text-orange-300 w-4 h-4" />
          )}
        </motion.div>
      ))}

      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-3xl mx-auto"
          style={!isMobile ? {
            transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
          } : {}}
        >
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.6) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.6) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative p-6 md:p-12 z-10">
              <div className="flex justify-center space-x-4 mb-8">
                <FloatingIcon delay={0}>
                  <GiftIcon className="w-8 h-8 md:w-12 md:h-12 text-purple-300" />
                </FloatingIcon>
                <FloatingIcon delay={0.2}>
                  <SparklesIcon className="w-8 h-8 md:w-12 md:h-12 text-yellow-300" />
                </FloatingIcon>
                <FloatingIcon delay={0.4}>
                  <StarIcon className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
                </FloatingIcon>
              </div>

              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 md:mb-12"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(147,51,234,0.5) 0%, rgba(79,70,229,0.5) 100%)',
                      'linear-gradient(225deg, rgba(147,51,234,0.5) 0%, rgba(79,70,229,0.5) 100%)',
                    ],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <div className="w-full h-full relative">
                    <img
                      src="https://mcrhema.org/assets/monPapa-GJUGVVyb.jpeg"
                      alt="Profile"
                      className="absolute w-full h-full object-cover object-center"
                      style={{
                        transform: 'scale(1.1)',
                      }}
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30"
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <div className="flex justify-center space-x-2 mb-8">
                {year.map((num, index) => (
                  <SequentialNumber key={index} number={num} index={index} />
                ))}
              </div>

              <motion.h2 
                className="text-3xl md:text-5xl font-bold text-center mb-8"
                animate={{
                  backgroundImage: [
                    'linear-gradient(45deg, #e879f9, #818cf8)',
                    'linear-gradient(180deg, #818cf8, #c084fc)',
                    'linear-gradient(225deg, #c084fc, #e879f9)',
                  ],
                }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Meilleurs Vœux
              </motion.h2>

              <motion.div
                className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p>
                  En cette nouvelle année 2025, je proclame sur vous la paix, la joie et l'abondance divine. Que l'Éternel renouvelle vos forces, ouvre des portes de bénédictions et vous conduise dans Sa lumière.
                </p>
                <p>
                  Restons fermes dans la foi et unis pour glorifier le nom de Jésus-Christ. Que cette année soit une saison de témoignages puissants dans vos vies et vos familles.
                </p>
                <p>
                  Bonne et Heureuse Année à tous, sous la grâce de notre Seigneur !
                </p>
                <p className="text-right italic">
                  Avec amour,
                  <br />
                  Apôtre William Houinsou
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Card;