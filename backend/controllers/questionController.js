const Question = require("../models/Question")
const Session = require("../models/Session")

// @desc Add addirional question to an existing system
// @route POST /api/question/add
// @access Private

exports.addQuestionToSession = async (req, res) => {
    try {
      const { sessionId, questions } = req.body;
  
      if (!sessionId || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ message: "Invalid input data" });
      }
  
      const session = await Session.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Create new questions
      const createdQuestions = await Question.insertMany(
        questions.map((q) => ({
          session: sessionId,
          question: q.question,
          answer: q.answer,
        }))
      );
  
      // Add question IDs to session
      session.questions.push(...createdQuestions.map((q) => q._id));
      await session.save();
  
      // ✅ Send response
      return res.status(201).json({
        success: true,
        message: "Questions added successfully",
        questions: createdQuestions,
      });
    } catch (error) {
      console.error("❌ Error in addQuestionToSession:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// @desc Pin or unpin a question
// @route POST /api/question/:id/pin
// @access Private

exports.togglePinQuestion = async(req,res)=>{
    try {
        const question = await Question.findById(req.params.id)
        if(!question){
            return res.status(400).json({message:"Question not found"});
        }

        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({success:true, question});

    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}

// @desc Update a note for question
// @route DELETE /api/question/:id/note
// @access Private

exports.updateQuestionNote = async(req,res)=>{
    try {
        const {note} = req.body;
        const question = await Question.findById(req.params.id)

        if(!question){
            return res.status(400).json({message:"Question not found"});
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({success:true, question});
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}