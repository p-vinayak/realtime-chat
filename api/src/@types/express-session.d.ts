import session from 'express-session';
import { User } from 'src/user/entities/user.entity';

declare module 'express-session' {
  export interface SessionData {
    user: Partial<User>;
  }
}
