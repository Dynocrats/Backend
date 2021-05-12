import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { BadRequestError } from "src/error/BadRequest.error";
import { UserDto } from "./dto/user.dto";
import { UserError } from "./exception/user.error";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() user: UserDto): Promise<void> {

        try {
            return this.userService.createUser(user);
        } catch(e) {
            // if(e instanceof UserError) {
            //     throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            // } else {
                console.error('Internal server error, Failed to create user', e);
            // }
            
        }
        
    }

    @Get(':uid')
    async getUser(@Param('uid') uid:string) {

        try {
            const userResponse = await this.userService.getUser(uid);

            if(userResponse != null) {
                return userResponse;
            } else {
                throw new UserError('User does not exists');
            }
        } catch(e) {
            if(e instanceof UserError) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal server error, Failed to get user', e);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get()
    async getUsers() {
        try {
            const usersResponse = await this.userService.getUsers();

            if(usersResponse != null) {
                return usersResponse;
            } else {
                throw new UserError('No users');
            }
        } catch(e) {
            if(e instanceof UserError) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            console.error('Internal server error, Failed to get users', e);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put(':uid')
    async updateUser(@Param('uid') uid:string, @Body() user: UserDto): Promise<void> {
        try {
            return this.userService.updateUser(user, uid);
        } catch(e) {
            console.error('Internal server error, Failed to create user', e);
        }
    }

    @Delete(':uid')
    async deleteUser(@Param('uid') uid:string) {

        try {
            const userResponse = await this.userService.deleteUser(uid);
        } catch(e) {
            if(e instanceof UserError) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}