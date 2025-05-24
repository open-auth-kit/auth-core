import { TokenPayload } from '../interfaces/token-payload.interface';

/**
 * User‑defined callback executed after signature verification.
 * Throw anything (ForbiddenException, etc.) to reject the token.
 */
export type JwtValidateHook = (payload: TokenPayload) => Promise<void> | void;
