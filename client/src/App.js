import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Cards from './components/Cards';
import AddProduct from './components/AddProduct';
import CardDetails from './components/CardDetails';
import AddToCartDetails from './components/AddToCartDetails';
import Shipping from './components/Shipping';
import CheckoutSteps from './components/CheckoutSteps';
import UpdateShipping from './components/UpdateShipping';
import UpdateProduct from './components/UpdateProduct';
import PlaceOrder from './components/PlaceOrder'

class App extends Component {

    render() {

        return (
            <Router>
                <div className="App bg-light">
                    <NavBar />
                    <Route exact path="/" component={Cards} />
                    <div className="container">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/productRegister" component={AddProduct} />
                        <Route exact path="/CardDetails" component={CardDetails} />
                        <Route exact path="/getCartDetails" component={AddToCartDetails} />
                        <Route exact path="/shipping" component={Shipping} />
                        <Route exact path="/checkoutSteps" component={CheckoutSteps} />
                        <Route exact path="/update-shipping" component={UpdateShipping} />
                        <Route exact path="/update-product" component={UpdateProduct} />
                     </div>
                </div>
            </Router>
        )
    }
}

export default App