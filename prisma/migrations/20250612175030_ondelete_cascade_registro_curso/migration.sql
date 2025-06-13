-- DropForeignKey
ALTER TABLE "registro" DROP CONSTRAINT "registro_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "registro" DROP CONSTRAINT "registro_id_tipo_registro_fkey";

-- AddForeignKey
ALTER TABLE "registro" ADD CONSTRAINT "registro_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id_curso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registro" ADD CONSTRAINT "registro_id_tipo_registro_fkey" FOREIGN KEY ("id_tipo_registro") REFERENCES "tipo_registro"("id_tipo_registro") ON DELETE CASCADE ON UPDATE CASCADE;
