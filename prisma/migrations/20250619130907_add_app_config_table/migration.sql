-- CreateTable
CREATE TABLE "app_config" (
    "id" SERIAL NOT NULL,
    "is_initialized" BOOLEAN NOT NULL DEFAULT false,
    "last_initialized_at" TIMESTAMP(3),

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("id")
);
