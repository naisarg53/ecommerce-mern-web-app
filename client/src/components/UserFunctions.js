import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log('Registered')
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)

        })
}

export const getProducts = async () => {
    try {
        const { data } = await axios.get('products/getProducts');

        const modifiedData = data.map((product) => ({
            _id: product._id,
            product_title: product.product_title,
            price: product.price,
            img: product.img,
            category: product.category,
            quantity: product.quantity,
            description: product.description
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const getCartDetails = async () => {
    try {
        const user_id = localStorage.getItem("email");
        
        const { data } = await axios.get('carts/getProducts/getCart/' + user_id);
 //       console.log({ data });
        const modifiedData = data.map((cart) => ({
            user_id: cart.user_id,
            _id: cart._id,
            product_title: cart.product_title,
            price: cart.price,
            img: cart.img,
            category: cart.category,
            quantity: cart.quantity,
            description: cart.description
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const getShippingLocation = async () => {
    try {
        const user_id = localStorage.getItem("email");

        const { data } = await axios.get('shippings/shipping/' + user_id);
      //  console.log({ data });
        const modifiedData = data.map((shipping) => ({
            user_id: shipping.user_id,
            address: shipping.address,
            city: shipping.city,
            postal_code: shipping.postal_code,
            country: shipping.country,
            phone: shipping.phone,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const shipping = newUser => {
    return axios
        .post('shippings/shipping', {
            user_id: newUser.user_id,
            address: newUser.address,
            city: newUser.city,
            postal_code: newUser.postal_code,
            country: newUser.country,
            phone: newUser.phone
        })
        .then(response => {
            console.log('Shipping Added...')
        })
}
