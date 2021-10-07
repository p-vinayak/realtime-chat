import { ConflictException } from '@nestjs/common';

export default class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User with name already exists');
  }
}
