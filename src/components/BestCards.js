import React, {useState, useEffect} from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spin } from "antd";
import { getBestCard } from "../api";
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import powered from '../assets/powered.png'

function BestCards({user, category}) {
  const navigate = useNavigate()
  const [useAll, setUseAll] = useState(false)
  const [loading, setLoading] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    setResult(undefined)
    console.log('category', category, user)
    if (category) {
      recommend()
    }
  }, [category, user, useAll])

  const recommend = async () => {
    const body = {
      'category': category,
      'use_all': useAll,
    }

    if (user) {
      body.email = user.email
    }

    setLoading(true)
    try {
      const {data} = await getBestCard(body)
      setResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (!category) {
    return <p>Select category to begin.</p>
  }

  if (loading || !result) {
    return <Spin/>
  }
  
  return (
      <Card title={<div className="green-bg">{(useAll || !user) ? 'Best' : 'Your best'} cards:</div>}>

      {result.map((c, i) => {
        return <div key={i}>
          <img src={c.image} className="card-icon width-100"/>
          <div>
            <p>#{i+1}: {c.name}<br/>
            <b>Rewards {(c.rewards[category] || c.rewards['all'] || {}).percentage || 0}% on {category}</b>
            &nbsp;
            {useAll && <span>
              {c.missing_card ? <a href={c.link} target="_blank">Apply here</a> : <span className="green">You own this card</span>}</span>}
            </p>
          </div>
          </div>
      })}
        <br/>
        {user && <div>Show all cards <Switch defaultChecked={useAll} onChange={(c) => setUseAll(c)} checked={useAll}></Switch></div>}
        <br/>
      <img src={powered} style={{width: '140px'}}
      />
    </Card>

  );
}

export default BestCards;