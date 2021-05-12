import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { ArgumentError } from "src/error/Argument.error";
import { UserDto } from "./dto/user.dto";
import { UserError } from "./exception/user.error";

@Injectable()
export class UserRepository {
    async addOrUpdate(userDto: UserDto): Promise<void> {
         const db = admin.firestore();
         db.collection('users').doc(userDto.uid).set({
             firstName: userDto.firstName,
             lastName: userDto.lastName,
             email: userDto.email,
             userType: userDto.userType
         });
    }

    async getUser(uid: string): Promise<UserDto> {
        if(uid == null || undefined || uid === '') {
            throw new ArgumentError("uid is null or empty");
        }

        const db = admin.firestore();
        const data = await db.collection('users').doc(uid).get();
    
        if(data.exists) {
            return {
                uid: uid,
                firstName: data.data().firstName,
                lastName: data.data().lastName,
                email: data.data().email,
                userType: data.data().userType
            }
        }
        return null;
    }

    async getUsers():Promise<object> {
        const db = admin.firestore();
        const snapshot = await db.collection('users').get();
        
        const users = snapshot.docs.map(doc => doc.data());

        if(users.length == 0) {
            return null;
        } else {
            return users;
        }
    }

    async deleteUser(uid: string): Promise<void> {
        if(uid == null || undefined || uid === '') {
            throw new ArgumentError("uid is null or empty");
        }

        const db = admin.firestore();
        const data = await db.collection('users').doc(uid).get();

        if(data.exists) {
            await db.collection('users').doc(uid).delete();
            return console.log('User deleted');
        } else {
            throw new UserError('User not exists');
        }
        
    }
}