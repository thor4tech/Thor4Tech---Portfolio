
import React from 'react';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import PainPoints from './components/PainPoints';
import Strategy from './components/Strategy';
// AIDemo removed
import Cases from './components/Cases';
import Experience from './components/Experience';
import Niches from './components/Niches';
import Bio from './components/Bio';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ThorChat from './components/ThorChat';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased bg-dark-blue text-white overflow-x-hidden">
      <Hero />
      <Methodology />
      <PainPoints />
      <Strategy />
      {/* AIDemo section removed */}
      <Cases />
      <Experience />
      <Niches />
      <Bio />
      <Footer />
      <FloatingCTA />
      <ThorChat />
    </div>
  );
};

export default App;