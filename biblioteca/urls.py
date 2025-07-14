from django.urls import path, include
from rest_framework import routers
from .views import BibliotecaView, JuegoBibliotecaView, BibliotecaPorUserId 

routerBiblioteca = routers.DefaultRouter()
routerBiblioteca.register(r'', BibliotecaView, 'Biblioteca' )

routerJuegoBiblioteca = routers.DefaultRouter()
routerJuegoBiblioteca.register(r'', JuegoBibliotecaView, 'JuegoBiblioteca' )

urlpatterns = [
    path("api/v1/biblioteca/", include(routerBiblioteca.urls)),
    path("api/v1/juegosBilioteca/", include(routerJuegoBiblioteca.urls)),
    path('api/biblioteca/<int:user_id>/', BibliotecaPorUserId.as_view(), name='biblioteca_por_id'),

]   
