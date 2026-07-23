# Módulo 3 — Generación Automática de Código y Refactoring

⏱️ **Duración:** 15 minutos
🎯 **Objetivo:** construir un módulo NestJS completo con **Agent Mode**, extenderlo con **Edit Mode** y pulirlo con **Inline Chat**.

## 3.1 Panorama

| Escenario | Modo recomendado |
|-----------|-----------------|
| Crear varios archivos nuevos con estructura compleja y ejecutar comandos (npm install, etc.). | **Agent Mode** |
| Modificar varios archivos existentes de forma coordinada, con vista previa antes de aplicar. | **Edit Mode** |
| Cambios pequeños y localizados dentro de un archivo. | **Inline Chat** (`Ctrl+I`) |
| Preguntas conceptuales sin modificar código. | **Ask Mode** |

## 3.2 Ejercicio 1 — Crear el módulo `products` con Agent Mode (7 min)

### Paso 1. Cambiar al modo Agent

En la Chat View, selecciona **Agent** en el selector de modo.

### Paso 2. Enviar el prompt

```text
#codebase Crea un módulo NestJS `products` con esta estructura:

- `src/products/entities/product.entity.ts`: entity TypeORM con id (uuid v4), name, description, image, price, quantity, isAvailable, category.
- `src/products/dto/create-product.dto.ts`: DTO con validaciones de class-validator.
- `src/products/dto/update-product.dto.ts`: extiende de CreateProductDto usando `PartialType` de `@nestjs/mapped-types`.
- `src/products/products.service.ts`: CRUD completo con Repository de TypeORM. `findOne` debe lanzar `NotFoundException`.
- `src/products/products.controller.ts`: endpoints REST estándar.
- `src/products/products.module.ts`: registra el TypeOrmModule.forFeature([Product]).

Después:
1. Actualiza `src/app.module.ts` para importar `ProductsModule` y configurar `TypeOrmModule.forRoot` leyendo desde `@nestjs/config` (host, port, username, password, database desde .env).
2. Crea un `.env.example` con las variables.
3. Instala las dependencias necesarias (`@nestjs/typeorm`, `typeorm`, `pg`, `class-validator`, `class-transformer`, `@nestjs/config`, `@nestjs/mapped-types`, `uuid`).
4. Corre `npm run build` para verificar que compila.

Respeta las reglas de #codebase (no uses `any`, usa uuid v4, etc.).
```

### Paso 3. Revisar y aprobar

Agent Mode te mostrará **cada acción** (ejecución de comandos, creación de archivos, edición de archivos existentes) y te pedirá aprobación para las que afecten el sistema. Aprueba las que quieras aplicar.

> 💡 Puedes **detener** al agente con el botón *Stop* en la parte superior del chat, o **pausarlo** para inspeccionar un cambio antes de que continúe.

### Paso 4. Verificar

Cuando el agente indique que terminó:

```bash
npm run build
```

Si compila, el módulo está listo.

## 3.3 Ejercicio 2 — Refactor con Edit Mode (4 min)

Ahora vamos a **añadir un campo `sku`** a través de varios archivos usando Edit Mode.

### Paso 1. Cambiar a modo Edit

En la Chat View, selecciona **Edit**.

### Paso 2. Adjuntar los archivos

Adjunta al chat (con 📎 o arrastrando desde el explorador):

- `src/products/entities/product.entity.ts`
- `src/products/dto/create-product.dto.ts`
- `src/products/products.service.ts`
- `src/products/products.controller.ts`

### Paso 3. Enviar el prompt

```text
Añade un campo `sku: string` obligatorio y único al Product:

- En la entity, márcalo con `@Column({ unique: true })`.
- En el CreateProductDto, valida con `@IsString()` y `@Length(3, 32)`.
- En el service, en `create()`, si el sku ya existe, lanza `ConflictException` de `@nestjs/common`.
- Actualiza el controller si es necesario.

No modifiques nada más.
```

### Paso 4. Revisar el diff

Edit Mode te mostrará un **diff por archivo** que puedes aceptar o rechazar individualmente. Acepta los cambios que te parezcan correctos.

## 3.4 Ejercicio 3 — Refactor puntual con Inline Chat (2 min)

Abre `src/products/products.service.ts`, selecciona el método `findOne` y presiona `Ctrl+I`. Escribe:

```text
Refactoriza para que devuelva el producto con solo el `id`, `name` y `price`, usando `Pick<Product, ...>` como tipo de retorno.
```

Revisa el diff inline. Acepta con `Enter`.

## 3.5 Ejercicio 4 — Traducir código externo (2 min opcional)

En [recursos/openai-call-example.md](recursos/openai-call-example.md) hay un ejemplo Python de llamada a Azure OpenAI. Con Edit Mode:

1. Adjunta `recursos/openai-call-example.md` y `src/products/products.service.ts`.
2. Prompt:

   ```text
   Traduce la llamada Python de #file:openai-call-example.md a un servicio NestJS `OpenAIService` en `src/products/openai.service.ts` usando `@nestjs/axios`.
   Añade el `OpenAIService` como dependencia del `ProductsService` e inyéctalo en `findOne` para enriquecer la descripción del producto.
   No hardcodees la API key: usa `ConfigService` para leerla desde `OPENAI_API_KEY`.
   ```

> 🔐 **Nota de seguridad:** Copilot no deberá poner nunca la key hardcodeada. Si lo hace, es una oportunidad perfecta para el [Módulo 5](05-seguridad.md).

## 3.6 Checkpoint

Al terminar este módulo deberías tener:

- [x] Un módulo `products` funcional (compila con `npm run build`).
- [x] Campo `sku` propagado a entity, DTO, service.
- [x] Un refactor aplicado con Inline Chat.

---

**← Anterior** [Módulo 2 - Mejorar las Interacciones](02-mejorar-interacciones.md)
**Siguiente →** [Módulo 4 - Pruebas Unitarias](04-pruebas-unitarias.md)
