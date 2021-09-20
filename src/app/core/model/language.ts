export class Language {
  id: number;
  name: string;
  available: boolean;


  constructor(id: number, name: string, available: boolean) {
    this.id = id;
    this.name = name;
    this.available = available;
  }
}
