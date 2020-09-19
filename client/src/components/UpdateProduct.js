import React, { Component } from 'react'

import axios from 'axios';

class UpdateProduct extends Component {
    constructor() {
        super()
        this.state = {
            product_title: '',
            price: '',
            img: '',
            category: '',
            quantity: '',
            description: '',
            error: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        // console.log([e.target.name]);
    }

    handleImageChange = e => {
        this.setState({ img: e.target.files[0] });
     //   console.log(e.target.files[0]);
    };

    onSubmit(e) {
        e.preventDefault()
        const form = new FormData();
        form.append('product_title', this.state.product_title);
        form.append('price', this.state.price);
        form.append('img', this.state.img);
        form.append('category', this.state.category);
        form.append('quantity', this.state.quantity);
        form.append('description', this.state.description);
      
        const updateProduct = JSON.parse(localStorage.getItem("updateSelectedCardValue"));
        axios.put("products/update-product/" + updateProduct._id, form, {}).then(res => {
            if (res) {
                this.props.history.push(`/`)
            }
            console.log(res)
        })

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Update Product</h1>
                            <div className="form-group">
                                <label htmlFor="name">Product Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="product_title"
                                    placeholder="Enter product name"
                                    value={this.state.product_title}                                    
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    placeholder="Enter product price"
                                    value={this.state.price}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label htmlFor="file">Select Product Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="img"
                                    placeholder="Choose Image"
                                    value={this.state.name}
                                    onChange={this.handleImageChange}
                                    alt="Unknown Image"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Enter product Category"
                                    value={this.state.category}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="quantity"
                                    placeholder="Enter product Quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter product Description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Update Product
              </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateProduct
