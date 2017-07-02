describe('mainscreen', () => {
  beforeEach(async () => {});

  it('should show boilerplate options', async () => {

    await expect(element(by.text('React Native Starter Kit'))).toBeVisible();
    await expect(element(by.text('React Navigation'))).toBeVisible();
    await expect(element(by.text('NativeBase Easy Grid'))).toBeVisible();
    await expect(element(by.text('NativeBase'))).toBeVisible();
    await expect(element(by.text('CodePush'))).toBeVisible();
    await expect(element(by.text('Redux'))).toBeVisible();

  });

  it('should display a "Swiped to..." message on swipe left', async () => {

    await element(by.text('Redux')).swipe('left');
    await expect(element(by.text('Swiped to left'))).toExist();
    await expect(element(by.text('Swiped to left'))).toBeVisible();

  });

  it('should redirect to Redux view when swiping right at Redux label', async () => {

    await element(by.text('Redux')).swipe('right');
    await expect(element(by.text('Redux view'))).toExist();
    await expect(element(by.text('Redux view'))).toBeVisible();

  });

});




