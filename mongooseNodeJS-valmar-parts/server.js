const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/fruitDB', { useNewUrlParser: true, useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Error: no name"],
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema)

//const fruit = new Fruit({
//	name: "Apple",
//	rating: 8,
//	review: "Sweet and crunchy"
//})

//const banana = new Fruit({
//	name: "Banana",
//	rating: 4,
//	review: "Really yellow"
//})

//const lemon = new Fruit({
//	name: "Lemon",
//	rating: 10,
//	review: "Sour af"
//})

//Fruit.insertMany([banana, lemon], (error) => {

//	if (error) {

//		console.log(err)

//	} else {

//		console.log("Fruit added")

//	}

//})

//const fruit = new Fruit({
//	name: "Apple",
//	rating: 11,
//	review: "Sweet and crunchy"
//})

//const fruit = new Fruit({
//	rating: 10,
//	review: "Hella good",
//})

//const orange = new Fruit({
//	name: "orange",
//	rating: 8
//})

//orange.save()

//fruit.save()

//Fruit.find(function (error, fruits) {

//	if (error) {

//		console.log(error)

//	} else {

//		fruits.forEach((fruit) => {

//			console.log(fruit.name)

//		})
		
//	}

//})

//Fruit.update(

//	{ _id: "5e8f2d6d71d04d1c948f607e" },
//	{ review: "Juicy fruit" },
//	function (error) {

//		if (error) {

//			console.log(error)

//		} else {

//			console.log("Record updated")

//		}

//	}

//)

Fruit.deleteMany({ name: "orange" }, function (error) {

	if (error) {

		console.log(error)

	} else {

		console.log("Orange deleted")
		
	}

})



const personSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	age: Number
})

const Person = mongoose.model("Person", personSchema)

//const person = new Person({
//	firstName: "John",
//	lastName: "Doe",
//	age: 29
//})

//const steve = new Person({
//	firstName: "Steve",
//	lastName: "Highjack",
//	age: 22
//})

//const paul = new Person({
//	firstName: "Paul",
//	lastName: "Hike",
//	age: 55
//})

//Person.insertMany([steve, paul], (error) => {

//	if (error) {

//		console.log(err)

//	} else {

//		console.log("Persom added")

//	}

//})

//person.save()

//Person.find(function (error, people) {

//	if (error) {

//		console.log(error)

//	} else {

//		people.forEach((person) => {

//			console.log(person.firstName, person.lastName, person.age)

//		})

//	}

//})

//Person.update(

//	{ _id: "5e8f26541e459c07b08dbcbb" },
//	{ age: 30 },
//	function (error) {

//		if (error) {

//			console.log(error)

//		} else {

//			console.log("Person updated")
//		}

//	}

//)

app.listen(3000, () => {
	console.log("Server is Running on Port 3000")
})