import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import SearchPage from '@/pages/SearchPage';
import HeritageStoryPage from '@/pages/HeritageStoryPage';
import AdminPage from '@/pages/AdminPage';
import DashboardPage from '@/pages/DashboardPage';
import { useUserStats } from '@/hooks/useUserStats';
import type { Page, Monument } from '@/types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const { recordSiteExplored } = useUserStats();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMonument = (monument: Monument) => {
    setSelectedMonument(monument);
    recordSiteExplored(monument.id);
    setCurrentPage('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedMonument(null);
    setCurrentPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when navigating between pages (except story which has its own scroll)
  useEffect(() => {
    if (currentPage !== 'story') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-parchment-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onSelectMonument={handleSelectMonument} />
        )}
        {currentPage === 'scan' && (
          <ScanPage onNavigate={handleNavigate} onIdentified={handleSelectMonument} />
        )}
        {currentPage === 'search' && (
          <SearchPage onSelectMonument={handleSelectMonument} />
        )}
        {currentPage === 'story' && selectedMonument && (
          <HeritageStoryPage
            monument={selectedMonument}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}
        {currentPage === 'story' && !selectedMonument && (
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <p className="text-navy-400 text-lg">
              No monument selected. Please search or scan to choose a heritage site.
            </p>
            <button onClick={() => handleNavigate('search')} className="btn-primary mt-4">
              Explore Heritage
            </button>
          </div>
        )}
        {currentPage === 'admin' && <AdminPage />}
        {currentPage === 'dashboard' && (
          <DashboardPage onNavigate={handleNavigate} onSelectMonument={handleSelectMonument} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
