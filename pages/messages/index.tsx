export default class Messages {
  public static readonly MSG_E000 = (field: string) => `${field} já cadastrado`;
  public static readonly MSG_E001 = (field: string) => `${field} inexistente`;
  public static readonly MSG_E002 = (field: string) => `O campo ${field} é inválido!`;
  public static readonly MSG_E003 = (field: string) => `O campo ${field} é necessário!`;
  public static readonly MSG_E004 = (field: string, min: number, max: number) => `O campo ${field} deve ter no mínimo ${min} e no máximo ${max} caracteres!`;
  public static readonly MSG_E005 = "Usuário ou senha inválidos";
  public static readonly MSG_E006 = "Usuário não autorizado";

  public static readonly MSG_A000 = "As senhas devem ser diferentes!";
  public static readonly MSG_A001 = "O usuário precisa estar logado!";
}