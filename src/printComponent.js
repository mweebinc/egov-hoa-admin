import ReactDOM from "react-dom";
import printIframe from "./printIframe";

/**
 * Add content to an iframe and wait until all images are loaded before resolving the promise.
 * @param {HTMLIFrameElement} iframe - The iframe element to add content to.
 * @param {string} content - The HTML content to add to the iframe.
 * @returns {Promise<void>}
 */
function addContentInIframe(iframe, content) {
  return new Promise((resolve) => {
    const contentDocument =
      iframe.contentDocument || iframe.contentWindow?.document;
    //add component into print
    if (contentDocument) {
      contentDocument.open();
      contentDocument.write(content);
      contentDocument.close();
    }
    // remove date/time from top
    const styleEl = contentDocument.createElement("style");
    const style = `
            @page {
                /* Remove browser default header (title) and footer (url) */
                margin: 0;
            }
            @media print {
                body {
                    /* Tell browsers to print background image/colors */
                    -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
                    color-adjust: exact; /* Firefox */
                }
            }
        `;
    styleEl.appendChild(contentDocument.createTextNode(style));
    contentDocument.head.appendChild(styleEl);
    // get all elements need to load
    const images = contentDocument.querySelectorAll("img");
    const links = document.querySelectorAll("link[rel='stylesheet']");
    const total = images.length + links.length;
    const loaded = [];

    function markLoaded(node, error) {
      loaded.push(node);
      if (error) {
        console.warn(error);
      }
      // resolve if all elements is loaded
      if (total === loaded.length) {
        resolve();
      }
    }

    // copy all styles from parent and load
    for (let i = 0; i < links.length; ++i) {
      const node = links[i];
      const link = contentDocument.createElement(node.tagName);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", node.getAttribute("href"));
      link.onload = markLoaded.bind(null, node, true);
      link.onerror = markLoaded.bind(null, node, false);
      contentDocument.head.appendChild(link);
    }
    // pre-load all images
    for (let i = 0; i < images.length; i++) {
      const imgNode = images[i];
      const src = imgNode.getAttribute("src");
      if (!src) {
        markLoaded(
          imgNode,
          'encountered an <img> tag with an empty "src" attribute. It will not attempt to pre-load it. The <img> is:' +
            imgNode
        );
      } else {
        // https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
        const img = new Image();
        img.onload = markLoaded.bind(null, imgNode, true);
        img.onerror = markLoaded.bind(null, imgNode, false);
        img.src = src;
      }
    }
  });
}

function createIFrame(id = "printWindow") {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute"; // hide from user view
    iframe.width = `${document.documentElement.clientWidth}px`;
    iframe.height = `${document.documentElement.clientHeight}px`;
    iframe.style.top = `-${document.documentElement.clientHeight + 100}px`;
    iframe.style.left = `-${document.documentElement.clientWidth + 100}px`;
    iframe.id = id;
    iframe.title = "Print Window";
    iframe.srcdoc = "<!DOCTYPE html>";
    iframe.onload = () => {
      iframe.onload = null; // Ensures that it is only called once.
      resolve(iframe);
    };
    iframe.onerror = (e) => reject(e);
    //remove first if already exist on the body
    const printWindow = document.getElementById(id);
    if (printWindow) {
      document.body.removeChild(printWindow);
    }
    document.body.appendChild(iframe);
  });
}

function printNode(node, fileName) {
  return Promise.resolve()
    .then(() => createIFrame())
    .then((iframe) =>
      addContentInIframe(iframe, node.outerHTML).then(() => iframe)
    )
    .then((iframe) => printIframe(iframe, fileName).then(() => iframe))
    .then((iframe) => {
      // remove the iframe to the body
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    });
}

function printComponent(component, fileName) {
  const node = ReactDOM.findDOMNode(component);
  return printNode(node, fileName);
}

export default printComponent;
