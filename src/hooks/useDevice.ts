import { useState, useEffect } from 'react';

export function setWindowWidth(width: number, minWidth: number, maxWidth: number) {
  switch (true) {
    case !minWidth:
      return width <= maxWidth;
    case !maxWidth:
      return width >= minWidth;
    default:
      return width >= minWidth && width <= maxWidth;
  }
}

export function useDevice() {
  const [width, setWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const device = {
    isMobile: setWindowWidth(width, 0, 750),
    isDesktop: setWindowWidth(width, 751, 0),
  };

  return { device };
}
