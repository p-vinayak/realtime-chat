import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user: User, done: CallableFunction) {
    done(null, { id: user.id, username: user.username });
  }

  deserializeUser(
    payload: { id: number; username: string },
    done: CallableFunction,
  ) {
    done(null, payload);
  }
}
