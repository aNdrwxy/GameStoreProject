from django.db import models
from accounts.models import User
from juegos.models import Juego
# Create your models here.

class Biblioteca(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="biblioteca")
    juegos = models.ManyToManyField(Juego, through="JuegoBiblioteca", related_name="bibliotecas")

    def __str__(self):
        return f"Biblioteca de {self.user.nickname}"


class JuegoBiblioteca(models.Model):
    biblioteca = models.ForeignKey(Biblioteca, on_delete=models.CASCADE)
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE)
    fecha_adquisicion = models.DateTimeField(auto_now_add=True)
    horas_jugadas = models.PositiveIntegerField(default=0)
    ultima_vez_jugado = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['biblioteca', 'juego'], name='unique_juego_por_biblioteca')
        ]

    def __str__(self):
        return f"{self.juego.nombre} en {self.biblioteca.user.nickname}"