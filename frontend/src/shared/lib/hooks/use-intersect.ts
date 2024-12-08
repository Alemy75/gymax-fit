import { useEffect, useState, useRef, useCallback } from "react";

type UseIntersectOptions = IntersectionObserverInit;

export const useIntersect = (
  options?: UseIntersectOptions
): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    },
    [setIsIntersecting]
  );

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(callback, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [ref, options, callback]);

  return [ref, isIntersecting];
};
