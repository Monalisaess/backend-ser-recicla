/*
  Warnings:

  - You are about to drop the column `tipo` on the `registro` table. All the data in the column will be lost.
  - Added the required column `id_tipo_registro` to the `registro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro" DROP COLUMN "tipo",
ADD COLUMN     "id_tipo_registro" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipo_registro" (
    "id_tipo_registro" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "tipo_registro_pkey" PRIMARY KEY ("id_tipo_registro")
);

-- AddForeignKey
ALTER TABLE "registro" ADD CONSTRAINT "registro_id_tipo_registro_fkey" FOREIGN KEY ("id_tipo_registro") REFERENCES "tipo_registro"("id_tipo_registro") ON DELETE RESTRICT ON UPDATE CASCADE;
