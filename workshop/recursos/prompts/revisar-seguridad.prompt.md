---
mode: ask
description: Auditoría de seguridad tipo OWASP Top 10 sobre los archivos adjuntos o la selección actual.
---

Revisa el código adjunto desde la óptica de **OWASP Top 10 (2021)**.

Por cada hallazgo devuelve una fila en una tabla Markdown con:

| # | Categoría OWASP | Severidad | Extracto vulnerable | Impacto | Mitigación (código NestJS) |

Considera al menos:

- A01 Broken Access Control
- A02 Cryptographic Failures
- A03 Injection (SQLi, command injection, `eval`)
- A05 Security Misconfiguration (CORS, headers, defaults inseguros)
- A07 Identification and Authentication Failures (comparaciones inseguras, tokens estáticos)
- A08 Software and Data Integrity Failures (deserialización insegura)
- A09 Security Logging and Monitoring Failures

Si algo requiere una dependencia adicional (`helmet`, `@nestjs/throttler`, `argon2`, …), indícalo explícitamente al final de la tabla.
