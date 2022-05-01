import React, {useState, useEffect} from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Select, Spin } from "antd";
import Input from "antd/lib/input/Input";
import { getCards, postCustomer } from "../api";

const { Option } = Select;

function Register({setUser, user}) {
  const [email ,setEmail] = useState()
  const [allCards, setAllCards] = useState()
  const [error, setError] = useState()
  const [name ,setName] = useState()
  const [loading, setLoading] = useState(false)

  const postUser = async () => {
    setError('')
    console.log('fetchUser', email)
    try {
      const response = await postCustomer({email, name})
      const u = response.data
      console.log('set', u)
      setUser(u)
    } catch (e) {
      const err =  e.response.data.detail
      console.error('e', err)
      setError(err)
    }
  }

  async function getAllCards() {
    try {
      const {data} = await getCards()
      setAllCards(data)
    } catch (e) {
      console.error(e)
    }
  }

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

        getAllCards()
      }

     
      // TODO: remove listener on exit.
  }, [user])
  

  if (!email || !user) {
    return <>
    <h1>Register cards</h1>
    <p>Enter your email to begin:</p>
    <Input className='standard-input' prefix="Full name: " value={name} onChange={e => setName(e.target.value)}></Input>
    <br/>
    <Input className='standard-input' prefix="Email: " value={email} onChange={e => setEmail(e.target.value)}></Input>
    <br/>

    <Button onClick={postUser} type="primary" className="standard-btn">
      Ready
    </Button>
    {error && <p className="error-text">{error}</p>}
    </>
  }

  if (!allCards) {
    return <Spin/>
  }

  return (
    <>
    <h1>Found cards</h1>
    <p>Select the cards you would like to filter on with {APP_NAME}. If no cards are selected, all available cards will be used.</p>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '400px' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={() => {}}
    >
      {allCards.map(c => {
        return <Option key={c}>{c}</Option>
      })}
    </Select>
    <br/>
    <br/>
    <Button type={'primary'} onClick={() => {}}>Save</Button>
    {/* {user && <span>{JSON.stringify(user)}</span>} */}
    {/* <div id="rapyd-toolkit"></div> */}
    </>
  );
}

export default Register;