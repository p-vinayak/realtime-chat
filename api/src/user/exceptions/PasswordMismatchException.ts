import { BadRequestException } from '@nestjs/common';

export default class PasswordMismatchException extends BadRequestException {
  constructor() {
    super('Passwords did not match');
  }
}
