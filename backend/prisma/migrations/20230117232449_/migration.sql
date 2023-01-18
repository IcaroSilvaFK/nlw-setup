/*
  Warnings:

  - A unique constraint covering the columns `[habit_id,day_id]` on the table `day_habits` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "day_habits_day_id_habit_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "day_habits_habit_id_day_id_key" ON "day_habits"("habit_id", "day_id");
