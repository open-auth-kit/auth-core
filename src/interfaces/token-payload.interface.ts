/**
 * Canonical JWT payload used by **auth-core**. The package itself relies only
 * on the `sub` claim (Account ID). Any other claims are treated as opaque and
 * forwarded downstream; extension‑modules (permissions, etc.) can narrow them
 * via declaration merging.
 */
export interface TokenPayload {
    /** Unique account identifier (UUID / ObjectId). */
    sub: string;
    /** Timestamp issued‑at (set by JwtService). */
    iat?: number;
    /** Expiration timestamp (set by JwtService). */
    exp?: number;
}
