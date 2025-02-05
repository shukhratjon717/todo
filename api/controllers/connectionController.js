// api/controllers/ConnectionController.js
module.exports = {
  checkDbConnection: async function (req, res) {
    const client = sails.config.datastores.default.client;

    try {
      if (client) {
        client
          .db()
          .admin()
          .ping((err, result) => {
            if (err) {
              return res.serverError("Error pinging MongoDB: " + err);
            }
            return res.ok("MongoDB connection is successful: " + result);
          });
      } else {
        return res.serverError("MongoDB client is undefined");
      }
    } catch (error) {
      return res.serverError("Error during MongoDB connection check: " + error);
    }
  },
};
