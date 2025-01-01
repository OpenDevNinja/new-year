import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, StarIcon, GiftIcon, HeartIcon } from '@heroicons/react/24/solid';

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

const ShootingStar = () => (
  <motion.div
    className="fixed h-px bg-gradient-to-r from-transparent via-white to-transparent"
    initial={{ 
      top: "-10%",
      left: "100%",
      width: "100px",
      opacity: 1,
      rotate: -45
    }}
    animate={{
      top: "100%",
      left: "-10%",
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: 2,
      delay: Math.random() * 10,
      repeat: Infinity,
      repeatDelay: Math.random() * 20
    }}
  />
);

const Card = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

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
      {/* Étoiles filantes */}
      {[...Array(5)].map((_, i) => (
        <ShootingStar key={`shooting-star-${i}`} />
      ))}

      {/* Particules flottantes */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="fixed"
          animate={{
            y: [0, -Math.random() * 500],
            x: [0, Math.sin(i) * 200],
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
          {i % 4 === 0 ? (
            <SparklesIcon className="text-yellow-300 w-4 h-4" />
          ) : i % 4 === 1 ? (
            <StarIcon className="text-blue-300 w-3 h-3" />
          ) : i % 4 === 2 ? (
            <HeartIcon className="text-pink-300 w-3 h-3" />
          ) : (
            <GiftIcon className="text-purple-300 w-4 h-4" />
          )}
        </motion.div>
      ))}

      {/* Cercles lumineux animés */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            delay: i * 3,
            repeat: Infinity,
          }}
          style={{
            background: `radial-gradient(circle, ${['#4f46e5', '#7e22ce', '#6d28d9'][i]} 0%, transparent 70%)`,
            width: '40vw',
            height: '40vw',
            left: `${i * 30}%`,
            top: `${i * 20}%`,
          }}
        />
      ))}

      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-3xl mx-auto"
          style={!isMobile ? {
            transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
          } : {}}
        >
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
            {/* Effet de lumière dynamique */}
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative p-6 md:p-12 z-10">
              {/* En-tête avec icônes */}
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

              {/* Photo avec effet de rotation */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 md:mb-12"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 100%)',
                      'linear-gradient(225deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 100%)',
                    ],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJMSrGWSEUvS62wsTbWOmeQpCnhx23cBo6og&s"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30"
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Texte animé */}
              <motion.div
                className="text-center space-y-6 md:space-y-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold"
                  animate={{
                    backgroundImage: [
                      'linear-gradient(to right, #e879f9, #818cf8)',
                      'linear-gradient(to right, #818cf8, #c084fc)',
                      'linear-gradient(to right, #c084fc, #e879f9)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  2025
                </motion.h1>

                <FloatingIcon duration={6}>
                  <h2 className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Meilleurs Vœux
                  </h2>
                </FloatingIcon>

                <motion.p 
                  className="text-lg md:text-xl text-white/90  leading-relaxed max-w-2xl mx-auto px-4"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
En cette nouvelle année 2025, je proclame sur vous la paix, la joie et l’abondance divine. Que l’Éternel renouvelle vos forces, ouvre des portes de bénédictions et vous conduise dans Sa lumière.

Restons fermes dans la foi et unis pour glorifier le nom de Jésus-Christ. Que cette année soit une saison de témoignages puissants dans vos vies et vos familles.

Bonne et Heureuse Année à tous, sous la grâce de notre Seigneur !
<br />
Avec amour,
Apôtre William Houinsou
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Card;