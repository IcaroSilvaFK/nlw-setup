/*
  Warnings:

  - A unique constraint covering the columns `[day_id,habit_id]` on the table `day_habits` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[habit_id,week_day]` on the table `habit_week_days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "day_habits_day_id_key";

-- DropIndex
DROP INDEX "day_habits_habit_id_key";

-- DropIndex
DROP INDEX "habit_week_days_habit_id_key";

-- DropIndex
DROP INDEX "habit_week_days_week_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");
