module.exports = {
  // Create a new Todo item
  create: async function (req, res) {
    const { title } = req.body;
    try {
      const todo = await Todo.create({ title }).fetch();
      return res.status(201).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Get all Todo items
  getAll: async function (req, res) {
    try {
      const todos = await Todo.find();
      return res.status(200).json(todos);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Update a Todo item
  update: async function (req, res) {
    const { id } = req.params;
    const { completed } = req.body;
    try {
      const todo = await Todo.updateOne({ id }).set({ completed });
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Delete a Todo item
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      const todo = await Todo.destroyOne({ id });
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
