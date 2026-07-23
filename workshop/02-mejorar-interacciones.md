# Módulo 2 — Mejorar las Interacciones con GitHub Copilot

⏱️ **Duración:** 10 minutos
🎯 **Objetivo:** obtener respuestas más precisas y consistentes usando **contexto**, **instrucciones personalizadas**, **prompt files**, **chat modes** y **selección de modelo**.

## 2.1 Variables de contexto (`#…`)

Las variables `#` inyectan contexto tipado en tu prompt. Son mucho más precisas que describir el contexto con palabras.

| Variable | Qué inyecta |
|---------|-------------|
| `#codebase` | Índice semántico de todo el workspace (sustituye a `@workspace` en la mayoría de casos). |
| `#file` | Contenido de un archivo específico. |
| `#folder` | Todos los archivos de una carpeta. |
| `#selection` | La selección actual del editor. |
| `#problems` | Todos los diagnósticos (errores/warnings) del workspace. |
| `#terminalLastCommand` | Último comando ejecutado en la terminal y su salida. |
| `#terminalSelection` | Selección actual en el panel de terminal. |
| `#changes` | Diff de los cambios Git actuales (staged + unstaged). |
| `#usage` | Referencias/definiciones de un símbolo. |
| `#fetch` | Contenido de una URL pública (documentación, etc.). |
| `#githubRepo` | Información de un repositorio GitHub remoto. |

### Ejercicio (1 min)

En la Chat View (modo Ask), lanza este prompt:

```text
Basado en #codebase, ¿qué versión de NestJS estamos usando y qué scripts npm hay disponibles?
```

Compara la respuesta con lanzar el mismo prompt **sin** `#codebase`. Notarás mayor precisión.

## 2.2 Adjuntar archivos, carpetas e imágenes

En la caja del chat verás el icono **📎 Add Context** (o usa `Ctrl+/`). Desde ahí puedes adjuntar:

- Archivos y carpetas del workspace.
- Símbolos (clases, funciones).
- Imágenes (screenshot de una UI, diagrama, error visual).
- La ventana activa (*Current editor*).

> 💡 Adjuntar imágenes funciona con modelos con visión (por ejemplo Claude Sonnet o GPT con visión). Ideal para «genera el HTML/CSS de este mockup».

## 2.3 Selección de modelo

El **selector de modelo** en la parte inferior de la caja de chat te permite elegir el LLM que resolverá el prompt.

Guía rápida:

- **Claude Sonnet / Opus**: excelente para razonamiento largo, refactors complejos y explicaciones.
- **GPT-5 / GPT-4.1**: buen balance para tareas de generación, edición y agente.
- **o-series (razonadores)**: tareas con muchas dependencias lógicas, matemáticas, algoritmos.
- **Modelos rápidos** (por ejemplo GPT-4o mini, Haiku): completions rápidas, edits pequeños.

## 2.4 Custom Instructions

Copilot lee automáticamente instrucciones desde archivos especiales del repo. Esto **evita repetir el mismo prompt** una y otra vez.

### 2.4.1 Instrucciones globales del repo

Ya existe [.github/copilot-instructions.md](.github/copilot-instructions.md) en el proyecto. Ábrelo y revísalo:

```text
Para este proyecto de Nest JS, utilizaremos @nestjs/typeorm para la persistencia...
Usaremos class-validator y class-transformer...
No uses `any` para definir los tipos de las variables.
Usa uuid v4 para generar los IDs.
```

Copilot lo aplicará **a cada prompt** dentro de este workspace.

### 2.4.2 Instrucciones específicas por patrón (`.instructions.md`)

Puedes crear reglas más granulares que sólo se activen para ciertos archivos.

Crea el archivo `.github/instructions/typescript.instructions.md` con este contenido:

```markdown
---
applyTo: "**/*.ts"
---

- Usa siempre tipos explícitos en los parámetros y valores de retorno de funciones exportadas.
- Prefiere `readonly` en propiedades inmutables de clases.
- Evita `enum`; usa `as const` con union types.
- Todas las importaciones deben ser relativas al alias `src/` cuando exista.
```

Copilot cargará estas reglas **sólo cuando trabajes con archivos `.ts`**.

> 📌 El frontmatter `applyTo` acepta patrones glob. Puedes tener varios archivos `.instructions.md` para distintas capas del proyecto (por ejemplo `**/*.spec.ts`, `src/products/**`, etc.).

### 2.4.3 Ejercicio

1. Crea el archivo del punto anterior.
2. Vuelve a un archivo `.ts` y pídele a Copilot (modo Ask):

   ```text
   #codebase Sugiere una refactorización para el AppService que respete nuestras convenciones.
   ```

3. Observa cómo la respuesta ahora **respeta** las reglas del `.instructions.md`.

## 2.5 Prompt Files (`.prompt.md`)

Los prompt files son plantillas reutilizables. Se guardan en `.github/prompts/` y aparecen como slash commands en el chat.

Crea `.github/prompts/generar-crud-nestjs.prompt.md`:

```markdown
---
mode: agent
description: Genera un módulo NestJS completo (entity, DTOs, service, controller y módulo) siguiendo las convenciones del proyecto.
---

Genera un módulo NestJS llamado **${input:name:products}** con estas características:

- Entity con TypeORM y `@PrimaryGeneratedColumn('uuid')`.
- DTOs `Create` y `Update` (usando `PartialType` de `@nestjs/mapped-types`).
- Servicio con métodos `create`, `findAll`, `findOne`, `update`, `remove`.
- Controller con endpoints REST.
- Módulo registrado con `TypeOrmModule.forFeature`.
- Todos los métodos deben lanzar `NotFoundException` cuando corresponda.
- Sigue estrictamente las reglas de #codebase.
```

Ahora en el chat escribe `/generar-crud-nestjs` y elige el prompt. Podrás pasar el nombre como parámetro.

## 2.6 Custom Chat Modes (`.chatmode.md`)

Puedes crear **modos de chat personalizados** con un system prompt y un set de herramientas restringido. Útil para «modo revisor de seguridad», «modo mentor», «modo DBA», etc.

Ejemplo (**no lo crees ahora**, sólo para conocer la sintaxis) en `.github/chatmodes/security-reviewer.chatmode.md`:

```markdown
---
description: Revisor de seguridad orientado a OWASP Top 10.
tools: ['codebase', 'search', 'problems']
model: Claude Sonnet 4.5
---

Eres un experto en seguridad. Revisa el código exclusivamente desde la óptica de OWASP Top 10.
Por cada problema:
1. Describe el riesgo.
2. Muestra un fragmento vulnerable.
3. Propón una mitigación con código concreto.
```

Lo usaremos en el [Módulo 5](05-seguridad.md).

## 2.7 MCP (Model Context Protocol) — mención

Los servidores MCP permiten conectar Copilot a **fuentes externas** (bases de datos, Jira, Confluence, tu propia API, etc.) mediante `.vscode/mcp.json`. Está fuera del alcance de este workshop de 1 h, pero recuerda que existe.

## 2.8 Checkpoint

Al terminar este módulo deberías haber:

- [x] Usado al menos 3 variables `#…` diferentes en un prompt.
- [x] Cambiado el modelo activo desde el selector.
- [x] Creado `.github/instructions/typescript.instructions.md`.
- [x] Creado un prompt file y ejecutado como slash command.

---

**← Anterior** [Módulo 1 - Métodos de Interacción](01-metodos-interaccion.md)
**Siguiente →** [Módulo 3 - Generación y Refactoring](03-generacion-y-refactoring.md)
