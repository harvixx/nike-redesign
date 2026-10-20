import { useRef } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/about";
import useIntro from "./hooks/useIntro";
import useShoeScroll from "./hooks/Useshoescroll";
import ProductFeatures from "./components/ProductFeatures";

function App() {
  const root = useRef(null);
  useIntro(root);
  useShoeScroll(root);
  return (
    <div ref={root}>
      <Loader />
      <Navbar />
      <Hero />
      <About/>
      <ProductFeatures/>
    </div>
  );
}

export default App;