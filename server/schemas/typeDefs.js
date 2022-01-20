const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    * ! means is required
    _id: ID,
    username: String!,
    email: String!,
    password: String!
},
type Query {
    savedBooks: [bookSchema]
    user : [User]
    book(_id: ID!): bookSchema
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
