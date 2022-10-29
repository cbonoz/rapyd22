import React, {useState} from 'react'
import { Layout, Menu } from "antd";
import { APP_NAME } from "./util/constants";
import { Routes, Route, Link, Router, useNavigate } from "react-router-dom";
import About from "./components/About";
import Register from "./components/Register";

import logo from "./assets/logo.png";
import "antd/dist/antd.min.css";
import "./App.css";
import Docs from './components/Docs';
import Checkout from './components/Checkout';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [user, setUser] = useState()
  const path = window.location.pathname
  const navigate = useNavigate();

  console.log('p', path)
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Menu theme="light" mode="horizontal" selectedKeys={[window.location.pathname]}>
              <Menu.Item onClick={() => navigate("/")}>
                <img src={logo} className="header-image" />
              </Menu.Item>
              <Menu.Item key="/" onClick={() => navigate("/")}>Get Started</Menu.Item>
              <Menu.Item key="/register" onClick={() => navigate("/register")}>Register cards</Menu.Item>
              {user && <Menu.Item key="/checkout" onClick={() => navigate("/checkout")}>Smart Checkout</Menu.Item>}
              <Menu.Item key="/api" onClick={() => navigate("/api")}>API</Menu.Item>
          <span mode="horizontal">
            {user && <span >Active: {user.email}&nbsp;<a onClick={() => setUser(undefined)}>Logout</a></span>}
          </span>
          </Menu>
        </Header>
        <Content>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<About/>}/>
              <Route exact path="/register" element={<Register setUser={setUser} user={user}/>} />
              <Route exact path="/checkout" element={<Checkout user={user} />} />
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