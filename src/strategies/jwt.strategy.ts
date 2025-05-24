import { Inject, Injectable, Optional } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { JWT_CORE_OPTIONS, JWT_VALIDATE_HOOK } from '../tokens';
import { JwtCoreOptions } from '../interfaces/jwt-core-options.interface';
import { JwtValidateHook } from '../hooks/jwt-validate-hook.interface';
import { TokenPayload } from '../interfaces/token-payload.interface';

const defaultExtractors: JwtFromRequestFunction[] = [
    (req) => req?.cookies?.access_token,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
];

export const DEFAULT_EXTRACTORS = defaultExtractors;


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(JWT_CORE_OPTIONS) options: JwtCoreOptions,
        @Inject(JWT_VALIDATE_HOOK) @Optional()
        private readonly hook?: JwtValidateHook,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors(
                options.extractors?.length ? options.extractors : defaultExtractors,
            ),
            secretOrKey: options.publicKey,
            issuer: options.issuer,
            audience: options.audience,
            algorithms: ['RS256'],
            ignoreExpiration: false,
        });
    }

    async validate(payload: TokenPayload) {
        if (this.hook) await this.hook(payload);
        return payload;
    }
}
