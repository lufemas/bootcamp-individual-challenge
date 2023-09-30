// import translations from './translations.json'

/**
 * Classe responsável por fornecer serviços de internacionalização (i18n).
 */
class I18nService {
  public static userPreferredLanguage = "pt_br";
  public static translations: any = {
    pt_br: {
      none: "Nenhum",
      administrator: "Administrador",
      customer: "Cliente",
      homepage: "Início",
      loggedUser: "Usuário Logado",
      serverAddress: "Endereço do Servidor",
      message: "Mensagem",
      messageForm: "Formulário de Mensagem",
      messageSent: "A mensagem foi enviada com sucesso.",
      messagesError: "Ocorreu um erro ao enviar a mensagem",
      send: "Enviar",
      selectOption: "Selecionar Opção",
      loggedOut: "Sem Sessão",
      loggedIn: "Sessão Ativa",
      menuAdd: "Adicionar",
      menuSearch: "Consultar",
      menuEdit: "Alterar",
      menuDelete: "Excluir",
      invalidEmail: "E-mail Inválido",
      nameTooLong50Max: "Máximo de 50 caracteres",
      mccTooLong4Max: "Máximo de 4 caracteres",
      invalidCpf: "CPF Inválido, 11 dígitos",
      invalidCnpj: "CNPJ Inválido, 14 dígitos",
      menuQueue: "Tratar Fila",
      homePage: "Início",
      submit: "Enviar",
      noData: "Sem Resultado",
      getNextFromQueue: "Próximo da Fila",
      id: "ID",
      cpf: "CPF",
      mcc: "MCC",
      name: "Nome",
      email: "E-mail",
      queueIsEmpty: "A fila está vazia",
      finish: "Finalizar",
      cnpj: "CNPJ",
      razaoSocial: "Razão Social",
      cpfContato: "CPF do Contato",
      nomeContato: "Nome do Contato",
      emailContato: "E-mail do Contato",
      titleConfirm: "Confirmação",
      confirmDelete: "Você tem certeza de que deseja excluir este item?",
      edit: "Alterar",
      delete: "Excluir",
      loggeduser: "Sessão",
      serveraddress: "Endereço do Servidor",
    },
    en: {
      administrator: "Administrator",
      customer: "Customer",
      homepage: "Home",
      loggedUser: "Logged User",
      serverAddress: "Server Address",
      message: "Message",
      messageForm: "Message Form",
      messageSent: "The message has been sent successfully.",
      messagesError: "An error occurred while sending the message.",
      send: "Send",
      selectOption: "Select Option",
      loggedOut: "Logged Out",
      loggedIn: "Logged In",
      menuAdd: "Add",
      menuSearch: "Search",
      menuEdit: "Edit",
      menuDelete: "Delete",
      invalidEmail: "Invalid Email",
      nameTooLong50Max: "Maximum 50 characters",
      mccTooLong4Max: "Maximum 4 characters",
      invalidCpf: "Invalid CPF, 11 digits",
      invalidCnpj: "Invalid CNPJ, 14 digits",
      menuQueue: "Queue Management",
      homePage: "Home",
      submit: "Submit",
      noData: "No Data",
      getNextFromQueue: "Next in Queue",
      id: "ID",
      cpf: "CPF",
      mcc: "MCC",
      name: "Name",
      email: "Email",
      queueIsEmpty: "The queue is empty",
      finish: "Finish",
      cnpj: "CNPJ",
      razaoSocial: "Business Name",
      cpfContato: "Contact's CPF",
      nomeContato: "Contact's Name",
      emailContato: "Contact's Email",
      titleConfirm: "Confirmation",
      confirmDelete: "Are you sure you want to delete this item?",
      edit: "Edit",
      delete: "Delete",
      loggeduser: "Session",
      serveraddress: "Server Address",
    },
  };

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
