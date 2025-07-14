from rest_framework import viewsets
from .serializer import BibliotecaSerializer, JuegoBibliotecaSerializer
from .models import Biblioteca, JuegoBiblioteca
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import User

# Create your views here.

class BibliotecaView(viewsets.ModelViewSet):
    serializer_class = BibliotecaSerializer
    queryset = Biblioteca.objects.all()

class JuegoBibliotecaView(viewsets.ModelViewSet):
    serializer_class = JuegoBibliotecaSerializer
    queryset = JuegoBiblioteca.objects.all()

# Para la biblioteca personal
class BibliotecaPorUserId(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            biblioteca = Biblioteca.objects.get(user=user)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)
        except Biblioteca.DoesNotExist:
            return Response({"error": "Biblioteca no encontrada"}, status=404)

        serializer = BibliotecaSerializer(biblioteca)
        return Response(serializer.data)

