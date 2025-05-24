/** Options passed via `AuthCoreModule.forRoot()` */
export const JWT_CORE_OPTIONS = Symbol('JWT_CORE_OPTIONS');

/** Async hook that performs extra checks on decoded JWT payload */
export const JWT_VALIDATE_HOOK = Symbol('JWT_VALIDATE_HOOK');
