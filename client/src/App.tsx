import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import  Chat from "./pages/chat";
import  Historico  from "./pages/historico";

function App() {
  return (
    <Router>


      <Routes>

        <Route path="/" element={<Chat />} />
        <Route path="/historico" element={<Historico />} />

      </Routes>

    </Router>
  );
}

export default App;
