const { User } = require('../models/User');

const resolvers = {
    Query: {
        savedBooks: async () => {
            return User.find({});
        }

        
    }

};

module.exports = resolvers;