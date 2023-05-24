-- CreateTable
CREATE TABLE "Token" (
    "user_id" INTEGER NOT NULL,
    "refreshToken" VARCHAR(255) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
