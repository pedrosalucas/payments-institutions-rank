-- CreateTable
CREATE TABLE "tb_irregularidade_por_if" (
    "id" SERIAL NOT NULL,
    "ds_ano" INTEGER NOT NULL,
    "ds_trimestre" VARCHAR(2) NOT NULL,
    "ds_categoria" VARCHAR(100) NOT NULL,
    "tp_instituicao" VARCHAR(50) NOT NULL,
    "ds_cnpj_if" VARCHAR(11),
    "nm_instituicao_financeira" VARCHAR(150) NOT NULL,
    "ds_irregularidade" VARCHAR(250),
    "qtd_reclamacoes_reguladas_procedentes" INTEGER DEFAULT 0,
    "qtd_reclamacoes_reguladas_outras" INTEGER DEFAULT 0,
    "qtd_reclamacoes_nao_reguladas" INTEGER DEFAULT 0,
    "qtd_total_reclamacoes" INTEGER DEFAULT 0,

    CONSTRAINT "tb_irregularidade_por_if_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_reclamacao_cliente_por_if" (
    "id" SERIAL NOT NULL,
    "ds_ano" INTEGER NOT NULL,
    "ds_trimestre" VARCHAR(2) NOT NULL,
    "ds_categoria" VARCHAR(100) NOT NULL,
    "tp_instituicao" VARCHAR(50) NOT NULL,
    "ds_cnpj_if" VARCHAR(11),
    "nm_instituicao_financeira" VARCHAR(150) NOT NULL,
    "vl_indice" VARCHAR(20),
    "qtd_reclamacoes_reguladas_procedentes" INTEGER DEFAULT 0,
    "qtd_reclamacoes_reguladas_outras" INTEGER DEFAULT 0,
    "qtd_reclamacoes_nao_reguladas" INTEGER DEFAULT 0,
    "qtd_total_reclamacoes" INTEGER DEFAULT 0,
    "qtd_clientes_ccs_scr" INTEGER DEFAULT 0,
    "qtd_clientes_ccs" INTEGER DEFAULT 0,
    "qtd_clientes_scr" INTEGER DEFAULT 0,

    CONSTRAINT "tb_reclamacao_cliente_por_if_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_historico_acesso" (
    "ip_acesso" VARCHAR(35) NOT NULL,
    "nm_cidade" VARCHAR(60),
    "nm_estado" VARCHAR(60),
    "nm_pais" VARCHAR(60) NOT NULL,
    "cont_acessos" BIGINT NOT NULL DEFAULT 1,
    "ultima_atualizacao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "x_latitude" REAL,
    "y_longitude" REAL,

    CONSTRAINT "tb_historico_acessos_pkey" PRIMARY KEY ("ip_acesso")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

