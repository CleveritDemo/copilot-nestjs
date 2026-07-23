# Módulo 5 — Detección y Mitigación de Vulnerabilidades de Seguridad

⏱️ **Duración:** 10 minutos
🎯 **Objetivo:** usar Copilot para identificar problemas comunes de **OWASP Top 10** y aplicar mitigaciones concretas.

## 5.1 Enfoque

Vamos a trabajar con un archivo **intencionalmente vulnerable** que ya está en el repo: [recursos/codigo-vulnerable-ejemplo.md](recursos/codigo-vulnerable-ejemplo.md).

Contiene un controller ficticio con al menos:

1. Credenciales hardcodeadas.
2. Inyección SQL potencial (concatenación de strings en query).
3. Falta de validación de input.
4. Logging de datos sensibles.
5. CORS abierto (`*`).
6. Verificación de contraseña con `==` (timing attack) y sin hashing.
7. `eval()` sobre input del usuario.

## 5.2 Ejercicio 1 — Copilot Code Review

### Paso 1

Copia el contenido del snippet a un archivo temporal `src/vulnerable.controller.ts` (puedes usar Copilot para crearlo).

### Paso 2

En el editor, con el archivo abierto:

1. Selecciona todo (`Ctrl+A`).
2. Menú contextual → **Copilot → Review and comment**.

Copilot generará comentarios inline con severidad y sugerencia de fix. Revísalos.

### Paso 3

Alternativa desde el chat (modo Ask):

```text
#file:src/vulnerable.controller.ts Revisa este archivo desde la óptica de OWASP Top 10 2021. Por cada hallazgo:

1. Categoría OWASP.
2. Severidad (Critical / High / Medium / Low).
3. Extracto del código vulnerable.
4. Impacto potencial.
5. Mitigación con código concreto para NestJS.

Devuelve el resultado como tabla Markdown.
```

## 5.3 Ejercicio 2 — Custom instructions para seguridad

Crea `.github/instructions/security.instructions.md`:

```markdown
---
applyTo: "src/**/*.ts"
---

Requisitos de seguridad no negociables para este proyecto:

- Nunca hardcodear secretos, tokens, API keys ni contraseñas. Usar `@nestjs/config` y `.env`.
- Todos los inputs de endpoints DEBEN validarse con `class-validator` y aplicarse `ValidationPipe` globalmente.
- Nunca concatenar strings para construir queries SQL. Usar el QueryBuilder de TypeORM o parámetros con placeholders.
- Nunca usar `eval`, `Function()` o `child_process.exec` con input del usuario.
- Contraseñas: hashear con `argon2` o `bcrypt` (cost ≥ 12) y comparar con la función `verify`/`compare` de la librería (constant time).
- Logs: nunca loguear tokens, contraseñas, PII ni cuerpos de request completos.
- CORS: nunca `origin: '*'` en producción. Leer allowlist desde config.
- Cabeceras: usar `helmet` en `main.ts`.
- Rate limiting: usar `@nestjs/throttler` en endpoints públicos.
```

Copilot aplicará estas reglas a partir de ahora **en cualquier prompt que involucre archivos bajo `src/`**.

## 5.4 Ejercicio 3 — Aplicar las mitigaciones con Agent Mode

En modo Agent:

```text
Refactoriza `src/vulnerable.controller.ts` siguiendo estrictamente las reglas del archivo `.github/instructions/security.instructions.md` y OWASP Top 10.

Para cada cambio explica brevemente qué vulnerabilidad mitiga.

Al terminar:
1. Instala las dependencias necesarias (`helmet`, `@nestjs/throttler`, `argon2` u otras si aplica).
2. Actualiza `main.ts` para aplicar `helmet` y `ValidationPipe` global.
3. Corre `npm run build` para verificar.
```

Aprueba los cambios uno a uno, revisando qué hace cada acción.

## 5.5 Ejercicio 4 — Detectar dependencias vulnerables

En la terminal:

```bash
npm audit
```

Si hay hallazgos, en el chat (modo Agent):

```text
Analiza la salida de #terminalLastCommand. Por cada dependencia vulnerable de severidad High/Critical, propón una acción (upgrade, replace, patch). Aplica los cambios de menor riesgo en `package.json` y corre `npm install` + `npm run build` para validar.
```

## 5.6 Copilot Autofix (GitHub Advanced Security)

Cuando este proyecto se suba a GitHub y esté habilitado **GitHub Advanced Security**, cada alerta de CodeQL o de secret scanning puede tener un **Copilot Autofix** que sugiere el PR de corrección automáticamente. Es la contraparte "server side" de lo que acabamos de hacer localmente.

## 5.7 Buenas prácticas al usar Copilot para seguridad

1. **Nunca confíes al 100 %** en el output. Copilot puede introducir código vulnerable si el prompt lo pide implícitamente. Siempre revisa.
2. **Refuerza con `.instructions.md`** las reglas duras (secretos, SQLi, XSS, deserialización).
3. **Usa Copilot Code Review** en cada PR como línea base, no como sustituto de SAST/DAST.
4. **Prefiere mitigaciones estándar** (helmet, class-validator, throttler, argon2) por encima de soluciones ad-hoc.
5. **Prompt injection en tool outputs**: cuando Copilot lea `#fetch` o herramientas MCP externas, ese contenido puede intentar manipular al modelo. Trata siempre el output de herramientas como *untrusted input*.

## 5.8 Checkpoint

Al terminar este módulo deberías haber:

- [x] Ejecutado Copilot Code Review sobre un archivo vulnerable.
- [x] Creado `.github/instructions/security.instructions.md`.
- [x] Refactorizado el archivo vulnerable con Agent Mode.
- [x] Corrido `npm audit` e interpretado el resultado con Copilot.

---

## 🎉 ¡Workshop completado

Repasa el [índice](README.md) y comparte tus dudas o feedback.

**← Anterior** [Módulo 4 - Pruebas Unitarias](04-pruebas-unitarias.md)
**Volver al índice →** [README del workshop](README.md)
