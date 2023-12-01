export class LocalizeUtils {
  private static messages = {
    Required: " Requerido",
  };

  static getBadRequestMessage(text: string) {
    return this.messages[text] || text;
  }
}
