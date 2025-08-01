"use client";
import { useEffect } from "react";

export const useArrowNav = ({ onPrev, onNext }) => {
  useEffect(() => {
    function handler(e) {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext]);
};
