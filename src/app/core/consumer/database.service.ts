import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

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
  private database: SQLiteObject = null;

  constructor(private plt: Platform, private sqlite: SQLite) {
    this.plt.ready().then(async () => {
      this.database = await this.createDatabase();
    });
  }

  private async createDatabase(): Promise<SQLiteObject> {
    return await this.sqlite.create({
      name: 'delphi.db',
      location: 'default'
    });
  }

  private async deleteDatabase() {
    await this.sqlite.deleteDatabase({
      name: 'delphi.db',
      location: 'default'
    });
  }

  public async resetDatabase() {
    await this.deleteDatabase();
    await this.createDatabase();
  }

  getDatabase(): Promise<SQLiteObject> {
    return new Promise<SQLiteObject>((resolve) => {
      if(this.database === null){
        setTimeout(() => {
          resolve(this.getDatabase());
        }, 100);
      } else {
        resolve(this.database);
      }
    });
  }

}
