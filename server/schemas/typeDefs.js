const { gql } = require('apollo-server-express');

// ! means is required

const typeDefs = gql`

type User {
    _id: ID,
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
},

type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
},

input bookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Mutation {

    createUser(username: String!, password: String!, email:String!): Auth

    login(username: String!, password: String!): Auth

    saveBook(book: bookInput): User

    deleteBook(bookId: String!): User
}

`;

module.exports = typeDefs;
