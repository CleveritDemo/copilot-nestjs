# Módulo 1 — Métodos de Interacción con GitHub Copilot

⏱️ **Duración:** 10 minutos
🎯 **Objetivo:** conocer los distintos puntos de contacto con Copilot y cuándo usar cada uno.

## 1.1 Panorama general

GitHub Copilot ya no es sólo autocompletado. Hoy expone múltiples superficies de interacción, cada una optimizada para un contexto distinto:

| Superficie | Atajo / Ubicación | Úsala cuando… |
|-----------|------------------|--------------|
| **Code Completions** (ghost text) | Sugerencia automática al escribir; `Tab` para aceptar | Escribes código y quieres autocompletar líneas o bloques. |
| **Next Edit Suggestions (NES)** | Aparece automáticamente después de una edición; `Tab` para saltar/aceptar | Acabas de cambiar algo y Copilot predice la siguiente edición relacionada. |
| **Inline Chat** | `Ctrl+I` / `Cmd+I` sobre la selección o cursor | Quieres modificar código concreto sin salir del editor. |
| **Chat View — modo Ask** | Vista Chat, selector de modo *Ask* | Preguntas conceptuales, exploración, «¿cómo funciona esto?». |
| **Chat View — modo Edit** | Vista Chat, selector de modo *Edit* | Editas varios archivos a la vez con vista previa antes de aplicar. |
| **Chat View — modo Agent** | Vista Chat, selector de modo *Agent* | Tareas complejas y multi-paso donde Copilot puede leer, editar, ejecutar comandos y correr tests. |
| **Quick Chat** | `Ctrl+Shift+I` / `Cmd+Shift+I` | Pregunta rápida sin abrir el panel completo. |
| **Smart Actions** | Menú contextual del editor (clic derecho → Copilot) | Acciones específicas: *Explain*, *Fix*, *Review*, *Generate Docs*, *Generate Tests*. |
| **Copilot CLI** | Terminal: `gh copilot suggest` / `gh copilot explain` | Comandos de shell y explicaciones desde la terminal. |
| **Copilot Code Review** | Botón *Review* en el chat o en un Pull Request | Revisión asistida de un diff antes de commitear/mergear. |

> ⚠️ **Ya no existe** el panel independiente «Copilot Edits» que aparecía en la versión anterior del workshop. Ahora Edit está integrado como un **modo** dentro de la Chat View, junto a Ask y Agent.

## 1.2 Ejercicio guiado (5 min)

Vamos a probar 4 superficies en la propia base del proyecto.

### 1.2.1 Code Completions

1. Abre [src/app.service.ts](src/app.service.ts).
2. Debajo del método `getHello()`, empieza a escribir:

   ```typescript
   getGreeting(name: string):
   ```

3. Espera 1 segundo: Copilot te sugerirá completar la firma y el cuerpo. Presiona `Tab` para aceptar.

### 1.2.2 Next Edit Suggestions (NES)

1. En el mismo archivo, cambia `getHello()` para que devuelva `'Hola Mundo!'` en español.
2. Copilot detectará que probablemente quieres cambiar también el test relacionado en [src/app.controller.spec.ts](src/app.controller.spec.ts) y te ofrecerá saltar allí. Presiona `Tab` para navegar y volver a `Tab` para aceptar la propuesta de edición.

### 1.2.3 Inline Chat

1. Selecciona el método `getHello()` y presiona `Ctrl+I` (`Cmd+I` en macOS).
2. Escribe:

   ```text
   Añade un parámetro opcional `locale` que devuelva el saludo en español o inglés según el valor.
   ```

3. Revisa el diff que aparece inline y acepta con `Enter` o descarta con `Esc`.

### 1.2.4 Chat View — modo Ask

1. Abre la Chat View (`Ctrl+Alt+I`).
2. En el selector de modo (parte inferior de la caja de texto) elige **Ask**.
3. Escribe:

   ```text
   Explícame la estructura de este proyecto NestJS y qué hace cada archivo dentro de src/.
   ```

4. Adjunta contexto con `#codebase` para que la respuesta se base en tu workspace.

## 1.3 Copilot en la CLI

Desde una terminal integrada de VS Code, prueba:

```bash
gh copilot suggest "levantar un contenedor de postgres 16 con volumen persistente y base copilot-nestjs"
```

```bash
gh copilot explain "docker run --name pg -e POSTGRES_PASSWORD=xyz -p 5432:5432 -d postgres:16"
```

> 💡 Copilot CLI te permite **ejecutar**, **copiar** o **revisar** el comando sugerido antes de correrlo.

## 1.4 Copilot Code Review (mención rápida)

En la Chat View, al lado del botón de enviar, existe la acción **Review**. Puedes:

- Seleccionar código y pedir *Review* desde el menú contextual.
- Pedir revisión completa de un archivo o de tus cambios con `#changes`.

Lo usaremos a fondo en el [Módulo 5 - Seguridad](05-seguridad.md).

## 1.5 Checkpoint

Al terminar este módulo deberías haber:

- [x] Aceptado al menos una code completion.
- [x] Usado Inline Chat para modificar un método.
- [x] Ejecutado un prompt en la Chat View en modo Ask.
- [x] Ejecutado `gh copilot suggest` en la terminal.

---

**← Anterior** [Módulo 0 - Introducción y Setup](00-introduccion-y-setup.md)
**Siguiente →** [Módulo 2 - Mejorar las Interacciones](02-mejorar-interacciones.md)
