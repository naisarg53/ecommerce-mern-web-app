import React, { Component, useState, useEffect } from 'react'
import { Link, withRouter, BrowserRouter } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import axios from 'axios';
import Icon from '../Images/Icon.JPG';

class Cards extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    state = {
        first_name: '',
    }

    componentDidMount() {
        if (localStorage.getItem('usertoken') != null) {
            const email = localStorage.getItem("email");
            // console.log(email);            

            axios.get('users/login/User/' + email)
                .then((res) => {
                    this.setState({ first_name: res.data.msg })
                    
                    //       console.log('User : ' + this.state.first_name);
                }).catch((error) => {
                    console.log(error)
                })
        }
        else {
            this.props.history.push('/')
        }
    }

    reloadPage = () => {
        window.location.reload();
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                < li className="nav-item">                   
                    <Link to="/getCartDetails" className="nav-link">
                        <ShoppingCartIcon />Cart
                    </Link>
                </li>

                <li className="nav-item" >
                    <Link to="/login" className="nav-link">
                        <PersonIcon />SignIn
                    </Link>
                </li>
            </ul>
        )

        const userLink = (           
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                    <li className="nav-item">
                        <Link to="/getCartDetails" className="nav-link">
                            <ShoppingCartIcon />Cart
                    </Link>
                    </li>

                <li className="nav-item">
                    <a href="/#" className="nav-link" onClick={() => this.reloadPage()}>
                        <PersonIcon />{this.state.first_name == '' ? "User" : this.state.first_name}
                        </a>
                    </li>

                    <li className="nav-item">
                    <a href="/#" onClick={this.logOut.bind(this)} className="nav-link">
                        <PowerSettingsNewRoundedIcon />SignOut
                    </a>
                    </li>    
                
            </ul>
        )

        const email = localStorage.getItem("email");

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample10"
                    aria-controls="navbarsExample10"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div><img className="h-3 p-2" src={Icon} alt="NShop" style={{ width: "150px" }} /></div>

                <div
                    className="collapse navbar-collapse justify-content-md-center"
                    id="navbarsExample10"
                >
                    <ul className="navbar-nav">
                        
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <HomeIcon />Home
                            </Link>
                        </li>

                    </ul>
                    
                    {localStorage.usertoken ? userLink : loginRegLink}
                    {email == "admin@admin.com" && localStorage.usertoken ? < ul className="navbar-nav">

                        <li className="nav-item">
                            <Link to="/productRegister" className="nav-link">
                                Add Product
                            </Link>
                        </li> 
                    </ul> :
                        null
                        }
                </div>
            </nav>
        )
    }
}

export default withRouter(Cards)
