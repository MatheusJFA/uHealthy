export default class Messages {
  public static readonly MSG_E000 = "Usuário já cadastrado";
  public static readonly MSG_E001 = "Usuário inexistente";
  public static readonly MSG_E002 = "Usuário ou senha inválidos";
  public static readonly MSG_E003 = "Usuário não autorizado";
  public static readonly MSG_E004 = "Nenhum token foi fornecido";
  public static readonly MSG_E005 = "Token incorreto";
  public static readonly MSG_E006 = "ID inválido";
  public static readonly MSG_E007 = "CPF inválido";
  public static readonly MSG_E008 = "Logado com sucesso!";
  public static readonly MSG_E009 = "Deslogado com sucesso!";
  public static readonly MSG_E010 = (campo: string) => `O campo ${campo} é inválido!`;
  public static readonly MSG_E011 = (campo: string) => `O campo ${campo} é necessário!`;
  public static readonly MSG_E012 = (campo: string, minimo: number, maximo: number) => `O campo ${campo} deve ter no mínimo ${minimo} e no máximo ${maximo} caracteres!`;
  
  public static readonly MSG_A000 = "As senhas devem ser diferentes!";
  public static readonly MSG_A001 = "O usuário precisa estar logado!";
}