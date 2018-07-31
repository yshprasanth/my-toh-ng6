import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const groups = [
      {id: 1, name: 'Test1'},
      {id: 2, name: 'Test2'},
      {id: 3, name: 'Test3'},
      {id: 4, name: 'Test4'},
      {id: 5, name: 'Test5'},
      {id: 6, name: 'Test6'},
      {id: 7, name: 'Test7'},
      {id: 8, name: 'Test8'},
      {id: 9, name: 'Test9'},
      {id: 10, name: 'Test10'}
    ];

    return { groups };
  }
}