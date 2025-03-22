'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DropdownMenuProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-50 flex h-8 w-8 flex-col items-center justify-center rounded-md bg-white shadow-md"
      >
        <span 
          className={`absolute h-0.5 w-4 transform bg-black transition duration-300 ease-in-out ${
            isOpen ? 'translate-y-0 rotate-45' : '-translate-y-1'
          }`}
        />
        <span 
          className={`absolute h-0.5 w-4 bg-black transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span 
          className={`absolute h-0.5 w-4 transform bg-black transition duration-300 ease-in-out ${
            isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1'
          }`}
        />
      </button>

      {/* Menu Panel */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-48 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mt-16 flex flex-col space-y-1 px-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
