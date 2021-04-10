import { Message } from "yup/lib/types";

export default class Messages {
  public static readonly MSG_E000 = (field: string, maleGender: boolean = true) => `${field} já cadastrad${maleGender ? "o": "a"}`;
  public static readonly MSG_E001 = (field: string) => `${field} inexistente`;
  public static readonly MSG_E002 = (field: string) => `O campo ${field} é inválido!`;
  public static readonly MSG_E003 = (field: string) => `O campo ${field} é necessário!`;
  public static readonly MSG_E004 = (field: string, min: number, max: number) => `O campo ${field} deve ter no mínimo ${min} e no máximo ${max} caracteres!`;
  public static readonly MSG_E005 = "Usuário ou senha inválidos";
  public static readonly MSG_E006 = "Usuário não autorizado";

  public static readonly MSG_ERROR = (field: string[]) => `Favor verificar os seguintes campos: 
                                                              ${field.join("\n").replace(",", "\n")}`;

  public static readonly MSG_A000 = "As senhas devem coincidir!";
  public static readonly MSG_A001 = "O usuário precisa estar logado!";
  public static readonly MSG_A002 = "A validação falhou!";

  public static readonly MSG_S000 = "Usuário cadastrado com sucesso";
  public static readonly MSG_S001 = "Login realizado com sucesso";

}
