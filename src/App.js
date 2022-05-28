import './components/Sidebar/styles.js'
import './App.css';
import Skipjack from './components/Pages/BlockCiphers/Skipjack/Skipjack'
import { BrowserRouter as Switch, Routes, Route } from "react-router-dom";
import SideBar from './components/Sidebar/Sidebar';
import StickyBox from "react-sticky-box";

function App() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <Switch>
        <StickyBox>
          <SideBar />
        </StickyBox>
        <Routes postion>
          <Route path="/skipjack" element={<Skipjack />} />
        </Routes>
      </Switch>
    </div>

  );
}

export default App;
