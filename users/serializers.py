from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    api_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.get_absolute_url())

    def get_api_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.get_absolute_url(api=True))

    def get_thumbnail_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.thumbnail_url())

    class Meta:
        model = User
        read_only_fields = (
            "date_added",
            "is_featured",
            "uid",
            "username",
            "advancedUser",
            "is_editor",
            "is_manager",
            "email_is_verified",
        )
        fields = (
            "description",
            "date_added",
            "name",
            "is_featured",
            "thumbnail_url",
            "url",
            "api_url",
            "username",
            "advancedUser",
            "is_editor",
            "is_manager",
            "email_is_verified",
        )


class UserDetailSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    api_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.get_absolute_url())

    def get_api_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.get_absolute_url(api=True))

    def get_thumbnail_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.thumbnail_url())

    class Meta:
        model = User
        read_only_fields = ("date_added", "is_featured", "uid", "username")
        fields = (
            "description",
            "date_added",
            "name",
            "is_featured",
            "thumbnail_url",
            "banner_thumbnail_url",
            "url",
            "username",
            "media_info",
            "api_url",
            "edit_url",
            "default_channel_edit_url",
        )
        extra_kwargs = {"name": {"required": False}}


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255, required=False)
    username = serializers.CharField(max_length=255, required=False)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, required=False)

    def validate(self, data):
        email = data.get('email', None)
        username = data.get('username', None)
        password = data.get('password', None)

        if settings.ACCOUNT_AUTHENTICATION_METHOD == 'username' and not username:
            raise serializers.ValidationError('登录时需要输入用户名。')
        else:
            username_or_email = username
        if settings.ACCOUNT_AUTHENTICATION_METHOD == 'email' and not email:
            raise serializers.ValidationError('登录时需要使用电子邮件。')
        else:
            username_or_email = email

        if settings.ACCOUNT_AUTHENTICATION_METHOD == 'username_email' and not (username or email):
            raise serializers.ValidationError('登录时需要输入用户名或电子邮件。')
        else:
            username_or_email = username or email

        if password is None:
            raise serializers.ValidationError('登录时需要输入密码。')

        user = authenticate(username=username_or_email, password=password)

        if user is None:
            raise serializers.ValidationError('用户没有找到。')

        if not user.is_active:
            raise serializers.ValidationError('用户已被停用。')

        token = Token.objects.filter(user=user).first()
        if not token:
            token = Token.objects.create(user=user)

        return {'email': user.email, 'username': user.username, 'token': token.key}
