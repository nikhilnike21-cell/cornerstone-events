import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/Statsstrip';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Services />
      <About />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;