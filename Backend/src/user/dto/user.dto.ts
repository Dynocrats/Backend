import { IsNotEmpty } from "class-validator";
import { UserType } from "../enums/userType.enum";

export class UserDto {

    @IsNotEmpty()
    uid: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    userType: UserType;
}