# Ejemplo — Código intencionalmente vulnerable

Este snippet contiene múltiples vulnerabilidades **intencionadas** para practicar el
[Módulo 5 - Seguridad](../05-seguridad.md). Copia el contenido a `src/vulnerable.controller.ts`
antes de empezar los ejercicios.

> ⚠️ **NO uses este código en producción.** Está roto a propósito.

```typescript
// src/vulnerable.controller.ts
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

// Credencial hardcodeada (OWASP A02: Cryptographic Failures / A07: Ident. and Auth. Failures)
const ADMIN_PASSWORD = 'P@ssw0rd123!';
const DB_URL = 'postgres://postgres:mysecretpassword@localhost:5432/copilot-nestjs';

@Controller('legacy')
export class VulnerableController {
  constructor(private readonly dataSource: DataSource) {}

  // A03: Injection — SQL injection por concatenación de strings
  @Get('search')
  async search(@Query('name') name: string) {
    const query = `SELECT * FROM product WHERE name = '${name}'`;
    return this.dataSource.query(query);
  }

  // A03: Injection — eval() sobre input del usuario
  @Post('calc')
  calc(@Body('expression') expression: string) {
    // Ejecución arbitraria de código
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return eval(expression);
  }

  // A07: Identification and Authentication Failures — comparación no constante y sin hash
  @Post('login')
  login(@Body() body: { user: string; password: string }) {
    if (body.password == ADMIN_PASSWORD) {
      // A09: Security Logging Failures — logueando la contraseña en claro
      console.log(`Login OK for user=${body.user} pwd=${body.password}`);
      return { token: 'super-secret-static-token' };
    }
    return { ok: false };
  }

  // A01: Broken Access Control — leer cualquier archivo del sistema
  @Get('file')
  readFile(@Query('path') path: string) {
    return fs.readFileSync(path, 'utf-8');
  }

  // A05: Security Misconfiguration — CORS abierto y respuesta con headers permisivos
  @Get('open-cors')
  openCors(@Req() req: any) {
    req.res.setHeader('Access-Control-Allow-Origin', '*');
    req.res.setHeader('Access-Control-Allow-Credentials', 'true');
    return { data: 'accessible desde cualquier origen' };
  }

  // A08: Software and Data Integrity Failures — deserialización insegura
  @Post('import')
  importData(@Body('payload') payload: string) {
    const obj = JSON.parse(payload);
    // Se usa la config del payload sin validar
    Object.assign(process.env, obj.env ?? {});
    return { imported: true };
  }
}
```

## Categorías OWASP presentes

| ID | Categoría | Dónde |
|----|-----------|-------|
| A01 | Broken Access Control | `readFile` |
| A02 | Cryptographic Failures | `ADMIN_PASSWORD`, `DB_URL` |
| A03 | Injection | `search`, `calc` |
| A05 | Security Misconfiguration | `openCors` |
| A07 | Ident. and Auth. Failures | `login` |
| A08 | Software and Data Integrity Failures | `importData` |
| A09 | Security Logging and Monitoring Failures | `console.log` con contraseña |
