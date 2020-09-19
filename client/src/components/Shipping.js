import React, { Component } from 'react'
import { shipping } from './UserFunctions'

class Shipping extends Component {
    constructor() {
        super()
        this.state = {
            user_id: '',
            address: '',
            city: '',
            postal_code: '',
            country: '',
            phone: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }    

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        const email = localStorage.getItem("email");
        this.setState({ user_id: email });

    }
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            user_id: this.state.user_id,
            address: this.state.address,
            city: this.state.city,
            postal_code: this.state.postal_code,
            country: this.state.country,
            phone: this.state.phone
        }
       // console.log(newUser);
        shipping(newUser).then(res => {
        })
    }
   
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Shipping</h1>
                            <div className="form-group">
                                <label htmlFor="name">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter your Address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    placeholder="Enter your City"
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Postal Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="postal_code"
                                    placeholder="Enter Postal Code"
                                    value={this.state.postal_code}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    placeholder="Enter your Country"
                                    value={this.state.country}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter your Mobile Number"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shipping
