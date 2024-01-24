-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "ProfilePicture" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Email")
);

-- CreateTable
CREATE TABLE "Test" (
    "TestID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "PassedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "GradedAt" TIMESTAMP(3) NOT NULL,
    "CourseID" TEXT NOT NULL DEFAULT '',
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("TestID")
);

-- CreateTable
CREATE TABLE "Course" (
    "CourseID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Field" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Enrollers" INTEGER NOT NULL,
    "TeacherID" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseID")
);

-- CreateTable
CREATE TABLE "Questions" (
    "QuestionID" TEXT NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Points" DOUBLE PRECISION NOT NULL,
    "Test" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("QuestionID")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "FeedBackID" SERIAL NOT NULL,
    "Rate" DOUBLE PRECISION NOT NULL,
    "Comment" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("FeedBackID")
);

-- CreateTable
CREATE TABLE "Grade" (
    "GradeID" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "Test" INTEGER NOT NULL,
    "Student" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("GradeID")
);

-- CreateTable
CREATE TABLE "_StudentCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserID_key" ON "User"("UserID");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_GradeID_key" ON "Grade"("GradeID");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentCourses_AB_unique" ON "_StudentCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentCourses_B_index" ON "_StudentCourses"("B");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_TeacherID_fkey" FOREIGN KEY ("TeacherID") REFERENCES "User"("Email") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_Test_fkey" FOREIGN KEY ("Test") REFERENCES "Test"("TestID") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_Test_fkey" FOREIGN KEY ("Test") REFERENCES "Test"("TestID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_Student_fkey" FOREIGN KEY ("Student") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentCourses" ADD CONSTRAINT "_StudentCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("CourseID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentCourses" ADD CONSTRAINT "_StudentCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("Email") ON DELETE CASCADE ON UPDATE CASCADE;
