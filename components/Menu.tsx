'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type MenuItem = {
  label: string;
  href: string;
};

type ResponsiveMenuProps = {
  items: MenuItem[];
};

export default function ResponsiveMenu({ items }: ResponsiveMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const threshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > threshold) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white transition-all ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 right-0 z-40 w-64 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Меню</h2>
          <nav>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
