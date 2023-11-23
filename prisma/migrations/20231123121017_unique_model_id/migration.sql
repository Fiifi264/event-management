/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Events_eventId_key" ON "Events"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
