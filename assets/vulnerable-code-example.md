# Vulnerable Code Example — for the Security Module

> ⚠️ **Do NOT ship to production.** This file is intentionally broken so you can practice
> detection and remediation with GitHub Copilot Chat. See the workshop step
> *"Security — Detect and Mitigate Vulnerabilities"* in the README.

Copy the following snippet into `src/vulnerable.controller.ts` before starting the
security exercises.

```typescript
// src/vulnerable.controller.ts
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

// Hardcoded credential (OWASP A02: Cryptographic Failures / A07: Ident. and Auth. Failures)
const ADMIN_PASSWORD = 'P@ssw0rd123!';
const DB_URL = 'postgres://postgres:mysecretpassword@localhost:5432/copilot-nestjs';

@Controller('legacy')
export class VulnerableController {
  constructor(private readonly dataSource: DataSource) {}

  // A03: Injection — SQL injection via string concatenation
  @Get('search')
  async search(@Query('name') name: string) {
    const query = `SELECT * FROM product WHERE name = '${name}'`;
    return this.dataSource.query(query);
  }

  // A03: Injection — eval() over user input
  @Post('calc')
  calc(@Body('expression') expression: string) {
    // Arbitrary code execution
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return eval(expression);
  }

  // A07: Identification and Authentication Failures — non-constant compare, no hashing
  @Post('login')
  login(@Body() body: { user: string; password: string }) {
    if (body.password == ADMIN_PASSWORD) {
      // A09: Security Logging Failures — password logged in plain text
      console.log(`Login OK for user=${body.user} pwd=${body.password}`);
      return { token: 'super-secret-static-token' };
    }
    return { ok: false };
  }

  // A01: Broken Access Control — read any file on disk
  @Get('file')
  readFile(@Query('path') path: string) {
    return fs.readFileSync(path, 'utf-8');
  }

  // A05: Security Misconfiguration — permissive CORS
  @Get('open-cors')
  openCors(@Req() req: any) {
    req.res.setHeader('Access-Control-Allow-Origin', '*');
    req.res.setHeader('Access-Control-Allow-Credentials', 'true');
    return { data: 'accessible from any origin' };
  }

  // A08: Software and Data Integrity Failures — unsafe deserialization
  @Post('import')
  importData(@Body('payload') payload: string) {
    const obj = JSON.parse(payload);
    // Payload config applied without validation
    Object.assign(process.env, obj.env ?? {});
    return { imported: true };
  }
}
```

## OWASP categories covered

| ID  | Category                                     | Where            |
| --- | -------------------------------------------- | ---------------- |
| A01 | Broken Access Control                        | `readFile`       |
| A02 | Cryptographic Failures                       | `ADMIN_PASSWORD`, `DB_URL` |
| A03 | Injection                                    | `search`, `calc` |
| A05 | Security Misconfiguration                    | `openCors`       |
| A07 | Identification and Authentication Failures   | `login`          |
| A08 | Software and Data Integrity Failures         | `importData`     |
| A09 | Security Logging and Monitoring Failures     | `console.log` with password |
