'use client';

import { useEffect } from 'react';
import { initScrollAnimations } from '../animations';

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return <>{children}</>;
}
