import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
