"use client";

import React from "react";
import useLenis from "./useLenis";

export default function LenisProvider({ children }) {
  useLenis();
  return <>{children}</>;
}
