import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticProps {
  children: React.ReactElement;
}

export const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const ref = useMagnetic<HTMLElement>();

  // Clone child and attach the magnetic mouse listener ref safely
  return React.cloneElement(children, { ref } as any);
};

export default Magnetic;
