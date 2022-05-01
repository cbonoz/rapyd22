import React, {useState, useEffect} from "react";
import { APP_DESC, APP_NAME } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getBestCard } from "../api";
import powered from '../assets/powered.png'

function BestCard({user, category}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    setResult(undefined)
    console.log('category', category)
    if (category) {
      recommend()
    }
  }, [category])

  const recommend = async () => {
    const body = {
      'category': category
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
  
  return (
    <div className="container">
      {/* <Button loading={loading} disabled={loading} type="primary" onClick={recommend}>Recommend Card</Button> */}
      {/* {result && <span>{JSON.stringify(result)}</span>} */}
      {result && <div><h3>Your best cards:</h3>{result.map((c, i) => {
        return <div key={i}>
          <img src={c.image} className="card-icon width-100"/>
          <div>
            <p>#{i+1}: {c.name}<br/>
            <b>Rewards {(c.rewards[category] || c.rewards['all'] || {}).percentage || 0}% on {category}</b>
            </p>
          </div>
          </div>
      })}
      <img src={powered} style={{width: '125px'}}
      />
      </div>}

    </div>
  );
}

export default BestCard;