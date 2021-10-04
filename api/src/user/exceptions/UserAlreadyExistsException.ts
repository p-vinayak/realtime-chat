import { ConflictException } from '@nestjs/common';

export default class UserAlreadyExistsError extends ConflictException {
  constructor() {
    super('User with name already exists');
  }
}
