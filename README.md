<!-- README.md : @open-auth-kit/auth-core -->
<p align="center">
  <img src="https://avatars.githubusercontent.com/u/209502582?s=200&v=4" height="192" alt="open-auth-kit logo" />
</p>
<h2 align="center">auth-core</h2>
<p align="center">
  <em>Minimal, plug-and-play <strong>JWT</strong> layer for Nest JS 11 / Node 20 +</em>
</p>

<p align="center">
  <a href="https://github.com/open-auth-kit/auth-core/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/open-auth-kit/auth-core/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@open-auth-kit/auth-core">
    <img alt="npm" src="https://img.shields.io/npm/v/@open-auth-kit/auth-core">
  </a>
  <a href="LICENSE">
    <img alt="MIT" src="https://img.shields.io/npm/l/@open-auth-kit/auth-core">
  </a>
  <a href="https://open-auth-kit.github.io">
    <img alt="docs" src="https://img.shields.io/badge/docs-online-blue">
  </a>
</p>

---

## ✨ Features

| core | plug-in later |
|------|---------------|
| ✅ RS256 **JWT strategy & guard** (cookie **or** Bearer) | 🔌 Permissions / RBAC → `auth-permissions` |
| ✅ `JWT_VALIDATE_HOOK` — inject any extra checks | 🔌 TOTP / WebAuthn / OAuth providers |
| ✅ Dual-publish (CJS + ESM) & full TypeDoc API | |

---

## Installation

```bash
pnpm add @open-auth-kit/auth-core
```

## Usage

Register the module synchronously or asynchronously in your Nest application:

```ts
import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@open-auth-kit/auth-core';

@Module({
  imports: [
    AuthCoreModule.forRoot({
      publicKey: '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
    }),
  ],
})
export class AppModule {}
```

For asynchronous setup, use `forRootAsync()` and provide a factory returning
`JwtCoreOptions`.

## Building and testing

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

---

