import { IsEnum } from "class-validator";
import { SaborStatus } from "../status/status-sabor";

export class UpdateStatusSabor{
    @IsEnum(SaborStatus,{
        message: 'Invalid status',
    })
    status: SaborStatus;
}