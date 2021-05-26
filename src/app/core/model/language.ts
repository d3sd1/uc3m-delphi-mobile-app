export class Language {
  id: number;
  keyName: string;
  available: boolean;


  constructor(id: number, keyName: string, available: boolean) {
    this.id = id;
    this.keyName = keyName;
    this.available = available;
  }
}
