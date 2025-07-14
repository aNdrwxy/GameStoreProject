from django.urls import path, include
from rest_framework import routers
from .views import JuegoView

routerJuego = routers.DefaultRouter()
routerJuego.register(r'', JuegoView, 'Juego' )

urlpatterns = [
    path("api/v1/juego/", include(routerJuego.urls)),
]   
