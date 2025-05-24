import type { JwtFromRequestFunction } from 'passport-jwt';

/**
 * Options passed to {@link AuthCoreModule.forRoot}. Everything
 * except `publicKey` is optional.
 */
export interface JwtCoreOptions {
    /** PEM‑encoded public RSA key used to verify RS256 signature */
    publicKey: string;
    /** Expected issuer claim (`iss`) */
    issuer?: string;
    /** Expected audience claim (`aud`) */
    audience?: string;
    /** Custom extractors; defaults are cookie+Bearer */
    extractors?: JwtFromRequestFunction[];
}
