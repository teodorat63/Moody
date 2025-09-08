import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategy';
import { MoodsModule } from './moods/moods.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MoodsModule,
    SongsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
