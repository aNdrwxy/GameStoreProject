from django.urls import path, include
from rest_framework import routers
from .views import UserView, get_current_user, CustomTokenObtainPairView, PerfilView
from rest_framework_simplejwt.views import TokenRefreshView

routerUser = routers.DefaultRouter()
routerUser.register(r'', UserView, 'User' )

routerProfile = routers.DefaultRouter()
routerProfile.register(r'', PerfilView, 'Profile' )

urlpatterns = [
    path("api/v1/user/", include(routerUser.urls)),
    path("api/v1/profile/", include(routerProfile.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', get_current_user),
]   
