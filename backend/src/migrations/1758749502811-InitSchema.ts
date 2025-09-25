import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1758749502811 implements MigrationInterface {
    name = 'InitSchema1758749502811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "rol" character varying NOT NULL DEFAULT 'cliente'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "activo" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD "compradorNombre" character varying`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD "compradorDocumento" character varying`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD "compradorEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD "fechaValidacion" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "codigoReferido" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."afiliados_tipo_enum" AS ENUM('BOLETOS', 'COMISION')`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "tipo" "public"."afiliados_tipo_enum" NOT NULL DEFAULT 'BOLETOS'`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "boletosVendidos" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "comisionTotal" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP CONSTRAINT "UQ_dcdecb247c4b4597cdcd8370bf0"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_dcdecb247c4b4597cdcd8370bf" ON "afiliados" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0fb5b8a2586823971357473073" ON "afiliados" ("codigoReferido") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0fb5b8a2586823971357473073"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcdecb247c4b4597cdcd8370bf"`);
        await queryRunner.query(`ALTER TABLE "afiliados" ADD CONSTRAINT "UQ_dcdecb247c4b4597cdcd8370bf0" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "comisionTotal"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "boletosVendidos"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "tipo"`);
        await queryRunner.query(`DROP TYPE "public"."afiliados_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "afiliados" DROP COLUMN "codigoReferido"`);
        await queryRunner.query(`ALTER TABLE "boletos" DROP COLUMN "fechaValidacion"`);
        await queryRunner.query(`ALTER TABLE "boletos" DROP COLUMN "compradorEmail"`);
        await queryRunner.query(`ALTER TABLE "boletos" DROP COLUMN "compradorDocumento"`);
        await queryRunner.query(`ALTER TABLE "boletos" DROP COLUMN "compradorNombre"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activo"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rol"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

}
