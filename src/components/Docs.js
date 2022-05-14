import React from "react";
import { APP_DESC, APP_NAME, BASE_URL, CARD_ROUTE_DESCRIPTION, EXAMPLE_RECOMMENDED_CARDS } from "../util/constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import ApiDoc from "./ApiDoc";

function Docs(props) {
  const navigate = useNavigate()
  return (
    <div className="container left">
      <img src={logo}/><br/>
      <br/>
      <i>API Documentation</i>
      <br/>
      <br/>
      {/* <b>API Documentation</b><br/> */}
      <ApiDoc
        title={"Get recommended cards"}
        description={CARD_ROUTE_DESCRIPTION}
        route={`${BASE_URL}/cards/recommend`}
        request={`{
          "category": str, // Required, category of the given purchase.
          "all_cards": Optional[boolean] // Optional, default false. Check all cards in the category ignoring the current user.
          "email": Optional[str] // Optional, email of the current user.
}`
        }
        response={EXAMPLE_RECOMMENDED_CARDS}
        />
    </div>
  );
}

export default Docs;