/*
  Warnings:

  - Added the required column `eventId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "eventId" TEXT DEFAULT '1' NOT NULL;
