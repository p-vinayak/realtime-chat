import { BadRequestException } from '@nestjs/common';

export default class InvalidUsernameOrPasswordException extends BadRequestException {
  constructor() {
    super('Invalid username or password');
  }
}
