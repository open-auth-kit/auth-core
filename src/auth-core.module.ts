import { DynamicModule, Module } from '@nestjs/common';
import { JwtCoreOptions } from './interfaces/jwt-core-options.interface';
import { JWT_CORE_OPTIONS } from './tokens';

@Module({})
export class AuthCoreModule {
    /** sync registration */
    static forRoot(options: JwtCoreOptions): DynamicModule {
        return {
            module: AuthCoreModule,
            providers: [{ provide: JWT_CORE_OPTIONS, useValue: options }],
            exports: [JWT_CORE_OPTIONS],
        };
    }
    /** async registration (e.g. ConfigService) */
    static forRootAsync(asyncOptions: {
        imports?: any[];
        useFactory: (...a: any[]) => Promise<JwtCoreOptions> | JwtCoreOptions;
        inject?: any[];
    }): DynamicModule {
        return {
            module: AuthCoreModule,
            imports: asyncOptions.imports,
            providers: [
                {
                    provide: JWT_CORE_OPTIONS,
                    useFactory: asyncOptions.useFactory,
                    inject: asyncOptions.inject ?? [],
                },
            ],
            exports: [JWT_CORE_OPTIONS],
        };
    }
}
