import React, {useState} from 'react'
import { Layout, Menu } from "antd";
import { APP_NAME } from "./util/constants";
import { Routes, Route, Link, Router } from "react-router-dom";
import About from "./components/About";
import Register from "./components/Register";
import BestCard from "./components/BestCard";

import logo from "./assets/logo.png";
import "antd/dist/antd.min.css";
import "./App.css";
import Docs from './components/Docs';
import Checkout from './components/Checkout';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [user, setUser] = useState()
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
            {!user && <Link to="/">
              <Menu.Item key="1">Get Started</Menu.Item>
            </Link>}
            {/* <Link to="/register">
              <Menu.Item key="2">Register</Menu.Item>
            </Link> */}
            <Link to="/checkout">
              <Menu.Item key="3">Smart Checkout</Menu.Item>
            </Link>
            <Link to="/api">
              <Menu.Item key="3">API</Menu.Item>
            </Link>
            {user && <span>Active: {user.email}&nbsp;<a onClick={() => setUser(undefined)}>Logout</a></span>}
          </Menu>
        </Header>
        <Content>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<About/>}/>
              <Route exact path="/register" element={<Register setUser={setUser} user={user}/>} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route exact path="/api" element={<Docs />} />
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