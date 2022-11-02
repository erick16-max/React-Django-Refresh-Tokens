from wsgiref.validate import validator
from django.forms import EmailField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from  rest_framework.serializers import ModelSerializer
from  rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User 
from base.models import Todo


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        

        return token

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class UserSerializer(ModelSerializer):
    email = serializers.EmailField()
    def validate_email(self, value):
        lower_email = value.lower()
        if User.objects.filter(email__iexact=lower_email).exists():
            raise serializers.ValidationError("Email already exists")
        return lower_email
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        # extra_kwargs = {'password':{'write-only':True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user