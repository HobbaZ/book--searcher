const { User } = require('../models');

const resolvers = {
    Query: {
        savedBooks: async () => {
            return savedBooks.find({});
        }

        
    }

};

module.exports = resolvers;