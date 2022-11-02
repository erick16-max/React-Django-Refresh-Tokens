from django.db import models
from django.contrib.auth.models import User




# Create your models here.
class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    task = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    ordering = 'created_at'

    def __str__(self):
        return self.task

  
