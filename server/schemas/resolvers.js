const { User } = require('../models/User');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: { //query holds all Get APIs, mutation holds create, delete and update

        //Get logged in user by using context
        me: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findOne({ _id: context.user._id });
              return { user };
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return { token, user}
        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Email or password incorrectly entered!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Email or password incorrectly entered!');
            }
      
            const token = signToken(user);
            return { token, user };
          },

          //Save book if user logged in
        saveBook: async (parent, args, context) => {
            if (context.user) {
            return await User.findOneAndUpdate(
                {_id: context.User._id},
                {$push: { savedBooks: args}},
                { new: true})
                .then (result => {
                    return{result}
                })
                .catch (err => {
                    console.error(err)
                })
        }
        throw new AuthenticationError('Please login to add a book!');
    },

        deleteBook: async (parent, {bookId}, context) => {
            if (context.user) {
            return await User.findOneAndUpdate(
                { _id: context.user._id},
                {$pull: { savedBooks: {bookId: bookId}}},
                { new: true})
                .then (result => {
                    return{result}
                })
                .catch (err => {
                    console.error(err)
                })
        }
        throw new AuthenticationError('Please login to delete a book!');
    },

},
};

module.exports = resolvers;