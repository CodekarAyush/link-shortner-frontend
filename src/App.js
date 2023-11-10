import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Logs from "./pages/Logs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LinkDataProvider from "./context/LinkDataProvider";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <LinkDataProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/logs" element={<Logs/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          </LinkDataProvider>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
