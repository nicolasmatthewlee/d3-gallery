import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = (ref: React.RefObject<Element>) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const resizeTarget = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      setDimensions(entries[0].contentRect);
    });
    if (resizeTarget) resizeObserver.observe(resizeTarget);

    return () => {
      if (resizeTarget) resizeObserver.unobserve(resizeTarget);
    };
  }, [ref]);

  return dimensions;
};
