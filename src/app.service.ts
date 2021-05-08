import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  DB = {
    users: {
      users: [
        {id: 1, name: 'Kamal'},
        {id: 2, name: 'Nimal'}
      ]
    }
  }
  getHello(): string {
    return 'Hello World!';
  }

  getUsersFromDB() {
    return this.DB.users;
  }
}
