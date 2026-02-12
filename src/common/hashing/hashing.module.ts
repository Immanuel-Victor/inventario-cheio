import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { BcryptStrategy } from './strategy/bcrypt.strategy.service';

@Global()
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptStrategy,
    },
  ],
  exports: [HashingService],
})
export class HashingModule {}
