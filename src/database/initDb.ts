// src/database/initDb.ts
import prisma from '../prismaClient';
import Logger from '../modules/shared/utils/Logger';

const logger = new Logger('DatabaseInitializer');

/**
 * Função para inicializar o banco de dados com dados padrão ou configurações iniciais,
 * se ainda não tiver sido inicializado.
 */
export default async function initializeDatabase(): Promise<void> {
  logger.info('Verificando status de inicialização do banco de dados...');

  try {
    // Tenta encontrar o registro de configuração de inicialização
    let appConfig = await prisma.appConfig.findFirst();

    if (!appConfig || !appConfig.is_initialized) {
      logger.info('Banco de dados não inicializado ou flag desativada. Iniciando processo de inicialização...');

      // --- LOGICA DE INICIALIZAÇÃO AQUI ---
      // Exemplo: Criar tipos de registro padrão se não existirem

      //cria usuário admin caso não exista
      const defaultAdmin = {
        email: "admin@ser-recicla.com.br",
        nome: "admin",
        senha: "admin@SerRecicla1232",
      };
      
      await prisma.users.upsert({
        where: { email: defaultAdmin.email },
        update: {},
        create: defaultAdmin,
      });
      logger.info("USUÁRIO ADMIN PADRÃO CRIADO");
      const defaultTipoRegistros = [
        { tipo: 'LATA' },
        { tipo: 'PLASTICO' },
        { tipo: 'PAPELAO' },
        { tipo: "VIDRO"},
      ];

      for (const data of defaultTipoRegistros) {
        await prisma.tipoRegistro.upsert({
          where: { tipo: data.tipo },
          update: {}, // Não faz nada se já existir
          create: data,
        });
        logger.info(`Tipo de registro '${data.tipo}' garantido.`);
      }

      // Exemplo: Criar um curso padrão se não existir
      const defaultCursos = [
        { nome_curso: "ENGENHARIA_MECANICA" },
        { nome_curso: "SERVICO_SOCIAL" },
        { nome_curso: "ESTETICA_E_COSMETICA" },
        {nome_curso: "CIENCIA_DA_COMPUTACAO"},
        {nome_curso: "FISIOTERAPIA"},
        {nome_curso: "ENGENHARIA_CIVIL"},
        {nome_curso: "EDUCACAO_FISICA"},
        {nome_curso: "ENFERMAGEM"},
        {nome_curso: "TERAPIA_OCUPACIONAL"},
        {nome_curso: "DIREITO"},
        {nome_curso: "ADMINISTRACAO"},
        {nome_curso: "FARMACIA"},
        {nome_curso: "BIOMEDICINA"},
        {nome_curso: "ODONTOLOGIA"},
        {nome_curso: "PSICOLOGIA"},
        {nome_curso: "NUTRICAO"},
        {nome_curso: "COMUNICACAO_SOCIAL"},
        {nome_curso: "GASTRONOMIA"},
        {nome_curso: "MEDICINA_VETERINARIA"},
        {nome_curso: "FONOAUDIOLOGIA"},
        {nome_curso: "ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS"},
      ];
      
      for (const curso of defaultCursos) {
        await prisma.curso.upsert({
          where: { nome_curso: curso.nome_curso },
          update: {},
          create: curso,
        });
      }
      logger.info(`Cursos garantidos.`);
      // --- FIM DA LOGICA DE INICIALIZAÇÃO ---

      // Atualiza ou cria o registro de configuração para marcar como inicializado
      if (appConfig) {
        await prisma.appConfig.update({
          where: { id: appConfig.id },
          data: { is_initialized: true, last_initialized_at: new Date() },
        });
        logger.info('Flag de inicialização do banco de dados atualizada para TRUE.');
      } else {
        await prisma.appConfig.create({
          data: { is_initialized: true, last_initialized_at: new Date() },
        });
        logger.info('Registro de configuração de inicialização criado e definido como TRUE.');
      }
      logger.info('Processo de inicialização do banco de dados concluído com sucesso!');
    } else {
      logger.info('Banco de dados já inicializado. Nenhuma ação necessária.');
    }
  } catch (error) {
    logger.error('Erro durante a inicialização do banco de dados:');
    // Em produção, você pode querer lançar o erro ou fazer algo mais robusto aqui
    throw error;
  }
}
