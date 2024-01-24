import { Prisma } from "@prisma/client";

export const GetTestWithAverageGrade = (UserID: string) => {
     return Prisma.sql` 
SELECT AVG("Grade"."grade") as AverageGrade,
"Test"."TestID", "Test"."Name", "Test"."PassedAt", 
"Test"."GradedAt","Test"."CourseID", "Test"."UserID" 
FROM "Grade" INNER JOIN "Test" ON "Grade"."Test" = "Test"."TestID"
GROUP BY "Test"."TestID"
HAVING "Test"."UserID"=${UserID}`
}