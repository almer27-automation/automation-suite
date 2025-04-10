import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { promises as fs } from 'fs';

describe('Todo App Tests', function() {
  let driver;
  this.timeout(15000);

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://demo.playwright.dev/todomvc');
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      const testCaseName = this.currentTest.title.replace(/\s+/g, '_');
      const screenshot = await driver.takeScreenshot();
      await fs.writeFile(`failure_${testCaseName}.png`, screenshot, 'base64');
    }
    await driver.quit();
  });

  it('should allow me to add and delete todo items', async () => {
    const newTodoInput = await driver.findElement(By.css('.new-todo'));
    
    // Create two items.
    for (const item of ['Buy milk', 'Walk the dog']) {
      await newTodoInput.sendKeys(item, Key.RETURN);
    }

    // Verify the items were added.
    const todoItems = await driver.findElements(By.css('.todo-list li'));
    expect(todoItems).to.have.lengthOf(2);

    // Delete the first item.
    const firstTodo = todoItems[0];
    await driver.actions({ bridge: true }).move({ origin: firstTodo }).perform();
    const deleteButton = await firstTodo.findElement(By.css('.destroy'));
    await driver.executeScript('arguments[0].click();', deleteButton);

    // Verify the first item was deleted.
    const remainingTodoItems = await driver.findElements(By.css('.todo-list li'));
    expect(remainingTodoItems).to.have.lengthOf(1);
    const remainingText = await remainingTodoItems[0].getText();
    expect(remainingText).to.equal('Walk the dog');
  });
});