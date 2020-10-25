import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService]
})
export class AppModule {}
