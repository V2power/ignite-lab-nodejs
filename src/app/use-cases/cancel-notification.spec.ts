import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { CancelNotification } from './cancel-notification';
import { makeNotificaiton } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new CancelNotification(notificationRepository);

    const notification = makeNotificaiton();

    await notificationRepository.create(notification);

    await sendNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake_notification_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
