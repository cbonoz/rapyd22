import { Layout, Menu } from "antd";
import { APP_NAME } from "./util/constants";

import { Routes, Route, Link, Router } from "react-router-dom";

import logo from "./assets/logo.png";
import "antd/dist/antd.min.css";
import "./App.css";
import About from "./components/About";
import Register from "./components/Register";
import BestCard from "./components/BestCard";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Link to="/">
              <Menu.Item key="0">
                <img src={logo} className="header-image" />
              </Menu.Item>
            </Link>
            <Link to="/">
              <Menu.Item key="1">Home</Menu.Item>
            </Link>
            <Link to="/register">
              <Menu.Item key="2">Register card</Menu.Item>
            </Link>
            <Link to="/about">
              <Menu.Item key="3">Smart Payments</Menu.Item>
            </Link>
          </Menu>
        </Header>
        <Content>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<About/>}/>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/match" element={<BestCard />} />
            </Routes>
          </div>
        </Content>
        <Footer>
          {APP_NAME} &copy;2022 - Built for the{" "}
          <a href="https://hackthegalaxy.devpost.com/" target="_blank">
            Rapyd Hack the Galaxy
          </a>
          hackathon.
        </Footer>
      </Layout>
    </div>
  );
}

export default App;