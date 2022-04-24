import React, {useState, useEffect} from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Input from "antd/lib/input/Input";
import userEvent from "@testing-library/user-event";
import { postCustomer } from "../api";

function Register(props) {
  const [email ,setEmail] = useState()
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const postUser = async () => {
    console.log('fetchUser', email)
    try {
      const u = await postCustomer({email})
      console.log('set', u)
      setUser(u)
    } catch (e) {
      console.error('e', e)
    }
  }

  useEffect(() => {
    if(ready) {
      postUser()
    }
  }, [ready])
  

  if (!email || !ready) {
    return <>
    <h1>Register cards</h1>
    <p>Enter your email to begin</p>
    <Input value={email} onChange={e => setEmail(e.target.value)}></Input>
    <br/>

    <Button onClick={() => setReady(true)} type="primary" className="standard-btn">
      Ready
    </Button>
    </>
  }

  return (
    <>
    <h1>Register cards</h1>

    </>
  );
}

export default Register;