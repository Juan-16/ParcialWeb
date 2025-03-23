import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DictatorsService } from './dictators.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/interface/JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private dictatorsService: DictatorsService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const dictator = await this.dictatorsService.findOneByNombre(payload.name);
    if (!dictator) {
      throw new UnauthorizedException('Dictador no encontrado');
    }
    return dictator; // 🔥 Passport inyecta esto en `req.user`
  }
}