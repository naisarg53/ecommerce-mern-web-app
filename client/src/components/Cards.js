import React from 'react';
import { getProducts } from './UserFunctions';
import { Link } from 'react-router-dom';
import  axios  from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

class Cards extends React.Component {

    state = {
        data: [],
        searchTerm: ''
    }
     
    async componentDidMount() {
        const fetchedData = await getProducts();

        this.setState({ data: fetchedData })
       // console.log(fetchedData);
    }

    goToCardDetails = (cardId, cardValue) => {
        localStorage.setItem("selectedCard", cardId);
        localStorage.setItem("selectedCardValue", JSON.stringify(cardValue));
        
    }

    updateProduct = (cardId, cardValue) => {
        localStorage.setItem("updateSelectedCard", cardId);
        localStorage.setItem("updateSelectedCardValue", JSON.stringify(cardValue));
    }

    deleteProduct = (id) => {
        axios.delete('products/deleteProduct/' + id)
            .then((res) => {
                console.log('Product successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })

        window.location.reload();
    }

    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    render() {
        const checkUser = localStorage.getItem("email");
        const result = this.state.data.filter(cards => cards.product_title.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

        return (
            <div className="container mt-5 bg-light">
                <div className="col-md-6 mx-auto">
                <div className="form-group ">
                <input
                    type="text"
                    placeholder="Serach Product..."
                    value={this.state.searchTerm}
                        onChange={this.editSearchTerm}
                            className="form-control"
                />
                    </div>
                </div>

                <div className="row">
                    {result.length != 0 && this.state.data.length != 0 && this.state.data.length != undefined ?
                        
                            result.map((cards, i) => (
                                <div className="col-sm-4 mb-5" key={i} value={cards}>
                                    <div className="card border border-primary rounded" style={{ height: "300px" }}>
                                        <Link to="/CardDetails" onClick={() => this.goToCardDetails(i, cards)}><img className="card-img-top" style={{ height: "200px" }} src={cards.img} alt="Card image cap" /></Link>
                                        <div className="card-body">
                                            <h3 className="card-title" style={{ fontSize: "14px" }}>{cards.product_title}</h3>
                                            <p className="card-text" style={{ fontSize: "16px" }}>{cards.price}</p><br></br>
                                            {checkUser === "admin@admin.com" && localStorage.usertoken ?
                                                <div>
                                                    <Link to="/update-product" onClick={() => this.updateProduct(cards._id, cards)}><button className="btn btn-sm float-left btn-success mx-auto col-sm-3 mt-1" >
                                                        Update
                                    </button></Link>
                                                    <button className="btn btn-sm btn-danger mx-auto col-sm-3 mt-1 float-right" onClick={() => this.deleteProduct(cards._id)} >
                                                        Delete
                                    </button>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                </div>                                
                            ))
                        :
                        <div className="container">

                            <div className="row">
                            {Array(12)
                                .fill()
                                .map((item, index) => (
                                    <div className="col-sm-4 mb-5" key={index} value={item}>
                                    <div className="card rounded" style={{ height: "300px" }}>
                                        <Skeleton className="col-sm-3 col-lg-12 p-5" style={{ height: "200px" }} />
                                            <h3 className="card-title" style={{ fontSize: "14px" }}>
                                            <Skeleton className="col-sm-3 col-lg-12 p-2" />
                                        </h3>
                                            <p className="card-text" style={{ fontSize: "16px" }}>
                                            <Skeleton className="col-sm-3 col-lg-12 p-2" />
                                        </p>
                                        </div>
                                    </div>
                                ))}                                                         
                            </div>
                        </div>
                        }

                </div>                
            </div>
        )
    }
}

export default Cards;
//<Link to="/login" key={i} value={cards}>
