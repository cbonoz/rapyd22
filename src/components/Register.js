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
  const [name ,setName] = useState()
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const postUser = async () => {
    console.log('fetchUser', email)
    try {
      const u = await postCustomer({email, name})
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

  useEffect(() => {
    if (user) {
      window.addEventListener('onSaveCardDetailsSuccess', (event) => {
        console.log(event.detail)
        // Returns ‘Payment’ object.
        // Client code.
      })
      window.addEventListener('onSaveCardDetailsFailure', (event) => {
        console.error(event.detail.error)
        // Returns an error message from the API.
        // Client code.
      })

      window.addEventListener('onLoading', (event) => {
        console.log(event.detail.loading)
          // Returns true or false depending on the loading state
          // Client code.
        })
      }
      // TODO: remove listener on exit.
  }, [user])
  

  if (!email || !ready) {
    return <>
    <h1>Register cards</h1>
    <p>Enter your name and email to begin:</p>
    <Input className='standard-input' prefix="Full name: " value={name} onChange={e => setName(e.target.value)}></Input>
    <br/>
    <Input className='standard-input' prefix="Email: " value={email} onChange={e => setEmail(e.target.value)}></Input>
    <br/>
 

    <Button onClick={() => setReady(true)} type="primary" className="standard-btn">
      Ready
    </Button>
    </>
  }

  return (
    <>
    <h1>Add card</h1>
    {user && <span>{JSON.stringify(user)}</span>}
    <div id="rapyd-toolkit"></div>
    </>
  );
}

export default Register;