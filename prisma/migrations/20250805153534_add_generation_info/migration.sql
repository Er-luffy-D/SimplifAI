/*
  Warnings:

  - Added the required column `updatedAt` to the `ParsedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."GenerationStatus" AS ENUM ('not_generated', 'processing', 'success', 'error');

-- CreateEnum
CREATE TYPE "public"."ResponseFormat" AS ENUM ('none', 'text', 'json');

-- AlterTable
ALTER TABLE "public"."ParsedDocument" ADD COLUMN     "generatedContent" TEXT,
ADD COLUMN     "generationStatus" "public"."GenerationStatus" NOT NULL DEFAULT 'not_generated',
ADD COLUMN     "responseFormat" "public"."ResponseFormat" NOT NULL DEFAULT 'none',
ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
