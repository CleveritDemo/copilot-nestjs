# Módulo 0 — Introducción y Setup

⏱️ **Duración:** 5 minutos
🎯 **Objetivo:** dejar el entorno listo para el workshop y verificar que Copilot responde correctamente.

## 0.1 Verificar la instalación de Copilot

1. Abre VS Code.
2. En la barra de estado (parte inferior) confirma que aparece el icono de **GitHub Copilot** activo.
3. Abre la vista **Chat** desde el icono de la barra lateral, o con `Ctrl+Alt+I` (Windows/Linux) / `Cmd+Ctrl+I` (macOS).
4. Escribe un prompt corto de prueba, por ejemplo:

   ```text
   Hola Copilot, ¿en qué versión de VS Code estoy?
   ```

Si obtienes respuesta, todo está en orden. Si no, revisa que la sesión de GitHub esté iniciada (`GitHub: Sign in` desde la paleta de comandos, `Ctrl+Shift+P`).

## 0.2 Verificar Copilot CLI

En una terminal externa (o en la integrada de VS Code) ejecuta:

```bash
gh copilot --version
```

Si no lo tienes instalado, instálalo con:

```bash
gh extension install github/gh-copilot
```

## 0.3 Instalar dependencias del proyecto

Desde la raíz del repo (rama `updated-main`):

```bash
npm install
```

## 0.4 (Opcional) Levantar Postgres con Docker

Sólo si quieres completar la parte opcional de persistencia:

```bash
docker run --name postgres-workshop -e POSTGRES_PASSWORD=workshop -e POSTGRES_DB=copilot-nestjs -p 5432:5432 -d postgres:16
```

## 0.5 Estructura de archivos que vas a usar

```text
copilot-nestjs/
├── .github/
│   └── copilot-instructions.md        ← instrucciones globales del repo
├── src/                                ← código NestJS base
├── test/
└── workshop/
    ├── README.md                       ← índice del workshop
    ├── 00-introduccion-y-setup.md      ← este archivo
    ├── 01-metodos-interaccion.md
    ├── 02-mejorar-interacciones.md
    ├── 03-generacion-y-refactoring.md
    ├── 04-pruebas-unitarias.md
    ├── 05-seguridad.md
    └── recursos/
```

## 0.6 Comprobar el modelo activo

En la parte inferior de la ventana de chat aparece el **selector de modelo**. Verifica que puedas elegir entre modelos disponibles (por ejemplo Claude Sonnet, GPT-5, o el que ofrezca tu plan). Usaremos varios modelos durante el workshop.

> 💡 **Tip:** para tareas de generación de código a gran escala, un modelo grande suele dar mejores resultados. Para tareas rápidas o de refactor puntual, un modelo intermedio es más ágil.

---

**← Anterior** [Índice del workshop](README.md)
**Siguiente →** [Módulo 1 - Métodos de Interacción](01-metodos-interaccion.md)
