import { ConflictException, HttpException, Injectable } from '@nestjs/common';
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
 
  const { email, password } = userObject;


  const existingUser = await this.prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictException('Este correo electrónico ya está registrado.');
  }


  const plainToHash = await hash(password, 10); // Encriptamos la contraseña

  const dataToCreate = {
    ...userObject,
    password: plainToHash,
  };

  // Finalmente, creamos el usuario en la base de datos
  return this.prisma.user.create({
    data: dataToCreate,
  });
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
