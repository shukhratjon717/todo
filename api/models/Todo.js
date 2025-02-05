module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    completed: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
