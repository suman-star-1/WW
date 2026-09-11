import { ScanLine, Compass, BarChart3, PlusCircle, Home } from 'lucide-react';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: 'Home', icon: Home },
  { page: 'scan', label: 'Scan', icon: ScanLine },
  { page: 'search', label: 'Explore', icon: Compass },
  { page: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { page: 'admin', label: 'Contribute', icon: PlusCircle },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-parchment-50/90 backdrop-blur-md border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-navy-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-gold-300 font-display font-bold text-lg">AI</span>
            </div>
            <span className="font-display text-lg font-semibold text-navy-700 hidden sm:block">
              Heritage Storyteller
            </span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map(({ page, label, icon: Icon }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-navy-600 text-parchment-50 shadow-sm'
                    : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
