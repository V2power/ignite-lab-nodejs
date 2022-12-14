import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should ne able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'any_recipient_id',
    });

    expect(notification).toBeTruthy();
  });
});
