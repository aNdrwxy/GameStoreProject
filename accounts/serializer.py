from rest_framework import serializers
from .models import User, Perfil
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken



class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nickname', 'password', 'rol', 'estado']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password

        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)

        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'nickname'

    def validate(self, attrs):
        nickname = attrs.get("nickname")
        password = attrs.get("password")

        if not nickname or not password:
            raise serializers.ValidationError("Debe enviar nickname y contraseña")

        try:
            user = User.objects.get(nickname=nickname)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Contraseña incorrecta")

        # ✅ Creamos el token manualmente (ya no usamos super().validate)
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'nickname': user.nickname,
            'rol': user.rol,
            'user_id': user.id
        }

    # 👇 Este método debe estar dentro de la clase (¡así sí funciona!)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['nickname'] = user.nickname
        token['user_id'] = user.id
        return token