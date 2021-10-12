import { ConflictException } from '@nestjs/common';

export default class RoomAlreadyExistsException extends ConflictException {
  constructor() {
    super('Room with name already exists');
  }
}
