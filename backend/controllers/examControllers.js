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
  res.status(200).json({ Subject: req.subject, Year: req.year, questions });
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
      Chapter: chapter.toString(),
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
module.exports = {
  allSubs,
  getAllQuestions,
  getQuestionsByGrade,
  getQuestionsByChapter,
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
