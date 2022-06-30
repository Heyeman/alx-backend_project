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
const allQuestions = asyncHandler(async (req, res) => {
  const questions = await prisma.euee.findMany({
    where: {
      Subject: req.subject,
      Year: req.Year,
    },
  });
  res.status(200).json({ Subject: req.subject, Year: req.year, questions });
});
const questionsByGrade = asyncHandler(async (req, res) => {
  let grade = req.params.grade;
  if (!(grade == 12 || grade == 11)) {
    res.status(400);
    throw new Error("Invalid grade. Grade should be 11 or 12.");
  }
  const questions = await prisma.euee.findMany({
    where: {
      Subject: req.subject.toLowerCase(),
      Year: req.Year,
      GradeHS: grade.toString(),
    },
  });
  res
    .status(200)
    .json({ Subject: req.subject, Year: req.year, grade, questions });
});

module.exports = { allSubs, allQuestions, questionsByGrade };
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
