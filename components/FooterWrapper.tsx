'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  //hide footer only for /slide (or /results/[fileId]/slide)
  if (pathname.includes('/slide')) {
    return null;
  }

  // show footer everywhere else
  return <Footer />;
}
