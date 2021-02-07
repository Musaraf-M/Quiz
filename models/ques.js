const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
     results: { 
         type: Object, 
         required: true,
         question: {
             type:String,
             required: false
         },    
         correct_answer: { 
              type: String, 
              required: false
         },
         incorrect_answers: { 
             type: String, 
             required: false
         }
    }
});

module.exports = mongoose.model("Question", QuestionSchema);