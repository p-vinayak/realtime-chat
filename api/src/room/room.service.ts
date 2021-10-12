import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import RoomAlreadyExistsException from './exceptions/RoomAlreadyExistsException';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  findByRoomName(roomName: string) {
    return this.roomRepository.findOne({ name: roomName });
  }

  async create(createRoomDto: CreateRoomDto, owner: Partial<User>) {
    const existingRoom = await this.findByRoomName(createRoomDto.name);
    if (existingRoom) throw new RoomAlreadyExistsException();
    const newRoom = new Room();
    newRoom.name = createRoomDto.name;
    newRoom.description = createRoomDto.description;
    newRoom.maxUserCount = createRoomDto.maxUserCount;
    newRoom.owner = new User();
    newRoom.owner.id = owner.id;
    return this.roomRepository.save(newRoom);
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
