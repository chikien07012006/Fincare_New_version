from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = models.CharField(max_length=255, null=True, blank=True, default=None)
    email = models.EmailField(unique=True, verbose_name=_("email address"))
    full_name = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = CustomUserManager()  # Sử dụng AbstractUserManager mặc định, nhưng chúng ta sẽ tùy chỉnh sau

    def __str__(self):
        return self.full_name

    @classmethod
    def create_user(cls, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The email must be set")
        email = cls.normalize_email(email)
        # Tạo user mà không yêu cầu username
        user = cls(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=None)
        return user

    @classmethod
    def create_superuser(cls, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return cls.create_user(email, password, **extra_fields)