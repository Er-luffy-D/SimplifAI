-- CreateTable
CREATE TABLE "ParsedDocument" (
    "id" TEXT NOT NULL,
    "docName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ParsedDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParsedDocument" ADD CONSTRAINT "ParsedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
