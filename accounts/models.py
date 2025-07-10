from django.db import models
from django.contrib.auth.hashers import make_password

# MODELO DE USUARIO
class User(models.Model):
    ROL_CHOICES = [
        ('user', 'Usuario'),
        ('admin', 'Administrador'),
        ('mod', 'Moderador'),
        ('dev', 'Creador de Juegos')
    ]

    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('suspendido', 'Suspendido'),
        ('baneado', 'Baneado')
    ]

    nickname = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=400)  # se guarda encriptada
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='user')
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='activo')

    def __str__(self):
        return self.nickname
    
    def save(self, *args, **kwargs):
        if not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

# MODELO DE PERFIL
class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="perfil")
    nombre_perfil = models.CharField(max_length=50, default="Nuevo Usuario")
    edad = models.PositiveIntegerField(null=True, blank=True)
    sexo = models.CharField(max_length=10, null=True, blank=True)
    descripcion = models.TextField(default="Esta es su Descripción", null=True)
    avatar = models.URLField(default="https://i.pinimg.com/236x/d4/74/1c/d4741cb779ddec6509ca1ae0cb137a7d.jpg")
    background = models.URLField(default="https://w.wallhaven.cc/full/ml/wallhaven-mldl19.jpg")

    def __str__(self):
        return f"Perfil de {self.user.nickname}"
