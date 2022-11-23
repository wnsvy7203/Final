# Generated by Django 3.2.13 on 2022-11-22 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='comments',
            field=models.ManyToManyField(related_name='user_comments', to='movies.Comment'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='like_genres',
            field=models.ManyToManyField(to='movies.Genre'),
        ),
        migrations.AddField(
            model_name='user',
            name='movies',
            field=models.ManyToManyField(related_name='user_like_movies', to='movies.Movie'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
