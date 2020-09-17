import React from 'react';
import { getShippingLocation, getCartDetails } from './UserFunctions';
import { Link, withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class AddToCartDetails extends React.Component {

    state = {
        shipping: [],
        quant: ''
    }

    async componentDidMount() {

        const fetchedShipping = await getShippingLocation();
        this.setState({ shipping: fetchedShipping });

        const fetchedData = await getCartDetails();

        this.setState({ data: fetchedData });

        const checkoutCardValue = JSON.parse(localStorage.getItem("checkoutCardValue"));
        this.setState({ quant: checkoutCardValue.quantity })

    }
    
    handleQuantity = (e, id, cardId) => {

        e.preventDefault();
        this.setState({ quant: id === "pos" ? this.state.quant + 1 : this.state.quant - 1 })

        const updatedQuantity = {
            quantity: id === "pos" ? this.state.quant + 1 : this.state.quant - 1
        }

      //  console.log(updatedQuantity);
     //   console.log(cardId);
        axios.put('carts/update-cart/' + cardId, updatedQuantity)
            .then((res) => {                
                console.log(res.data)
                console.log('Quantity successfully updated')
            }).catch((error) => {
                console.log(error)
            })
          

    }

    handleToken = (token) => {
       
        const checkoutCardValue = JSON.parse(localStorage.getItem("checkoutCardValue"));
        const email = localStorage.getItem("email");
            
        const body = {
            email: email,
            description: checkoutCardValue.product_title, 
            amount: (checkoutCardValue.price * checkoutCardValue.quantity) * 100,
            token: token
        };
        axios
            .post("payment", body)
            .then(response => {
                console.log(response);
                alert("Payment Success");                
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };    

    render() {
        const checkoutCardValue = JSON.parse(localStorage.getItem("checkoutCardValue"));
     
        const { shipping } = this.state;

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="mx-auto">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <img className="float-left w-25 mr-5 rounded" style={{ height: "100px" }} src={checkoutCardValue.img} alt="Card image cap" />
                                <div className="text-dark"><b style={{ padding: "10px" }}>Product :</b> {checkoutCardValue.product_title}                                    
                                </div>
                                <div className="text-dark"><b style={{ padding: "10px" }}>Price :</b>{checkoutCardValue.price}
                                    </div>
                                <div className="text-dark"><b style={{ padding: "10px" }}>Quantity :</b>
                                    <button className="btn btn-sm btn-success col-sm-0 mr-1" onClick={e => this.handleQuantity(e, "neg", checkoutCardValue._id)}>
                                        -
                                        </button>
                                    {this.state.quant}
                                    <button className="btn btn-sm btn-success col-sm-0 ml-1" onClick={e => this.handleQuantity(e, "pos", checkoutCardValue._id)}>
                                        +
                                        </button>
                                </div>

                                </li>
                            
                            <li className="list-group-item">
                                <b> Total Quantity : </b>{this.state.quant}
                                <b className="ml-5"> Total Price : </b>{checkoutCardValue.price * this.state.quant}
                            </li>
                            <br></br>
                            {shipping.length == 0 ?
                                <h3>Please Add Shipping Address To Make Payment.</h3>
                                :
                                shipping.map((shippings, i) => (
                                    <li className="list-group-item" key={i} value={shippings}>
                                        <div className="text-dark"><b style={{ padding: "15px" }}>Address :</b> {shippings.address}

                                        </div>
                                        <div className="text-dark"><b style={{ padding: "15px" }}>City :</b>{shippings.city}
                                        </div>
                                        <div className="text-dark"><b style={{ padding: "15px" }}>Postal Code :</b>
                                            {shippings.postal_code}
                                        </div>

                                        <div className="text-dark"><b style={{ padding: "15px" }}>Country :</b>
                                            {shippings.country}
                                        </div>

                                        <div className="text-dark"><b style={{ padding: "15px" }}>Phone :</b>
                                            {shippings.phone}
                                        </div>
                                        <Link to="/update-shipping"><button className="btn btn-sm btn-primary float-right col-md-2 mt-2">
                                            Update
                                        </button></Link>
                                    </li>
                                ))
                            }<br></br>
                            <StripeCheckout
                                className="mx-auto mb-5"
                                stripeKey="pk_test_51HIoqfJgZPhcUayW0FTmFXKqmLsLJYnHDEMBduQLWnEzEAIFEUqqnAfUySBqVK07vJssaPTRkrZVYBxA6vLMHe0e00AcmZP3yv"
                                token={this.handleToken}
                                amount={(checkoutCardValue.price * this.state.quant) * 100}
                                description={checkoutCardValue.product_title}
                                currency='inr'
                                label="Go To Payment" //Component button text
                                panelLabel="Pay" //Submit button in modal
                                billingAddress={false}
                                disabled={shipping.length == 0 ? true : false}
                               
                                />
                        </ul>
                       </div>                   
                </div>
            </div>
        )
    }
}

export default withRouter(AddToCartDetails);
