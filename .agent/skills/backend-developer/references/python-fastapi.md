# Python - FastAPI Best Practices

**Official Documentation**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) - Essential for Pydantic models and Dependency Injection.

## 1. Golden Rules

1.  **Strict Pydantic Models**: Every Request body and Response model must be a Pydantic schema.
2.  **Dependency Injection**: Use `Depends` for Database sessions, Auth, and Services.
3.  **Async/Await**: Use `async def` for I/O bound operations (DB, API calls). Use `def` for CPU bound to run in threadpool.

## 2. Folder Structure

```
src/
├── app/
│   ├── api/                # Router/Endpoints
│   │   ├── v1/
│   │       ├── endpoints/
│   │           ├── users.py
│   │           └── login.py
│   ├── core/               # Config, Security, Events
│   │   ├── config.py
│   │   └── security.py
│   ├── crud/               # DB operations (Repository pattern)
│   │   └── crud_user.py
│   ├── models/             # SQLAlchemy/SQLModel tables
│   │   └── user.py
│   ├── schemas/            # Pydantic models (DTOs)
│   │   └── user.py
│   └── main.py
└── algembic/                 # Migrations
```

## 3. Code Patterns

### Validation (Pydantic)

Separate `Base`, `Create`, `Update`, and `Response` schemas.

```python
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True # for ORM compatibility
```

### Dependency Injection (DB Session)

```python
# deps.py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# usage in route
@router.post("/", response_model=schemas.UserResponse)
def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    return crud.create_user(db=db, user=user)
```

## 4. Security

- **OAuth2**: Use `FastAPI.security.OAuth2PasswordBearer` for standard flows.
- **Password Hashing**: Use `passlib[bcrypt]`.
- **CORS**: `CORSMiddleware` configured in `main.py`.
