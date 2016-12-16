const axios = require("axios");
const token = "3637b8b39f4a33a248c4f296436d49b0ad45f60ffaacdef1";
const request = require("request");
// const http = require("http");
// var querystring = require("querystring");

module.exports = {
    // PRODUCTS
    getProducts: function(req, res) {
        axios.get("http://staging.ecomm.com/api/products?token="+token)
            .then((response) => {
                res.send(response.data);
            })
        .catch((err) => {
            res.send(err);
        });
    },
    getProduct: function(req, res, query) {
        axios.get("http://staging.ecomm.com/api/products/"+query
            +"?token="+
            token)
            .then((response) => {
                res.send(response.data);
            })
        .catch((err) => {
            res.send(err);
        });
    },

    // CART
    getCart: function(req, res) {
        axios.get("http://staging.ecomm.com/api/orders/R540018862"+
            "?token="+token)
            .then((response) => {
                res.send(response.data);
            })
        .catch((err) => {
            res.send(err);
        });
    },

    // USERS
    loginUser: function() {
        let email = 'adrian.sarkany@clever-software-solutions.com';
        let password = 'mareparola';
        request.post({
            headers: {'Content-Type': 'application/json'},
            url: 'http://staging.ecomm.com/login',
            body: {
                'spree_user': {
                    'email': email,
                    'password': password,
                    'remember_me': "0"
                }
            },
            function(error, response, body){
                console.log(body);
            }
        });
    }

    // loginUser: function(req, res) {
    //     console.log(req.body);
    //     const {email, password} = req.body;
    //     let data = {
    //         'spree_user': {
    //             'email': email,
    //             'password': password,
    //             'remember_me': "0"
    //         }
    //     };
    //     let config = {
    //         method: 'post',
    //         baseURL: 'http://staging.ecomm.com',
    //         url: '/login',
    //         data: data,
    //         headers: {'Content-Type': 'application/json'}
    //     };
    //     // console.log(config);
    //     axios.request(config)
    //     .then((response) => {
    //         console.log(response);
    //         res.send(response);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.send(err);
    //     });
    // }

    // loginUser: function() {
    //     var request = new XMLHttpRequest();
    //     request.open('POST', 'http://staging.ecomm.com/login');
    //     request.setRequestHeader('Content-Type', 'application/json');
    //     request.onload = function() {
    //         if(request.status === 200){
    //             var userInfo = JSON.parse(request.responseText);
    //             console.log(userInfo);
    //         }
    //     };
    //     request.send(JSON.stringify({
    //         email: 'adrian.sarkany@clever-software-solutions.com',
    //         password: 'mareparola',
    //         remember_me: "0"
    //     }));
    // }

    // loginUser: function(req, res) {
    //     const {email, password} = req.body;
    //     let data = querystring.stringify({
    //         email: email,
    //         password: password,
    //         remember_me: "0"
    //     });

    //     let config = {
    //         method: 'post',
    //         url: 'http://staging.ecomm.com/login',
    //         data: data,
    //         responseType: 'application/json',
    //         headers: {'Content-Type': 'application/json'}
    //     };

    //     let request = http.request(config, function(res) {
    //         res.setEncoding('utf8');
    //         res.on('data', function(response) {
    //             console.log(response);
    //         });
    //     });

    //     request.write(data);
    //     request.end();
    // }

};