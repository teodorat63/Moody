import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//Kada stavimo Global sve sto je u exports je dostupnbo svim drugim modulima
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
