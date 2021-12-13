const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { ApolloServer } = require("apollo-server-express")
const { autMiddleware } = require("./utils/auth");


const PORT = process.env.PORT || 3001;

const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: autMiddleware,
})



let start = async function() {
  // Your async task will execute with await
  await server.start().then(r =>console.log("Server started!") )
}
 start()

// server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
