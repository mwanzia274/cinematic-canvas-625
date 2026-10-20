import { useEffect } from 'react';

export function useStudioMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll('main > section:not(.hero), .team-card, .project-card, .quotation-group');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-entered');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}