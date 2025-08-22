import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {hash, compare} from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor( private prisma: PrismaService,
      private jwtService: JwtService
   ) {}

   async register(userObject: RegisterAuthDto) {
      const {password} = userObject; //esto es texto plano
      const plainToHash= await hash(password, 10); // esto es encriptado
      userObject ={... userObject,password:plainToHash};

      return this.prisma.user.create({data:userObject});
   }

   async login(userObjectLogin: LoginAuthDto) {
      const {email, password} = userObjectLogin;
      const findUser = await this.prisma.user.findUnique({ where: { email } });
      if(!findUser) throw new HttpException('User not found', 404);

      const checkPassword = await compare(password, findUser.password);
      if(!checkPassword) throw new HttpException('Invalid password', 403);
      const payload= {id:findUser.id, name:findUser.name};
      const token = this.jwtService.sign(payload);
      const data={
         user:findUser,
         token
      }

      return data;
   }
}
