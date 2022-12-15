import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotificaiton } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotificaiton({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exist', () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake_notification_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
