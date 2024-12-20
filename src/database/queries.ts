import sql from "./dbConnection";

let ativa ='02';
export async function estabelecimentoQueryLimit(cnae:string, estado:string, cidade:string):Promise<any> {
  
  return sql`SELECT te.cnpj_basico,t.cnpj_ordem,
    t.cnpj_dv,
    te.razao_social,
    t.nome_fantasia,

    tmf.identificador as matriz_filial,
    tnat.descricao as natureza_juridica_,
    tq.descricao as qualificacao_responsavel,

    te.capital_social,
    tpemp.descricao as porte_empresa,
    te.ente_federativo_responsavel,

    tsc.descricao as situacao_cadastral,
    tmot.descricao as motivo_situacao_cadastral_,

    t.nome_cidade_exterior,
    tpa.descricao as pais_,
    t.data_inicio_atividades,

    tc.descricao as cnae_fiscal_,
    t.tipo_logradouro,
    t.logradouro,

    t.numero,
    t.complemento,
    t.bairro,

    t.cep, t.uf,
    tmun.descricao as municipio,

    t.ddd1, t.telefone1,
    t.ddd2, t.telefone2,
    t.ddd_fax, t.fax,

    t.correio_eletronico as email,
    t.situacao_especial,
    t.data_situacao_especial,

    tsim.opcao_simples,
    tsim.data_opcao_simples,
    tsim.data_exclusao_simples,

    tsim.opcao_mei,
    tsim.data_opcao_mei,
    tsim.data_exclusao_mei,

    tidsoc.identificador,
    tsoc.nome_socio,
    tsoc.cnpj_cpf_socio,

    tqs.descricao as qualificacao_socio,
    tsoc.data_entrada_sociedade,
    tsoc.pais,

    tsoc.representante_legal,
    tsoc.nome_representante,
    tqsrl.descricao as qualificacao_representante_legal,

    tfes.faixa_etaria

    FROM estabelecimento t
    LEFT JOIN empresas te on te.cnpj_basico=t.cnpj_basico
    LEFT JOIN natureza_juridica tnat on tnat.codigo=te.natureza_juridica
    LEFT JOIN motivo tmot on tmot.codigo=t.motivo_situacao_cadastral

    LEFT JOIN matriz_filial tmf on tmf.codigo=t.matriz_filial
    LEFT JOIN situacao_cadastral tsc on tsc.codigo=t.situacao_cadastral
    LEFT JOIN municipio tmun on tmun.codigo=t.municipio

    LEFT JOIN cnae tc on tc.codigo=t.cnae_fiscal
    LEFT JOIN pais tpa on tpa.codigo=t.pais
    LEFT JOIN porte_empresa tpemp on tpemp.codigo=te.porte_empresa

    LEFT JOIN socios tsoc on tsoc.cnpj_basico=t.cnpj_basico
    LEFT JOIN qualificacao_socio tq on tq.codigo=te.qualificacao_responsavel
    LEFT JOIN qualificacao_socio tqs on tqs.codigo=tsoc.qualificacao_socio
    LEFT JOIN qualificacao_socio tqsrl on tqsrl.codigo=tsoc.qualificacao_representante_legal

    LEFT JOIN simples tsim on tsim.cnpj_basico=t.cnpj_basico
    LEFT JOIN identificador_socio tidsoc on tidsoc.codigo=tsoc.identificador_socio
    LEFT JOIN faixa_etaria_socio tfes on tfes.codigo=tsoc.faixa_etaria

    WHERE t.cnae_fiscal=${cnae}
      AND t.uf=${estado}
      AND t.municipio=${cidade}
      AND t.situacao_cadastral=${ativa}
    ORDER BY te.razao_social ASC
    LIMIT 5;
  `
}

