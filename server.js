const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express()


// Create a schema
const schema = buildSchema(`
enum MealTime {
  breakfast
  lunch 
  dinner
}

enum Genre {
  indie
  rap
  alternative
}

type DiceRoll {
  total: Int!
  sides: Int!
  rolls: [Int!]!
}

type About {
  message: String!
}

type Pet {
  name: String!
  species: String!
}

type getTime {
  hour: Int!
  second: Int!
  minute: Int!
}

type Query {
  getAbout: About
    getmeal(time: MealTime!): Meal

  getPet(id: Int!): Pet
  allPets: [Pet!]!
  allBands: [Band!]!
  getBand(index: Int!): Band
  firstBand: Band
  getTime: getTime
  getRandom(range: Int!): getRandom
  DiceRoll(sides: Int!, rolls: Int!): DiceRoll
}

type getRandom {
  number: Int!
}

type Band {
  name: String!
  genre: Genre!
}

type Meal {
  description: String!
}`)

const petList = [
    { name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' }
]

const bandList = [
    { name: "The Strokes", genre: "Alternative"},
    { name: "Mt. Joy", genre: "Indie"},
    { name: "Kanye West", genre: "Rap"}
]


// Define a resolver
const root = {
    getAbout: () => {
      return { message: 'Hello World' }
    }, 

    getmeal: ({ time }) => {
        const allMeals = { breakfast: "toast", lunch: "noodles", dinner: "pizza"}
        const meal = allMeals[time]
        return { description: meal}
    },
    getPet: ({ id }) => {
        return petList[id]
    },
    allPets: () => {
        return petList
    },
    allBands: () => {
        return bandList
    },
    getBand: ({ index }) => {
        return bandList[index]
    },
    firstBand: () => {
        return bandList[0]
    },
    getTime: () => {
        return {second: 25, minute: 30, hour: 1}
    },
    getRandom: ({range}) => {
        const myNum = Math.floor(Math.random() * range) + 1
        console.log(myNum)
        return { number: myNum }
    },
    DiceRoll: ({sides, rolls}) => {
        const rollList = []
        let currentRoll = 0

        for(let i=0; i < rolls; i++) {
            currentRoll = Math.floor(Math.random() * sides) + 1
            rollList.push(currentRoll)
            currentRoll = 0
        }

        var sum = rollList.reduce(function(a,b){
            return a+b;
        }, 0)

        return { total: sum, sides: sides, rolls: rollList}
    }
  }

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root, 
    graphiql: true
}))

const port = 4000;

app.listen(port, () => {
    console.log(`running on port ${port}`)
})

