import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Hotel from "./pages/hotel/Hotel";
import List from './pages/list/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel/>} />
      </Routes>
    </Router>
  );
}

export default App;
