import { englishLayout } from "../layout/english";
import { hebrewLayout } from "../layout/hebrew";

export class KeyboardProvider {
  private keyboard: Map<string, Array<Array<string>>>;

  constructor() {
    this.keyboard = new Map<string, Array<Array<string>>>;
    this.keyboard.set('english', englishLayout);
    this.keyboard.set('hebrew', hebrewLayout);
  }

  getKeyboard(language: string): Array<Array<string>> {
    if(this.keyboard.has(language)) {
      return this.keyboard.get(language) as Array<Array<string>>;
    }
    return this.keyboard.get('hebrew') as Array<Array<string>>;
  }
}
