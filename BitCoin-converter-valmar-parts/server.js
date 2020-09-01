const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/', function(req, res){

	res.sendFile(__dirname + '/index.html')

})

app.post('/', function(req, res){

	let currency = req.body.currency
	let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`

	request(url, function(error, response, body){

		let data = JSON.parse(response.body)
		let price;
		let inputNum = req.body.inputNum

		if (currency === 'EUR'){
			
			price = data.bpi.EUR.rate_float

		} else {

			price = data.bpi.USD.rate_float

		}

		let result = (inputNum * price).toFixed(2)

		if (inputNum === "" | inputNum === null) {

			res.send('You forgot to input Bitcoins you have!')

		} else {

			res.send(`Your ${inputNum} bitcoins are worth ${result}${currency}.`)

		}

	})

})

app.listen(process.env.PORT || 8080, function(){

	console.log("Server has started.");

})