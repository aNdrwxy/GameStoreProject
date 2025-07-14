from rest_framework import serializers
from .models import JuegoBiblioteca, Biblioteca
from juegos.serializer import JuegoSerializer


class BibliotecaSerializer(serializers.ModelSerializer):
    juegos = serializers.SerializerMethodField()

    class Meta:
        model = Biblioteca
        fields = ['id', 'user', 'juegos']

    def get_juegos(self, obj):
        relaciones = JuegoBiblioteca.objects.filter(biblioteca=obj)
        juegos = [relacion.juego for relacion in relaciones]
        return JuegoSerializer(juegos, many=True).data

class JuegoBibliotecaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuegoBiblioteca
        fields = ('__all__')

