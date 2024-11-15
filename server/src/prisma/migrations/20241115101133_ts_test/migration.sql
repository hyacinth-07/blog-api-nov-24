-- CreateTable
CREATE TABLE "TestObject" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TestObject_id_key" ON "TestObject"("id");
