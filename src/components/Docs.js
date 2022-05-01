import React from "react";
import { APP_DESC, APP_NAME, BASE_URL } from "../util/constants";
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
        title={"Get recommended card"}
        description={"Returns a recommended card based on the user's provided cards and the category of purchase."}
        route={`${BASE_URL}/recommend`}
        request={`{
          "category": str, // category of the given purchase.
          "customer": str // email or customer id of the customer.
}`
        }
        response={`{


}`}
        />
    </div>
  );
}

export default Docs;