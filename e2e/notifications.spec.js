describe('notifications', () => {
  beforeEach(async () => {});

  it('should display the notification and fade out after 3 seconds', async () => {
    const notificationText = 'There\'s some cool update, you should check it out';
    await device.sendUserNotification({
      trigger: {type: 'push'},
      title: notificationText
    });
    await expect(element(by.text(notificationText))).toExist();
    await waitFor(element(by.text(notificationText))).toNotExist().withTimeout(3000);
  });

});




