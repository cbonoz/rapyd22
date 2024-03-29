import React, {useState, useEffect} from 'react'
import { getCategories, postCheckout } from '../api'
import { Row, Col, Select } from 'antd';
import { renderCheckoutPage } from '../util/rapyd';
import BestCards from './BestCards';


const { Option } = Select;

function Checkout({user}) {
    console.log('checkout', user)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()

    async function fetchCategories() {
        try {
            const {data} = await getCategories()
            setCategories(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
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
        
    }, [])
    useEffect(() => {
       fetchCategories() 
    }, [])

    async function renderCheckout() {
        const body = {
            category
        }

        try {
            const {data} = await postCheckout(body)
            console.log('checkout', data)
            renderCheckoutPage(data.data.id)
        } catch (e) {
            console.error(e) 
        }

    }

    useEffect(() => {
        // if (category) {
        renderCheckout()
        // }
    }, [])
  return (
    <div>
        <Row>
            <Col span={16}>
                          <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    onChange={v => setCategory(v)}
    value={category}
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
      {categories.map(c => {
          return <Option key={c} value={c}>{c}</Option>
      })}
  </Select>

                {/* <h1 className='green'>Complete checkout</h1> */}

  <div id="rapyd-checkout"></div>
  <p></p>
  <p></p>
  <p style={{'fontWeight': 500, 'marginTop': '25px'}}>Add checkout experience here</p>

</Col>
<Col span={8}>
    <BestCards user={user} category={category}/>
</Col>

    </Row>
    </div>
  )
}

export default Checkout
