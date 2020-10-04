import React from 'react';
import { getCartDetails } from './UserFunctions';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddToCartDetails extends React.Component {

    state = {
        data: [],
    }

    async componentDidMount() {
        const fetchedData = await getCartDetails();       

        this.setState({ data: fetchedData });
      //  console.log(this.state.data);

      
    }

    goToCardDetails = (cardId, cardValue) => {

       
            localStorage.setItem("checkoutCard", cardId);
            localStorage.setItem("checkoutCardValue", JSON.stringify(cardValue));
            // this.props.history.push('/login');
            // const dataValues = Object.values(data);
            // localStorage.setItem("data", dataValues);
        //    console.log(cardId);
      //  console.log(JSON.stringify(cardValue));
        
    }    

    deleteCartProduct = (id) => {
        
        axios.delete('carts/deleteProduct/' + id)
            .then((res) => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
        window.location.reload();
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container mt-5">
                <div className="row">                    
                        <div>
                        <ul className="list-group">
                            {localStorage.getItem('usertoken') != null ? 

                                data.map((cards, i) => (
                                <li className="list-group-item" key={i} value={cards}>
                                    <img className="float-left w-25 mr-5 rounded" style={{ height: "100px" }} src={cards.img} alt="Card image cap" />
                                    <div className="text-dark"><b style={{ padding: "10px" }}>Product :</b> {cards.product_title}                                        
                                    </div>
                                    <div className="text-dark"><b style={{ padding: "10px" }}>Price :</b>{cards.price}                                        
                                        </div>
                                        <div className="text-dark"><b style={{ padding: "10px" }}>Quantity :</b>
                                            {cards.quantity}
                                        </div>
                                        <Link to="/CheckoutSteps" onClick={() => this.goToCardDetails(i, cards)}><button className="btn btn-sm btn-primary float-left col-md-2 col-sm-2 col-lg-2 mt-2">
                                            CheckOut
                                        </button></Link>
                                    <button className="btn btn-sm btn-danger float-right col-md-2 col-sm-2 col-lg-2 mt-2" onClick={() => this.deleteCartProduct(cards._id)}>
                                        Delete
                                        </button>
                                    

                                </li>
                                )) :
                                null
                            }
                            {localStorage.getItem('usertoken') != null && data.length != 0 ?

                                <li className="list-group-item">
                                    <b> Total Quantity : </b>{data.reduce((totalQuantity, quantity) => totalQuantity + quantity.quantity, 0)}
                                    <b className="ml-5"> Total Price : </b>{data.reduce((totalPrice, price) => totalPrice + price.price, 0)}
                                </li> :
                                <div className="list-group-item mx-auto">
                                    <h3 className="col-md-6 mt-4 p-3">Your Cart is Empty</h3>

                                    <Link to="/"><button className="btn btn-sm btn-primary col-md-6 mt-4 p-3">
                                        Let's Shop
                                        </button></Link>
                                </div>                                
                            }
                        </ul>
                       </div>                   
                </div>
            </div>
        )
    }
}

export default AddToCartDetails;
