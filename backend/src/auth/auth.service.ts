import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, passwordHash });
  }

  async login(email: string, password: string) {
    const user = (await this.usersService.findAll()).find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException("Credenciales inválidas");
    }
    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
