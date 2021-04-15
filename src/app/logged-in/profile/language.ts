export class Language {
  id: number;
  keyName: string;
  available: boolean;

  constructor(keyName: string) {
    this.keyName = keyName;
  }
}