export async function queryEstabelecimentos(cnae:string, estado:string, cidade:string):Promise<any> {

  return sql`SELECT te.cnpj_basico,t.cnpj_ordem,
  t.cnpj_dv,
  te.razao_social,
  t.nome_fantasia,

  tmf.identificador as matriz_filial,
  tnat.descricao as natureza_juridica_,
  tq.descricao as qualificacao_responsavel,

  te.capital_social,
  tpemp.descricao as porte_empresa,
  te.ente_federativo_responsavel,

  tsc.descricao as situacao_cadastral,
  tmot.descricao as motivo_situacao_cadastral_,

  t.nome_cidade_exterior,
  tpa.descricao as pais_,
  t.data_inicio_atividades,

  tc.descricao as cnae_fiscal_,
  t.tipo_logradouro,
  t.logradouro,

  t.numero,
  t.complemento,
  t.bairro,

  t.cep, t.uf,
  tmun.descricao as municipio,

  t.ddd1, t.telefone1,
  t.ddd2, t.telefone2,
  t.ddd_fax, t.fax,

  t.correio_eletronico as email,
  t.situacao_especial,
  t.data_situacao_especial,

  tsim.opcao_simples,
  tsim.data_opcao_simples,
  tsim.data_exclusao_simples,

  tsim.opcao_mei,
  tsim.data_opcao_mei,
  tsim.data_exclusao_mei,

  tidsoc.identificador,
  tsoc.nome_socio,
  tsoc.cnpj_cpf_socio,

  tqs.descricao as qualificacao_socio,
  tsoc.data_entrada_sociedade,
  tsoc.pais,

  tsoc.representante_legal,
  tsoc.nome_representante,
  tqsrl.descricao as qualificacao_representante_legal,

  tfes.faixa_etaria

  FROM estabelecimento t
  LEFT JOIN empresas te on te.cnpj_basico=t.cnpj_basico
  LEFT JOIN natureza_juridica tnat on tnat.codigo=te.natureza_juridica
  LEFT JOIN motivo tmot on tmot.codigo=t.motivo_situacao_cadastral

  LEFT JOIN matriz_filial tmf on tmf.codigo=t.matriz_filial
  LEFT JOIN situacao_cadastral tsc on tsc.codigo=t.situacao_cadastral
  LEFT JOIN municipio tmun on tmun.codigo=t.municipio

  LEFT JOIN cnae tc on tc.codigo=t.cnae_fiscal
  LEFT JOIN pais tpa on tpa.codigo=t.pais
  LEFT JOIN porte_empresa tpemp on tpemp.codigo=te.porte_empresa

  LEFT JOIN socios tsoc on tsoc.cnpj_basico=t.cnpj_basico
  LEFT JOIN qualificacao_socio tq on tq.codigo=te.qualificacao_responsavel
  LEFT JOIN qualificacao_socio tqs on tqs.codigo=tsoc.qualificacao_socio
  LEFT JOIN qualificacao_socio tqsrl on tqsrl.codigo=tsoc.qualificacao_representante_legal

  LEFT JOIN simples tsim on tsim.cnpj_basico=t.cnpj_basico
  LEFT JOIN identificador_socio tidsoc on tidsoc.codigo=tsoc.identificador_socio
  LEFT JOIN faixa_etaria_socio tfes on tfes.codigo=tsoc.faixa_etaria

  WHERE t.cnae_fiscal=${cnae}
    AND t.uf=${estado}
    AND t.municipio=${cidade}
    AND t.situacao_cadastral=${ativa}
  ORDER BY te.razao_social ASC;
`
}

export async function estabelecimentoQueryCount(cnae:string, estado:string, cidade:string):Promise<any> {
  
  return sql`SELECT COUNT(t.cnpj_basico)

    FROM estabelecimento t
    LEFT JOIN empresas te on te.cnpj_basico=t.cnpj_basico
    LEFT JOIN natureza_juridica tnat on tnat.codigo=te.natureza_juridica
    LEFT JOIN motivo tmot on tmot.codigo=t.motivo_situacao_cadastral

    LEFT JOIN matriz_filial tmf on tmf.codigo=t.matriz_filial
    LEFT JOIN situacao_cadastral tsc on tsc.codigo=t.situacao_cadastral
    LEFT JOIN municipio tmun on tmun.codigo=t.municipio

    LEFT JOIN cnae tc on tc.codigo=t.cnae_fiscal
    LEFT JOIN pais tpa on tpa.codigo=t.pais
    LEFT JOIN porte_empresa tpemp on tpemp.codigo=te.porte_empresa

    LEFT JOIN socios tsoc on tsoc.cnpj_basico=t.cnpj_basico
    LEFT JOIN qualificacao_socio tq on tq.codigo=te.qualificacao_responsavel
    LEFT JOIN qualificacao_socio tqs on tqs.codigo=tsoc.qualificacao_socio
    LEFT JOIN qualificacao_socio tqsrl on tqsrl.codigo=tsoc.qualificacao_representante_legal

    LEFT JOIN simples tsim on tsim.cnpj_basico=t.cnpj_basico
    LEFT JOIN identificador_socio tidsoc on tidsoc.codigo=tsoc.identificador_socio
    LEFT JOIN faixa_etaria_socio tfes on tfes.codigo=tsoc.faixa_etaria

    WHERE t.cnae_fiscal=${cnae}
      AND t.uf=${estado}
      AND t.municipio=${cidade}
      AND t.situacao_cadastral=${ativa};
  `
}