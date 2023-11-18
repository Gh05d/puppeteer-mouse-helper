## Function Documentation

### `installMouseHelper(page, backgroundImage, styles)`

Installs a visible mouse pointer in the Puppeteer page, enhancing the visualization of mouse movements and interactions during automated testing.

#### Parameters

- `page` (Object): The Puppeteer page object where the mouse helper will be installed.
- `backgroundImage` (String, optional): URL for a custom cursor image. If not provided, a default cursor image will be used.
- `styles` (String, optional): CSS styles to customize properties like width and height. Default values are 30px for both width and height.

#### Returns

This function does not return a value. It modifies the provided Puppeteer page by injecting a custom mouse pointer for visualization.

#### Example

```javascript
const puppeteer = require("puppeteer");
const installMouseHelper = require("your-package-name");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Install the mouse helper with custom cursor and styles
  await installMouseHelper(
    page,
    "your-cursor-url",
    "width: 50px; height: 50px;"
  );

  // Now the page will show a custom mouse pointer for better visualization during tests.

  // Your testing code goes here

  await browser.close();
})();
```
