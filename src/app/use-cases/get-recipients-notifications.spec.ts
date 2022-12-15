import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotificaiton } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Count recipients notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
