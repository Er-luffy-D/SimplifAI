"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const handleMouseMove = (e) => {
      // Faster, more accurate cursor tracking
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none"
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power1.out"
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check for different cursor types
      if (target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
        setCursorVariant('hover');
        
        gsap.to(cursor, {
          scale: 0.4,
          duration: 0.2,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          scale: 2.2,
          duration: 0.2,
          ease: "power2.out"
        });
      } else if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
        setCursorVariant('button');
        
        gsap.to(cursor, {
          scale: 0.6,
          duration: 0.2,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          scale: 1.6,
          duration: 0.2,
          ease: "power2.out"
        });
      } else if (target.closest('input, textarea')) {
        setIsHovering(true);
        setCursorVariant('text');
        
        gsap.to(cursor, {
          scale: 0.8,
          duration: 0.2,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      
      if (target.closest('[data-cursor="hover"], button, a, [role="button"], input, textarea')) {
        setIsHovering(false);
        setCursorVariant('default');
        
        gsap.to(cursor, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        
        gsap.to(follower, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.7,
        duration: 0.08,
        ease: "power2.out"
      });
      
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.08,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: isHovering ? (cursorVariant === 'hover' ? 0.4 : cursorVariant === 'button' ? 0.6 : 0.8) : 1,
        duration: 0.08,
        ease: "power2.out"
      });
      
      gsap.to(follower, {
        scale: isHovering ? (cursorVariant === 'hover' ? 2.2 : cursorVariant === 'button' ? 1.6 : 1.2) : 1,
        duration: 0.08,
        ease: "power2.out"
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isHovering, cursorVariant]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-200 ${
          cursorVariant === 'hover' ? 'bg-purple-400' :
          cursorVariant === 'button' ? 'bg-green-400' :
          cursorVariant === 'text' ? 'bg-blue-400' :
          'bg-white'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Follower circle - clean bubble design without text */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-200 ${
          cursorVariant === 'hover' ? 'border-2 border-purple-400/60 bg-purple-400/10' :
          cursorVariant === 'button' ? 'border-2 border-green-400/60 bg-green-400/10' :
          cursorVariant === 'text' ? 'border-2 border-blue-400/60 bg-blue-400/10' :
          'border border-white/30 bg-white/5'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
