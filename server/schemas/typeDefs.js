const { gql } = require('apollo-server-express');

// ! means is required

const typeDefs = gql`

type User {
    _id: ID,
    username: String!,
    email: String!,
    password: String!,
    savedBooks: [String]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    savedBooks: [bookSchema]
    user(userId: ID!): User
    book(bookId: ID!): bookSchema
    me: User
},

type bookSchema {
    _id: ID,
    authors: String,
    description: String,
    bookId: String,
    image: String,
    link: String,
    title: String
},

type Mutation {
    *Copy routes from user-controller, insert needed params
    createUser(username: String!, password: String!, email:String!): User

    login(username: String!, password: String!): User

    saveBook(authors: String, description: String, bookId: String, image: String, link: String, title: String!): User

    deleteBook(bookId: String!): User
}

`;

module.exports = typeDefs;
