/*
  Warnings:

  - A unique constraint covering the columns `[tipo]` on the table `tipo_registro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tipo_registro_tipo_key" ON "tipo_registro"("tipo");
