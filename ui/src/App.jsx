import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Translate from "./components/Translate";
import Pricing from "./components/Pricing";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<Translate />} />
          {/* <Route path="/pricing" element={<Pricing />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
