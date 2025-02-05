

module.exports.routes = {
  

  "/": { view: "pages/homepage" },
  "POST /todo": "TodoController.create",
  "GET /todo": "TodoController.getAll",
  "PUT /todo/:id": "TodoController.update",
  "DELETE /todo/:id": "TodoController.delete",


};
