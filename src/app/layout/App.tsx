import Navbar from "./nav/Navbar";
import AnimatedOutlet from "../router/AnimatedOutlet";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-10 mt-24">
        {/*This is needed to be done to make children a direct element of animate presence for animation to work smoothly*/}
        <AnimatedOutlet />
      </div>
    </div>
  );
}

export default App;
