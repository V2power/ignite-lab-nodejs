import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotificaiton } from '@test/factories/notification-factory';

describe('Count recipients notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotificaiton({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotificaiton({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotificaiton({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
