<p align='center'>
    <img src='./img/logo.png' width=400/>
</p>

RapydRewards
---

A personalized card recommendation embed powered by Rapyd. 

RapydRewards helps users make the most of their purchases online by recommending the best card to use at the point of sale.

Built for the Rapyd Hack the Galaxy 2022 hackathon.

### Concept

There's all sorts of websites that let you compare credit card rewards.

RapydRewards recommends the cards at the point of checkout whenever a client is using a Rapyd checkout screen.

Going after the following categories:
* Digital ads: Credit card companies can embed their card signup based on the category of purchase the user is completing.
* Product experience: A high reward or cash back from a particular card merchant could incentivize the user to complete a purchase of an item.

<b>Note this project is currently a prototype and would require additional work to be production ready</b>

### Objective

RapydRewards aims to improve the checkout experience for credit card rewards users by providing tools for selecting the best credit card available to the user at the point of purchase as well as recommending other credit cards that provide higher reward rates.

### How It Works

The prototype application includes a set of some of the most popular credit cards with rewards details including limits and durations for each. A user can select each card owned, which is saved to a user profile. When making a purchase using the RapydReward checkout experience, the user is shown which of their available credit cards provides the highest value reward based on the particular merchant category the purchase falls under.

The merchant category selection shown in the app is for demo purposes, the user or merchant of RapydRewards should wire in the appropriate category closest matching one from the `/categories` endpoint.

The RapydRewards project is a side panel next to the Rapyd checkout to deliver a checkout experience that enables the user to discover the best cards, either the ones that the person currently owns or the ones that they don't, to use for their purchase.

### How it's built

The project features a React.js front-end, which includes components that can be inported into a merchant's web application and connects to a python server that includes functionality for storing and managing a a set of user owned credit cards and selecting the best card given details of a purchase. It connects to a users existing Rapyd profile to with stored payment methods.

### Running the project

From the repo root:
`yarn; yarn start`

Install the necessary backend dependencies (from requirements.txt) and run the server code from the below directory:
`./server`

The server code stores card profiles per email address.

<pre>
    RAPYD_ACCESS_KEY={YOUR RAPYD ACCESS KEY}
    RAPYD_SECRET={YOUR RAPYD SECRET}
</pre>

<pre>
    pip install -r requirements.txt
    ./run.sh
</pre>

### Screenshots

Home page of app
<img src="./img/home.png" width=800/>
Adding cards to your user profile
<img src="./img/add.png" width=800/>
Active cards
<img src="./img/selected.png" width=800/>
RapydRewards embed (showing best results based on the current user's owned cards)
<img src="./img/my_cards.png" width=800/>
RapydRewards embed (showing best results based on all cards)
<img src="./img/all_cards.png" width=800/>
Registering the checkout flow.
<img src="./img/api.png" width=800/>
RapydRewards API spec
<img src="./img/docs.png" width=800/>

### Useful links
https://docs.rapyd.net/build-with-rapyd/reference/rapyd-disburse-overview
