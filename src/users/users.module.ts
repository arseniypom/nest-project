import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
