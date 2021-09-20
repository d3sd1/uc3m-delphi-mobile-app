import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

export interface Dev {
  id: number,
  name: string,
  skills: any[],
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private plt: Platform) {
    this.plt.ready().then(async () => {
    });
  }

  public async resetDatabase() {
    await this.deleteDatabase();
    await this.createDatabase();
  }

  private async createDatabase(): Promise<void> {
    return null;
  }

  private async deleteDatabase() {
    await null;
  }

}
