-- CreateTable
CREATE TABLE "curso" (
    "id_curso" SERIAL NOT NULL,
    "nome_curso" TEXT NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateIndex
CREATE UNIQUE INDEX "curso_nome_curso_key" ON "curso"("nome_curso");
