from rest_framework import viewsets
from .serializer import JuegoSerializer
from .models import Juego

# Create your views here.

class JuegoView(viewsets.ModelViewSet):
    serializer_class = JuegoSerializer
    queryset = Juego.objects.all()
