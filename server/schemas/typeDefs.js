const { gql } = require('apollo-server-express');

// ! means is required

const typeDefs = gql`

type User {
    _id: ID,
    username: String!
    email: String!
    password: String!
    savedBooks: [String]
}

type Search {
    searchQuery: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    searchQuery: Search
},

type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
},

type Mutation {

    createUser(username: String!, password: String!, email:String!): User

    login(username: String!, password: String!): User

    saveBook(authors: String, description: String, bookId: String, image: String, link: String, title: String!): User

    deleteBook(bookId: String!): User
}

`;

module.exports = typeDefs;
