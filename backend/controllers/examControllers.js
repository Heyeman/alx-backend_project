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
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await prisma.euee.findMany({
    where: {
      Subject: req.subject,
      Year: req.year,
      Stream: req.stream,
    },
  });
  res.status(200).json({
    Subject: req.subject,
    Year: req.year,
    numberOfQuestions: questions.length,
    questions,
  });
});
const getQuestionsByGrade = asyncHandler(async (req, res) => {
  let grade = req.grade;
  const questions = await prisma.euee.findMany({
    where: {
      Subject: req.subject.toLowerCase(),
      Year: req.year,
      GradeHS: grade.toString(),
    },
  });
  if (questions.length === 0) {
    res.status(400);
    throw new Error(
      "Invalid grade entered or questions from this chapter are not labeled yet"
    );
  }
  res.status(200).json({
    Subject: req.subject,
    Year: req.year,
    grade,
    numberOfQuestions: questions.length,
    questions,
  });
});

const getQuestionsByChapter = asyncHandler(async (req, res) => {
  let chapter = req.params.chapter,
    grade = req.grade;
  const questions = await prisma.euee.findMany({
    where: {
      Subject: req.subject.toLowerCase(),
      Year: req.year,
      GradeHS: grade.toString(),
      Chapter: chapter,
    },
  });
  if (questions.length === 0) {
    res.status(400);
    throw new Error(
      "Invalid chapter entered or questions from this chapter are not labeled yet"
    );
  }
  res.status(200).json({
    Subject: req.subject,
    Year: req.year,
    grade,
    chapter,
    numberOfQuestions: questions.length,
    questions,
  });
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
  if (req.chapter) {
    checkParams["Chapter"] = req.chapter.toString();
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
  getAllQuestions,
  getQuestionsByGrade,
  getQuestionsByChapter,
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
