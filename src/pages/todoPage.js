// automation-suite/src/pages/todoPage.js
import { By, Key } from 'selenium-webdriver';

class TodoPage {
  constructor(driver) {
    this.driver = driver;
    this.newTodoInput = By.css('.new-todo');
    this.todoItems = By.css('.todo-list li');
  }

  async addItem(itemText) {
    await this.driver.findElement(this.newTodoInput).sendKeys(itemText, Key.RETURN);
  }

  async deleteItem(itemText) {
    const items = await this.driver.findElements(this.todoItems);
    for (let item of items) {
      const text = await item.getText();
      if (text === itemText) {
        await item.findElement(By.css('.destroy')).click();
        break;
      }
    }
  }
}

export default TodoPage;