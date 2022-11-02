from django.urls import path
from .views import get_tokens, MyTokenObtainPairView, get_todos,todo_detail, UserCreate 


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('', get_tokens),
    path('todos/', get_todos),
    path('todo-detail/<int:pk>', todo_detail),

    path('signup/', UserCreate.as_view()),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]
