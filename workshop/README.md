# Workshop GitHub Copilot con NestJS (Edición 2026)

> Workshop práctico de **≈ 60 minutos** enfocado en las capacidades actuales de GitHub Copilot en Visual Studio Code.

## 🎯 Objetivos

Al finalizar este workshop serás capaz de:

1. Identificar y usar los distintos **métodos de interacción** con GitHub Copilot (completions, NES, Inline Chat, Chat View con modos Ask / Edit / Agent, Copilot CLI, Code Review).
2. **Mejorar la calidad** de las respuestas mediante contexto, instrucciones personalizadas, prompt files, chat modes y selección de modelo.
3. Aplicar Copilot para **generar código y refactorizar** un proyecto NestJS real (Agent Mode + Edit Mode + Inline Chat).
4. **Generar y arreglar pruebas unitarias** con Jest usando el slash command `/tests` y el modo agente.
5. **Detectar y mitigar vulnerabilidades** de seguridad comunes (OWASP Top 10) usando Copilot Code Review y prompts dirigidos.

## ⏱️ Estructura y tiempos

| # | Módulo | Duración | Archivo |
|---|--------|----------|---------|
| 0 | Introducción y setup | 5 min | [00-introduccion-y-setup.md](00-introduccion-y-setup.md) |
| 1 | Métodos de Interacción de GitHub Copilot | 10 min | [01-metodos-interaccion.md](01-metodos-interaccion.md) |
| 2 | Mejorar las Interacciones con GitHub Copilot | 10 min | [02-mejorar-interacciones.md](02-mejorar-interacciones.md) |
| 3 | Generación Automática de Código y Refactoring | 15 min | [03-generacion-y-refactoring.md](03-generacion-y-refactoring.md) |
| 4 | Creación de Pruebas Unitarias | 10 min | [04-pruebas-unitarias.md](04-pruebas-unitarias.md) |
| 5 | Detección y Mitigación de Vulnerabilidades | 10 min | [05-seguridad.md](05-seguridad.md) |
|   | **Total** | **≈ 60 min** | |

## 🛠️ Requisitos

- **VS Code** (última versión estable) con la extensión **GitHub Copilot** y **GitHub Copilot Chat** instaladas y activadas.
- **Node.js 20 LTS o superior** (recomendado 22 LTS).
- **Docker Desktop** (opcional; sólo si vas a levantar Postgres localmente).
- **GitHub CLI** (`gh`) con la extensión **Copilot CLI** instalada:
  ```bash
  gh extension install github/gh-copilot
  ```
- Una cuenta con suscripción activa de **GitHub Copilot** (Free, Pro, Business o Enterprise).

## 🚀 Cómo empezar

1. Clona el repositorio y cambia a la rama del workshop:

   ```bash
   git clone https://github.com/CleveritDemo/copilot-nestjs
   cd copilot-nestjs
   git checkout updated-main
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Abre el proyecto en VS Code:

   ```bash
   code .
   ```

4. Ve al [Módulo 0 - Introducción y Setup](00-introduccion-y-setup.md) y sigue el orden.

## 📚 Recursos incluidos

- [`recursos/openai-call-example.md`](recursos/openai-call-example.md) — ejemplo de llamada Python a Azure OpenAI (para el módulo de refactoring).
- [`recursos/codigo-vulnerable-ejemplo.md`](recursos/codigo-vulnerable-ejemplo.md) — snippet con vulnerabilidades intencionadas (para el módulo de seguridad).
- [`recursos/prompts/`](recursos/prompts/) — ejemplos de prompt files reutilizables.

## 📝 Notas importantes

> Este workshop está actualizado a las capacidades de GitHub Copilot vigentes en 2026. Las funcionalidades que aparecen en las ramas `step-*` originales (por ejemplo, «Copilot Edits» como panel separado, la exportación de chat a Markdown, el uso obligatorio de `@workspace`, etc.) han sido **reemplazadas o consolidadas** en el nuevo modelo unificado Ask / Edit / Agent y en el sistema de contexto por variables (`#codebase`, `#file`, `#problems`, etc.).

---

**Siguiente →** [Módulo 0 - Introducción y Setup](00-introduccion-y-setup.md)
