-- CreateTable
CREATE TABLE "registro" (
    "id_registro" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "peso_em_gramas" DECIMAL(10,2) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_curso" INTEGER NOT NULL,

    CONSTRAINT "registro_pkey" PRIMARY KEY ("id_registro")
);

-- AddForeignKey
ALTER TABLE "registro" ADD CONSTRAINT "registro_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;
