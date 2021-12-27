import {Injectable} from '@angular/core';
import {Category} from './model/category';

@Injectable({
  providedIn: 'root'
})
export class QuestionKindService {
  private likertKind = [
    {
      text: 'Totalmente en desacuerdo',
      value: '1'
    },
    {
      text: 'En desacuerdo',
      value: '2'
    },
    {
      text: 'Indiferente',
      value: '3'
    },
    {
      text: 'De acuerdo',
      value: '4'
    },
    {
      text: 'Totalmente de acuerdo',
      value: '5'
    }
  ];

  private booleanKind = [
    {
      text: 'Sí',
      value: '1'
    },
    {
      text: 'No',
      value: '0'
    }
  ];

  getBooleanKinds() {
    return [...this.booleanKind];
  }

  getLikertKinds() {
    return [...this.likertKind];
  }

  mapCatsToKinds(cats: Category[]): { text, value }[] {
    return cats.map(cat => {
      return {
        text: cat.catName,
        value: cat.id
      };
    });
  }


}

