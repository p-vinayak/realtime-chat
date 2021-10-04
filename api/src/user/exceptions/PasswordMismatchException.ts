import { BadRequestException } from '@nestjs/common';

export default class PasswordMismatchError extends BadRequestException {
  constructor() {
    super('Passwords did not match');
  }
}
