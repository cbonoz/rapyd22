import React, {useState, useEffect} from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Select, Spin, notification, Space } from "antd";
import Input from "antd/lib/input/Input";
import { getCards, patchUser, postCustomer } from "../api";

const { Option } = Select;

function Register({setUser, user}) {
  const navigate = useNavigate()
  const [email ,setEmail] = useState(user && user.email)
  const [allCards, setAllCards] = useState()
  const [cards, setCards] = useState([])
  const [error, setError] = useState()
  const [name ,setName] = useState()
  const [loading, setLoading] = useState(false)

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };
  

  const postUser = async () => {
    setError('')
    setLoading(true)
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
    } finally {
      setLoading(false)
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

  async function patchCards() {
    const body = {
      cards,
      email: user['email']
    }
    setLoading(true)
    try {
      const {data} = await patchUser(body)
      openNotificationWithIcon('success', 'Success!', 'Your credit cards have been updated.')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
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
        setCards(user.cards || [])
      }

     
      // TODO: remove listener on exit.
  }, [user])




  if (!email || !user) {
    return <>
    <h1>Register cards</h1>
    <p>Enter your name and email to begin:</p>
    <Input className='standard-input' prefix="Full name: " value={name} onChange={e => setName(e.target.value)}></Input>
    <br/>
    <Input className='standard-input' prefix="Email: " value={email} onChange={e => setEmail(e.target.value)}></Input>
    <br/>

    <Button onClick={postUser} type="primary" className="standard-btn">
      Continue
    </Button>
    {error && <p className="error-text">{error}</p>}
    </>
  }

  if (!allCards) {
    return <Spin/>
  }

  return (
    <>
    <h1>Select cards</h1>
    <p>Select the cards you would like to use with {APP_NAME}. If no cards are selected, all available cards will be used for determining the best rewards.</p>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '400px' }}
      placeholder="Please select"
      defaultValue={cards}
      value={cards}
      onChange={(c) => setCards(c)}
    >
      {allCards.map(c => {
        return <Option key={c}>{c}</Option>
      })}
    </Select>
    <br/>
    {user.ewallet && <div>Wallet ID: {user.ewallet}</div>}
    <br/>
    <Button type={'primary'} disabled={loading} loading={loading} onClick={patchCards}>Save</Button>
    &nbsp;
    <Button type={'secondary'} disabled={loading} onClick={() => navigate('/checkout')}>Go to checkout</Button>


    {/* {user && <span>{JSON.stringify(user)}</span>} */}
    {/* <div id="rapyd-toolkit"></div> */}
    </>
  );
}

export default Register;