export default class Messages {
  public static readonly MSG_E000 = (campo: string) => `${campo} já cadastrado`;
  public static readonly MSG_E001 = (campo: string) => `${campo} inexistente`;
  public static readonly MSG_E002 = (campo: string) => `O campo ${campo} é inválido!`;
  public static readonly MSG_E003 = (campo: string) => `O campo ${campo} é necessário!`;
  public static readonly MSG_E004 = (campo: string, minimo: number, maximo: number) => `O campo ${campo} deve ter no mínimo ${minimo} e no máximo ${maximo} caracteres!`;
  public static readonly MSG_E005 = "Usuário ou senha inválidos";
  public static readonly MSG_E006 = "Usuário não autorizado";

  public static readonly MSG_A000 = "As senhas devem ser diferentes!";
  public static readonly MSG_A001 = "O usuário precisa estar logado!";
}