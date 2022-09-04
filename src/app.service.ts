import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [
      { id: 1, name: 'Andy' },
      { id: 2, name: 'Sara' },
      { id: 3, name: 'jake' },
    ];
  }
}
