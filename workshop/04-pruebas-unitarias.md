# Módulo 4 — Creación de Pruebas Unitarias

⏱️ **Duración:** 10 minutos
🎯 **Objetivo:** generar pruebas unitarias con Jest y `@nestjs/testing`, y usar Agent Mode para arreglar tests que fallen.

> 💡 **Requisito:** haber completado el [Módulo 3](03-generacion-y-refactoring.md) (necesitamos el `ProductsService`).

## 4.1 Slash command `/tests`

`/tests` genera tests para la selección actual o el archivo activo. Es el atajo más rápido para partir.

### Paso 1

Abre `src/products/products.service.ts` y **selecciona el método `findAll`**.

### Paso 2

En la Chat View (modo Ask o Edit), escribe:

```text
/tests Genera pruebas unitarias con Jest y @nestjs/testing para el método seleccionado. Mockea el Repository de TypeORM con `getRepositoryToken`.
```

### Paso 3

Copilot te propondrá el contenido de `src/products/products.service.spec.ts`. Acéptalo (si estás en Edit Mode) o cópialo manualmente (si estás en Ask).

Estructura esperada:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('devuelve un array de productos', async () => {
      const products: Product[] = [/* ... */];
      jest.spyOn(repository, 'find').mockResolvedValue(products);
      expect(await service.findAll()).toBe(products);
    });
  });
});
```

## 4.2 Ejecutar los tests

```bash
npm test
```

Si algún test falla, **no arregles a mano**: pasa al siguiente paso.

## 4.3 Arreglar tests con Agent Mode

Cuando un test falle, la salida del terminal quedará disponible en `#terminalLastCommand`.

### Prompt sugerido (modo Agent)

```text
Los tests de `products.service.spec.ts` están fallando. Usa #terminalLastCommand para diagnosticar y #problems para ver errores del compilador. Corrige los tests (no la lógica del servicio, salvo bug evidente) y vuelve a ejecutar `npm test` hasta que pasen todos.
```

Agent Mode:

1. Leerá el fallo.
2. Editará el spec.
3. Volverá a ejecutar `npm test`.
4. Iterará hasta pasar (o hasta que te pida ayuda).

> 💡 Si el agente entra en bucle, detenlo con **Stop** y pide un análisis más específico usando `#file:products.service.spec.ts`.

## 4.4 Completar la cobertura

Ahora **genera tests para el resto de los métodos** (`findOne`, `create`, `update`, `remove`) en un solo prompt:

En modo Edit, con `src/products/products.service.ts` y `src/products/products.service.spec.ts` adjuntos:

```text
Completa el spec para cubrir todos los métodos del ProductsService (findOne, create, update, remove).

Incluye:
- Caso feliz de cada método.
- `findOne` cuando NO existe el producto (debe lanzar `NotFoundException`).
- `create` cuando el sku ya existe (debe lanzar `ConflictException`).
- `update` cuando el id no existe.
- `remove` cuando el id no existe.

Sigue el estilo del spec actual y sigue las reglas de #codebase.
```

Verifica:

```bash
npm run test:cov
```

Copilot debería llevarte a **coverage cercano al 100%** en el service.

## 4.5 Bonus — Tests para el Controller

Con el mismo enfoque, en Edit Mode adjunta `src/products/products.controller.ts` y pide:

```text
Genera `src/products/products.controller.spec.ts` mockeando el `ProductsService` con `jest.fn()`.
Cubre todos los endpoints y verifica que se propaguen las excepciones del service.
```

## 4.6 Checkpoint

Al terminar este módulo deberías tener:

- [x] `products.service.spec.ts` con todos los métodos cubiertos y pasando.
- [x] (Bonus) `products.controller.spec.ts` pasando.
- [x] Experiencia arreglando un test fallido con Agent Mode + `#terminalLastCommand`.

---

**← Anterior** [Módulo 3 - Generación y Refactoring](03-generacion-y-refactoring.md)
**Siguiente →** [Módulo 5 - Seguridad](05-seguridad.md)
