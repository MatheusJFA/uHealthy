const Messages = {
  MSG_E000: (field: string, maleGender: boolean = true) => `${field} já cadastrad${maleGender ? "o" : "a"}`,
  MSG_E001: (field: string) => `${field} inexistente`,
  MSG_E002: (field: string) => `O campo ${field} é inválido!`,
  MSG_E003: (field: string) => `O campo ${field} é necessário!`,
  MSG_E004: (field: string, min: number, max: number) => `O campo ${field} deve ter no mínimo ${min} e no máximo ${max} caracteres!`,
  MSG_E005: "Usuário ou senha inválidos",
  MSG_E006: "Usuário não autorizado",
  MSG_E007: "Usuário não encontrado",
  MSG_E008: "Nenhuma vacinação encontrada para este usuário",
  MSG_E009: "Não foi possivel atualizar, ja existe uma vacinação com este nome",


  MSG_CPF_ERROR: "O CPF digitado não é valido!",
  MSG_ERROR: (field: string[]) => `Favor verificar os seguintes campos: 
                                                              ${field.join("\n").replace(",", "\n")}`,
  MSG_A000: "As senhas devem coincidir!",
  MSG_A001: "O usuário precisa estar logado!",
  MSG_A002: "A validação falhou!",
  MSG_S000: "Usuário cadastrado com sucesso",
  MSG_S001: "Login realizado com sucesso",
  MSG_S002: "Usuário deslogado com sucesso",
  MSG_S003: "Vacina deletada com sucesso"
}

export default Messages;