// automation-suite/src/pages/loginPage.js
import { By, until } from 'selenium-webdriver';

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = '[https://www.saucedemo.com/';
    this.username = By.id('username');
    this.password = By.id('password');
    this.submit = By.id('submit');
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.username), 10000);
  }

  async login(user, pass) {
    await this.driver.findElement(this.username).sendKeys(user);
    await this.driver.findElement(this.password).sendKeys(pass);
    await this.driver.findElement(this.submit).click();
  }
}

export default LoginPage;