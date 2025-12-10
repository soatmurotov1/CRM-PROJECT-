-- DropIndex
DROP INDEX "teacherGroups_teacherId_groupId_key";

-- AlterTable
ALTER TABLE "teacherGroups" ADD CONSTRAINT "teacherGroups_pkey" PRIMARY KEY ("id");
