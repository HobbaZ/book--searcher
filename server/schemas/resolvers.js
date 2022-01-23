const { User } = require('../models/User');
const { signToken } = require('../utils/auth');
const { getApi } = require('../utils/getApi');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: { //query holds all Get APIs, mutation holds create, delete and update

        //Get logged in user by using context
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return { token, user};
        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect email and/or password entered!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect email and/or password entered!');
            }
      
            const token = signToken(user);
            return { token, user };
          },

          //Save book if user logged in
        saveBook: async (parent, {userId, bookId}, context) => {
            if (context.user) {
            return User.findOneAndUpdate(
                {_id: userId},
                {$push: { savedBooks: bookId}},
                { new: true, runValidators: true})
                .then (result => {
                    return{...result}
                })
                .catch (err => {
                    console.error(err)
                })
        }
        throw new AuthenticationError('Please login to add a book!');
    },

        //delete book from user profile only if user logged in
        deleteBook: async (parent, {bookId}, context) => {
            if (context.user) {
            return User.findOneAndUpdate(
                { _id: context.user._id},
                {$pull: { savedBooks: bookId}},
                { new: true, runValidators: true})
                .then (result => {
                    return{...result}
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