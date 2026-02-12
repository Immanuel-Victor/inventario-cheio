import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptStrategy extends HashingService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(value, salt);

    return hash;
  }
  async compare(value: string, hash: string): Promise<boolean> {
    const result: boolean = await bcrypt.compare(value, hash);
    return result;
  }
}
