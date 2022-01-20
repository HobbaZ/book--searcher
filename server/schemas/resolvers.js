const { User } = require('../models/User');

const resolvers = {
    Query: { //query holds all Get APIs, mutation holds create, delete and update
        user: async () => {
            return User.find();
        },
    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            return User.create({username, email, password});
        },

        login: async () => {

        },

        saveBook: async (parent, {_id, bookId}) => {
            return User.findOneAndUpdate(
                {_id},
                {$push: { savedBooks: bookId}},
                { new: true}
            )
        },

        deleteBook: async (parent, {_id, bookId}) => {
            return User.findOneAndUpdate(
                { _id},
                {$pull: { savedBooks: bookId}},
                { new: true}
            )
        }
    },
};

module.exports = resolvers;