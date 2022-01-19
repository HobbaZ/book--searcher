const { gql } = require('apollo-server-express');

const typeDefs = gql`
type bookSchema {
    _id: ID,
    authors: String,
    description: String,
    bookId: String,
    image: String,
    link: String,
    title: String
},

type userSchema {
    _id: ID,
    username: String,
    email: String,
    password: String
},
type Query {
    savedBooks: [bookSchema]
}
`;


module.exports = typeDefs;
