// import translations from './translations.json'

/**
 * Classe responsável por fornecer serviços de internacionalização (i18n).
 */
class I18nService {
  public static userPreferredLanguage = "pt_br";
  public static translations: any = {
    "pt_br":
      {
        "none": "Nenhum",
        "administrator": "Administrador",
        "customer": "Cliente",
        "homepage": "Início",
        "loggedUser": "Usuário Logado",
        "serverAddress": "Endereço do Servidor",
        "message": "Mensagem",
        "messageForm": "Formulário de Mensagem",
        "messageSent": "A Mensagem foi enviada com sucesso.",
        "messagesError": "Ocorreu um erro ao enviar a mensagem",
        "send": "Enviar",
        "selectOption": "Selecionar Opção",
        "loggedOut": "Sem Sessão",
        "loggedIn": "Sessão Ativa",
        "menuAdd": "Adicionar",
        "menuSearch": "Consultar",
        "menuEdit": "Alterar",
        "menuDelete": "Excluir"
      }
  }
  
  private constructor() {
    // I18nService.translations = 
  }

  /**
   * Traduz um token para o idioma configurado (Português - Brasil).
   * @static
   * @param {string} token - O token a ser traduzido.
   * @param {Object} options - Opções adicionais, como plural.
   * @param {boolean} options.plural - Indica se o token deve ser pluralizado.
   * @returns {string} - O token traduzido.
   */
  static translate = (token: string, options: any = {}): string => {
    if (options.plural) token += "s";
    return this.translations[this.userPreferredLanguage]?.[token] || token;
  };
}

export default I18nService;
