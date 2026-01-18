# Node.js - NestJS Best Practices

**Official Documentation**: [docs.nestjs.com](https://docs.nestjs.com/) - This is the BIBLE. Follow it strictly.

## 1. Golden Rules

1.  **Dependency Injection (DI)**: Everything is a Provider (Injectable). Never instantiate services manually with `new Service()`.
2.  **Modules**: Organize code by domain `Modules` (UserModule, AuthModule). Use `SharedModule` for utilities.
3.  **DTOs**: Use Classes with `class-validator` decorators for all inputs.

## 2. Folder Structure (Standard NestJS)

```
src/
├── app.module.ts       # Root module
├── main.ts             # Entry point
├── modules/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       └── create-user.dto.ts
│   └── auth/
└── common/             # Interceptors, Filters, Guards, Decorators
    ├── filters/
    ├── guards/
    └── pipes/
```

## 3. Code Patterns

### Validation (Pipes)

Enable global validation pipe in `main.ts`.

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strip properties not in DTO
    forbidNonWhitelisted: true, // Throw error if extra props sent
    transform: true, // Auto-transform payloads to DTO instances
  }),
);
```

### Configuration

Use `@nestjs/config` for environment variables. Ensure validation with `joi` or custom validate function.

```typescript
ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
  }),
});
```

### Database (TypeORM / Prisma)

- **Prisma**: Preferred for type-safety. Create a `PrismaService` extending `PrismaClient` and `OnModuleInit`.
- **TypeORM**: Use standard Repository pattern provided by `@nestjs/typeorm`.

## 4. Security

- **Guards**: Use `@UseGuards(JwtAuthGuard)` for protected routes.
- **Interceptors**: Use `ClassSerializerInterceptor` to automatically exclude `@Exclude()` fields (like password) from responses.
