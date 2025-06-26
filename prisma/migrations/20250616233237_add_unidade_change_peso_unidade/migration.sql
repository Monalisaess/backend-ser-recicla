/*
  Warnings:

  - You are about to drop the column `peso_em_gramas` on the `registro` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `registro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UNIDADE" AS ENUM ('GRAMAS', 'UNIDADES');

-- AlterTable
ALTER TABLE "registro" DROP COLUMN "peso_em_gramas",
ADD COLUMN     "quantidade" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unidade" "UNIDADE" NOT NULL DEFAULT 'GRAMAS';
