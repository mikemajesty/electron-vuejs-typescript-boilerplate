export class TextUtils {
  static capitalizeFirstLetter(text: string) {
    return text
      .charAt(0)
      .toUpperCase()
      .concat(text.slice(1))
      .split(" ")
      .reduce((prev, next) =>
        prev
          .charAt(0)
          .toUpperCase()
          .concat(prev.slice(1))
          .concat(" ")
          .concat(next.charAt(0).toUpperCase().concat(next.slice(1)))
          .trim(),
      );
  }
}
