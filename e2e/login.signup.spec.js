describe('login.signup', () => {
  beforeEach(async () => {});

  const EMAIL_INPUT = 'emailInput';
  const PASSWORD_INPUT = 'passwordInput';
  const FIREBASE_MESSAGE = 'firebaseMessage';
  const SUBMIT_BUTTON = 'submit';

  it('should have a user/passsword pair of inputs', async () => {
    await expect(element(by.id(EMAIL_INPUT))).toBeVisible();
    await expect(element(by.id(PASSWORD_INPUT))).toBeVisible();
  });

  it('should test user signup with an unregesitered account', async () => {
    await element(by.id(EMAIL_INPUT)).typeText('myuser@iamondemand.com');
    await element(by.id(PASSWORD_INPUT)).typeText('123456');
    await element(by.id(SUBMIT_BUTTON)).multiTap(2);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toBeVisible().withTimeout(1300);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toHaveText('User has been created').withTimeout(1300);
  });

  it('should display error message when entering with a wrong password', async () => {
    await element(by.id(EMAIL_INPUT)).tap();
    await element(by.id(EMAIL_INPUT)).clearText();
    await element(by.id(EMAIL_INPUT)).typeText('myuser@iamondemand.com');
    await element(by.id(PASSWORD_INPUT)).tap();
    await element(by.id(PASSWORD_INPUT)).clearText();
    await element(by.id(PASSWORD_INPUT)).typeText('1234564');
    await element(by.id(SUBMIT_BUTTON)).multiTap(2);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toBeVisible().withTimeout(1300);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toHaveText(
      'Error: The password is invalid or the user does not have a password'
    ).withTimeout(1300);
  });

  it('should display a welcome message when entering with a valid user', async () => {
    await element(by.id(EMAIL_INPUT)).tap();
    await element(by.id(EMAIL_INPUT)).clearText();
    await element(by.id(EMAIL_INPUT)).typeText('myuser@iamondemand.com');
    await element(by.id(PASSWORD_INPUT)).tap();
    await element(by.id(PASSWORD_INPUT)).clearText();
    await element(by.id(PASSWORD_INPUT)).typeText('123456');
    await element(by.id(SUBMIT_BUTTON)).multiTap(2);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toBeVisible().withTimeout(1300);
    await waitFor(element(by.id(FIREBASE_MESSAGE))).toHaveText(
      'Welcome myuser@iamondemand.com'
    ).withTimeout(1300);
  });

});




