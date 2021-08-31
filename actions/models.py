from django.db import models

from files.models import Media
from users.models import User

USER_MEDIA_ACTIONS = (
    ("like", "喜欢"),
    ("dislike", "不喜欢"),
    ("watch", "观看"),
    ("report", "报告"),
    ("rate", "评分"),
)


class MediaAction(models.Model):
    """Stores different user actions"""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_index=True,
        blank=True,
        null=True,
        related_name="useractions",
    )
    session_key = models.CharField(
        max_length=33,
        db_index=True,
        blank=True,
        null=True,
        help_text="for not logged in users",
    )

    action = models.CharField("动作", max_length=20, choices=USER_MEDIA_ACTIONS, default="watch")
    # keeps extra info, eg on report action, why it is reported
    extra_info = models.TextField("扩展信息", blank=True, null=True)

    media = models.ForeignKey(Media, on_delete=models.CASCADE, related_name="mediaactions")
    action_date = models.DateTimeField("动作时间", auto_now_add=True)
    remote_ip = models.CharField("远程IP", max_length=40, blank=True, null=True)

    def save(self, *args, **kwargs):
        super(MediaAction, self).save(*args, **kwargs)

    def __str__(self):
        return self.action

    class Meta:
        indexes = [
            models.Index(fields=["user", "action", "-action_date"]),
            models.Index(fields=["session_key", "action"]),
        ]
        verbose_name = '媒体动作'
        verbose_name_plural = verbose_name
