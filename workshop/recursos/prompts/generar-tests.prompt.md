---
mode: edit
description: Genera pruebas unitarias con Jest y @nestjs/testing para el service o controller adjunto.
---

Genera un archivo `.spec.ts` completo para los archivos adjuntos usando **Jest** y **@nestjs/testing**.

Requisitos:

- Usa `Test.createTestingModule` con providers mockeados.
- Para repositorios de TypeORM, mockea con `getRepositoryToken` y `useClass: Repository` o con un objeto de mocks.
- Incluye `jest.clearAllMocks()` al final de `beforeEach`.
- Cubre el **caso feliz** y **al menos un caso de error** por método.
- Para excepciones específicas de NestJS (`NotFoundException`, `ConflictException`, `BadRequestException`), valida con `rejects.toThrow(new XxxException(...))`.
- No uses `any` como tipo.
- Sigue las convenciones del `#codebase`.

Al terminar, sugiéreme el comando exacto de npm para correr el spec generado.
