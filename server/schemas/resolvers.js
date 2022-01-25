const { User } = require('../models/User');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: { //query holds all Get APIs, mutation holds create, delete and update

        //Get logged in user by using context
        me: async (parent, args, context) => {
        try {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
        catch (err) {
            console.log(err);
        }
    },
},

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            try {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return { token, user}
        } 
        catch (err) {
            console.log(err);
        }},
        
        login: async (parent, { email, password }) => {
            try {
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
          }
          catch (err) {
              console.log(err);
          }},

          //Save book if user logged in
        saveBook: async (parent, args, context) => {
            try {
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
    }
    catch (err) {
        console.log(err)
    }},

        deleteBook: async (parent, {bookId}, context) => {
            try {
            if (context.user) {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id},
                {$pull: { savedBooks: {bookId: bookId}}},
                { new: true});
                return user;
                
        }
        throw new AuthenticationError('Please login to delete a book!');
    }
    catch (err) {
        console.log(err)
    }},
},
};

module.exports = resolvers;