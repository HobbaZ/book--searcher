const getApi = { 
    async api() { 
      return (await fetch("https://www.googleapis.com/books/v1/volumes?q="))
    },
};
  
module.exports = getApi