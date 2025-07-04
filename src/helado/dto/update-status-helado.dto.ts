import { IsEnum } from 'class-validator';
import { HeladoStatus } from '../status/status-helado';

export class UpdateStatusHelado {
  @IsEnum(HeladoStatus, {
    message: 'Invalid status',
  })
  status: HeladoStatus;
}
