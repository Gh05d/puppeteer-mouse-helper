/**
 * Installs a mouse helper in the Puppeteer page for visualizing mouse movements.
 * @param {Object} page - The Puppeteer page object.
 * @param {string} [backgroundImage] - If you want to use your own cursor
 * @param {string} [styles=""] - Can be used to adjust width and height for example, which are by default 30px
 */
async function installMouseHelper(
  page,
  backgroundImage = "url('https://th.bing.com/th/id/R.1a9e8fe631851070e25b2d48dcab9153?rik=j6y58a4K848oMw&pid=ImgRaw&r=0');",
  styles = ""
) {
  try {
    await page.evaluateOnNewDocument(
      (backgroundImage, styles) => {
        // Install mouse helper only for top-level frame.
        if (window !== window.parent) return;
        window.addEventListener(
          "DOMContentLoaded",
          () => {
            const box = document.createElement("puppeteer-mouse-pointer");
            const styleElement = document.createElement("style");
            styleElement.innerHTML = `
              puppeteer-mouse-pointer {
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10000;
                width: 30px;   
                height: 30px;  
                background-size: cover;
                border: none;
                margin: 0;
                padding: 0;
                ${styles}
                background-image: ${backgroundImage}
            }
            `;
            document.head.appendChild(styleElement);
            document.body.appendChild(box);
            document.addEventListener(
              "mousemove",
              (event) => {
                box.style.left = event.pageX + "px";
                box.style.top = event.pageY + "px";
                updateButtons(event.buttons);
              },
              true
            );
            document.addEventListener(
              "mousedown",
              (event) => {
                updateButtons(event.buttons);
                box.classList.add("button-" + event.button);
              },
              true
            );
            document.addEventListener(
              "mouseup",
              (event) => {
                updateButtons(event.buttons);
                box.classList.remove("button-" + event.button);
              },
              true
            );

            function updateButtons(buttons) {
              for (let i = 0; i < 5; i++)
                box.classList.toggle("button-" + i, buttons & (1 << i));
            }
          },
          false
        );
      },
      backgroundImage,
      styles
    );
  } catch (error) {
    console.error(error);
  }
}

export default installMouseHelper;
