# Python - Django Best Practices

**Official Documentation**: [docs.djangoproject.com](https://docs.djangoproject.com/) - The gold standard of documentation.

## 1. Golden Rules

1.  **Batteries Included**: Use reliable built-in features (Auth, Admin, ORM) before 3rd party libs.
2.  **Fat Models, Thin Views**: Put business logic in Models or separate Service layer (`services.py`), not in Views.
3.  **Class Based Views (CBV) vs DRF**: For APIs, use **Django Rest Framework (DRF)**.

## 2. Folder Structure (Standard Layout)

```
project_root/
├── manage.py
├── config/             # Project settings (replaces default 'project_name' folder)
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/               # Functionality based apps
│   ├── users/
│   │   ├── models.py
│   │   ├── serializers.py  # DRF DTOs
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── services.py     # Business logic
│   └── products/
└── requirements.txt
```

## 3. Code Patterns (DRF)

### Serializers (Validation)

Use `ModelSerializer` for DB-backed APIs, `Serializer` for non-DB inputs.

```python
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']
        read_only_fields = ['id']
```

### Views (ViewSets)

Prefer `ModelViewSet` for standard CRUD. Use `APIView` for custom logic.

```python
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
```

## 4. Security

- **Settings**: `DEBUG = False` in production.
- **Secrets**: Use `python-decouple` or `django-environ` for `.env` files.
- **Middleware**: `SecurityMiddleware`, `CsrfViewMiddleware` (automatically included, do not remove).
