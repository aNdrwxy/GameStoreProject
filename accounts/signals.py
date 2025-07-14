from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Perfil
from biblioteca.models import Biblioteca

@receiver(post_save, sender=User)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(user=instance)
        Biblioteca.objects.create(user=instance)
