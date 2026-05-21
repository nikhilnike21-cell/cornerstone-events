import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/Statsstrip';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Packages from './components/Pakages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Services />
      <About />
      <Gallery />
      <Packages />
    </div>
  );
}

export default App;