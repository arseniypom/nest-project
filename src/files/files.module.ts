import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  exports: [FilesService],
  providers: [FilesService],
})
export class FilesModule {}
