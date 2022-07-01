const asyncHandler = require("express-async-handler"),
  { prisma } = require("../config/dbConn");
const allSubs = (req, res) => {
  res.json({
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Civics",
      "English",
      "Economics",
      "Geography",
      "History",
    ],
  });
};
const getQuestions = asyncHandler(async (req, res) => {
  checkParams = {
    Subject: req.subject,
    Year: req.year,
    Stream: req.stream,
  };
  if (req.grade) {
    checkParams["GradeHS"] = req.grade.toString();
  }
  if (req.params.chapter) {
    checkParams["Chapter"] = req.params.chapter.toString();
  }

  const questions = await prisma.euee.findMany({
    where: checkParams,
  });
  if (!questions.length) {
    res.status(400);
    throw new Error("Couldn't fetch questions with these parameters");
  }
  checkParams["numberOfQuestions"] = questions.length;
  checkParams["Questions"] = questions;
  res.emit("successful");
  res.status(200).json(checkParams);
});

const checkAnswers = asyncHandler(async (req, res) => {
  const userAnswers = req.body.answers || [],
    checkParams = {
      Subject: req.subject,
      Year: req.year,
      Stream: req.stream,
    };
  if (req.grade) {
    checkParams["GradeHS"] = req.grade.toString();
  }
  if (req.params.chapter) {
    checkParams["Chapter"] = req.params.chapter.toString();
  }

  const questions = await prisma.euee.findMany({
    where: checkParams,
  });
  if (!questions.length) {
    res.status(400);
    throw new Error("Couldn't fetch questions");
  }

  let answers = {},
    correct = 0,
    incorrect = 0,
    notAnswered = 0,
    invalidQuestion = 0;

  for (let q of questions) {
    answers[q["ID"]] = q["Answer"];
  }
  for (let q of userAnswers) {
    if (q["ID"] in answers) {
      if (answers[q["ID"]] == q["Answer"]) {
        correct += 1;
      } else {
        incorrect += 1;
      }
      delete answers[q["ID"]];
    } else {
      invalidQuestion += 1;
    }
  }

  res.json({
    numberOfQuestions: questions.length,
    answersGotten: Object.keys(userAnswers).length,
    correct,
    incorrect,
    notAnswered,
    invalidQuestion,
  });
});
module.exports = {
  allSubs,
  getQuestions,
  checkAnswers,
};
/* 
Rows	Subject   	
	'Biology'	
	Chemistry	
	Civics	
	
	English	
		
	'History'	
	Mathematics	
	physics	
210	SAT English	
149	SAT Math	

*/
