import * as csv from 'csv';
import fs from "fs";
import { CnaeFiltersFormData } from "@/app/components/form/cnaeZodSchema";

export async function createFile(data:any,{cnae,estado,cidade}:CnaeFiltersFormData):Promise<string>{
  
  const name = `estabelecimentos-${cnae}-${estado}-${cidade}.csv`;
  const directory = process.cwd();

  const filename = `${directory}/public/download/${name}`;
  const columns =[
    "cnpj",
    "razao_social",
    "nome_fantasia",
    "matriz_filial",
    "natureza_juridica_",
    "qualificacao_responsavel",
    "capital_social",
    "porte_empresa",
    "ente_federativo_responsavel",
    "situacao_cadastral",
    "motivo_situacao_cadastral_",
    "nome_cidade_exterior",
    "pais_",
    "data_inicio_atividades",
    "cnae_fiscal_",
    "tipo_logradouro",
    "logradouro",
    "numero",
    "complemento",
    "bairro",
    "cep",
    "uf",
    "municipio",
    "ddd1",
    "telefone1",
    "ddd2",
    "telefone2",
    "ddd_fax",
    "fax",
    "email",
    "situacao_especial",
    "data_situacao_especial",
    "opcao_simples",
    "data_opcao_simples",
    "data_exclusao_simples",
    "opcao_mei",
    "data_opcao_mei",
    "data_exclusao_mei",
    "identificador",
    "nome_socio",
    "cnpj_cpf_socio",
    "qualificacao_socio",
    "data_entrada_sociedade",
    "pais",
    "representante_legal",
    "nome_representante",
    "qualificacao_representante_legal",
    "faixa_etaria"
  ]

  const csvWriter = csv.stringify({ header: true, columns: columns });
  const writeStream = fs.createWriteStream(filename);

  data.forEach((row: any) => {
    const cnpj = `${row.cnpj_basico.slice(0,2)}.${row.cnpj_basico.slice(2,5)}.${row.cnpj_basico.slice(5,8)}/${row.cnpj_ordem}-${row.cnpj_dv}`;
    csvWriter.write({
      cnpj: cnpj,
      razao_social: row.razao_social,
      nome_fantasia: row.nome_fantasia,
      matriz_filial: row.matriz_filial,
      natureza_juridica_: row.natureza_juridica_,
      qualificacao_responsavel: row.qualificacao_responsavel,
      capital_social: row.capital_social,
      porte_empresa: row.porte_empresa,
      ente_federativo_responsavel: row.ente_federativo_responsavel,
      situacao_cadastral: row.situacao_cadastral,
      motivo_situacao_cadastral_: row.motivo_situacao_cadastral_,
      nome_cidade_exterior: row.nome_cidade_exterior,
      pais_: row.pais_,
      data_inicio_atividades: row.data_inicio_atividades,
      cnae_fiscal_: row.cnae_fiscal_,
      tipo_logradouro: row.tipo_logradouro,
      logradouro: row.logradouro,
      numero: row.numero,
      complemento: row.complemento,
      bairro: row.bairro,
      cep: row.cep,
      uf: row.uf,
      municipio: row.municipio,
      ddd1: row.ddd1,
      telefone1: row.telefone1,
      ddd2: row.ddd2,
      telefone2: row.telefone2,
      ddd_fax: row.ddd_fax,
      fax: row.fax,
      email: row.email,
      situacao_especial: row.situacao_especial,
      data_situacao_especial: row.data_situacao_especial,
      opcao_simples: row.opcao_simples,
      data_opcao_simples: row.data_opcao_simples,
      data_exclusao_simples: row.data_exclusao_simples,
      opcao_mei: row.opcao_mei,
      data_opcao_mei: row.data_opcao_mei,
      data_exclusao_mei: row.data_exclusao_mei,
      identificador: row.identificador,
      nome_socio: row.nome_socio,
      cnpj_cpf_socio: row.cnpj_cpf_socio,
      qualificacao_socio: row.qualificacao_socio,
      data_entrada_sociedade: row.data_entrada_sociedade,
      pais: row.pais,
      representante_legal: row.representante_legal,
      nome_representante: row.nome_representante,
      qualificacao_representante_legal: row.qualificacao_representante_legal,
      faixa_etaria: row.faixa_etaria
    });
  });

  csvWriter.pipe(writeStream);
  
  return filename;
}