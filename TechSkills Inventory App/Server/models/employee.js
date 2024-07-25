const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  techstack: [
    {
      skill: {
        type: String,
        required: true
      },
      rate: {
        type: Number,
        required: true
      }
    }
  ]
},
{
  timestamps: true
}
);

const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;