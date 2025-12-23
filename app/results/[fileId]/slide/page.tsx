'use client';

import dynamic from 'next/dynamic';
import { use } from 'react';

// Dynamically load the slideshow only on client side
const Resultslide = dynamic(() => import('./Resultslide'), { ssr: false });

interface ResultsPageProps {
  params: Promise<{ fileId: string }>;
}

export default function SlidePage({ params }: ResultsPageProps) {
  const { fileId } = use(params); // unwrap Promise with React.use
  const fileName = decodeURIComponent(fileId);

  return <Resultslide fileName={fileName} />;
}
