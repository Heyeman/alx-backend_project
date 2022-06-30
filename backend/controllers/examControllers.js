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
      Grade: grade.toString(),
    },
  });
  res
    .status(200)
    .json({ Subject: req.subject, Year: req.year, grade, questions });
});

module.exports = { allSubs, allQuestions, questionsByGrade };
/* 
127.0.0.1/euee/euee/		http://localhost/phpmyadmin/index.php?route=/table/structure&db=euee&table=euee#

   Showing rows 0 - 10 (11 total, Query took 0.0187 seconds.) [Subject: BIOLOGY... - SAT MATH...]


SELECT COUNT(*) AS `Rows`, `Subject` FROM `euee` GROUP BY `Subject` ORDER BY `Subject`


Rows	Subject   	
600	Biology	
480	Chemistry	
600	Civics	
455	Economics	
720	English	
600	Geography	
600	History	
780	Mathematics	
300	physics	
210	SAT English	
149	SAT Math	

*/
