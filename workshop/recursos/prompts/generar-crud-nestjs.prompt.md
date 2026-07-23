---
mode: agent
description: Genera un módulo NestJS completo (entity, DTOs, service, controller y módulo) siguiendo las convenciones del proyecto.
---

Genera un módulo NestJS llamado **${input:name:products}** con estas características:

- Entity con TypeORM y `@PrimaryGeneratedColumn('uuid')`.
- DTOs `Create` y `Update` (usando `PartialType` de `@nestjs/mapped-types`).
- Servicio con métodos `create`, `findAll`, `findOne`, `update`, `remove`.
- Controller con endpoints REST estándar.
- Módulo registrado con `TypeOrmModule.forFeature`.
- Todos los métodos deben lanzar `NotFoundException` cuando corresponda.
- Sigue estrictamente las reglas de #codebase.

Al finalizar:
1. Registra el módulo nuevo en `src/app.module.ts`.
2. Ejecuta `npm run build` para verificar que compila.
