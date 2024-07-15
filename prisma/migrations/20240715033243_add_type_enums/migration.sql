-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('Person', 'Company');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('PDF', 'PNG');

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "minimum_search_percentage" DOUBLE PRECISION NOT NULL,
    "max_investors_levels" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InvestorType" NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "investors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shares" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "investor_id" INTEGER NOT NULL,
    "share_percentage" DOUBLE PRECISION NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "share_id" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" "FileType" NOT NULL,
    "file_data" BYTEA NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_code_key" ON "companies"("code");

-- CreateIndex
CREATE INDEX "companies_code_idx" ON "companies"("code");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shares" ADD CONSTRAINT "shares_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "shares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
