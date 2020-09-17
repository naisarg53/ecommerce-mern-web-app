import React from 'react';

import axios from 'axios';

class CardDetails extends React.Component {
    constructor() {
        super();
        
        this.state = {
            user_id: '',
            product_title: '',
            price: '',
            img: '',
            category: '',
            quantity: '',
            description: '',
            error: {}
        }

        this.handleCategory = this.handleCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value })

        const selectedCardValue = JSON.parse(localStorage.getItem("selectedCardValue"));
        //console.log(selectedCardValue.product_title);
        const email = localStorage.getItem("email");
        this.setState({ user_id: email });
        this.setState({ product_title: selectedCardValue.product_title });
        this.setState({ price: selectedCardValue.price });
        this.setState({ img: selectedCardValue.img });
        this.setState({ description: selectedCardValue.description });
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (localStorage.getItem('usertoken') == null) {
            this.props.history.push(`/login`)
        }
        else {
            const form = new FormData();
            form.append('user_id', this.state.user_id);
            form.append('product_title', this.state.product_title);
            form.append('price', this.state.price);
            form.append('img', this.state.img);
            form.append('category', this.state.category);
            form.append('quantity', this.state.quantity);
            form.append('description', this.state.description);
            console.log(this.state.img);
            console.log(form);
            axios.post("carts/productRegister/addToCart", form, {}).then(res => {
                if (res) {
                    this.props.history.push(`/getCartDetails`)
                }
                console.log(res)
            })
        }
    }

    render() {

        const selectedCardValue = JSON.parse(localStorage.getItem("selectedCardValue"));

        return (
            <div className="container">
                <div className="float-left mt-3">                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <img src={selectedCardValue.img}
                                className="float-left rounded col-lg-4 col-md-6 col-sm-4"
                                className="form-control"
                                style={{ height: "250px" }}
                                onChange={this.handleCategory}
                                type="text"
                                alt="No Image Available"
                            >
                            </img>
                        </div>
                        <div className="form-group">
                            <h4
                                type="text"
                                className="form-control"
                                className="col-sm-6"
                                name="product_title"
                                onChange={this.handleCategory}
                            >
                             Product :   {selectedCardValue.product_title}
                            </h4>
                        </div>
                        <div className="form-group">
                            <p
                                type="text"
                                className="form-control"
                                className="col-sm-6"
                                name="price"
                                onChange={this.handleCategory}
                            >
                               <b>Price</b> : {selectedCardValue.price}
                            </p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1"><b className="ml-3">Select Category</b> :</label>
                            <select className="form-control"
                                id="exampleFormControlSelect1"
                                type="text"
                                className="col-sm-4 ml-2"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleCategory}
                                required
                            >
                                <option value="">None</option>
                                <option>L</option>
                            <option>M</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name"><b className="ml-3">Quantity</b>: </label>
                            <input
                                type="text"
                                className="form-control"
                                className="col-sm-4 ml-2"
                                name="quantity"
                                placeholder="Enter quantity"
                                value={this.state.quantity}
                                onChange={this.handleCategory}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <p
                                type="text"
                                className="form-control"
                                className="col-sm-4 "
                                name="description"
                                onChange={this.handleCategory}
                            >
                                <b>Description</b> : {selectedCardValue.description}
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-sm btn-primary btn-block w-50 col-sm-4"
                        >
                            Add To Cart
                    </button>
                        </form>
        
                </div>
            </div>
        )
    }
}

export default CardDetails;
