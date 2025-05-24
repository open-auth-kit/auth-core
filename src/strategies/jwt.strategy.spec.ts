/**
 * Unit-tests for {@link JwtStrategy}.
 *
 * We generate a real RS256 token with `jsonwebtoken`,
 * feed it to the strategy through both extractors –
 * cookie and Authorization header –
 * and assert that payload is returned / hook is called.
 */

import { JwtStrategy } from './jwt.strategy';
import { TokenPayload } from '../interfaces/token-payload.interface';
import * as jwt from 'jsonwebtoken';
import { generateKeyPairSync } from 'crypto';
import { DEFAULT_EXTRACTORS } from './jwt.strategy';
import { ExtractJwt } from "passport-jwt";

// ─────────────────────────────────────────────
// ❶ generate 2048-bit key pair once per test file
// ─────────────────────────────────────────────
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// payload used in every test
const payload: TokenPayload = { sub: 'acc_1' };

// helper: issue token
const signToken = () =>
    jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '5m' });

const extract = ExtractJwt.fromExtractors(DEFAULT_EXTRACTORS);

describe('JwtStrategy', () => {
    const hook = jest.fn(async () => void 0);

    const strategy = new JwtStrategy(
        { publicKey },
        hook,
    );

    afterEach(() => hook.mockClear());

    it('validates token from cookie', async () => {
        const token = signToken();
        const req = { cookies: { access_token: token } };

        expect(extract(req)).toBe(token);
        await strategy.validate(payload);
        expect(hook).toHaveBeenCalledWith(payload);
    });

    it('validates token from Authorization header', async () => {
        const token = signToken();

        const req: any = { headers: { authorization: `Bearer ${token}` } };
        expect(extract(req)).toBe(token);

        const result = await strategy.validate(payload);
        expect(result).toEqual(payload);
        expect(hook).toHaveBeenCalledWith(payload);
    });

    it('throws if hook rejects', async () => {
        hook.mockRejectedValueOnce(new Error('blocked'));

        await expect(strategy.validate(payload)).rejects.toThrow('blocked');
    });
});
