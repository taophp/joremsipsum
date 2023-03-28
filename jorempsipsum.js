/**
 * Replace a DOM element by a random article from Wikipedia in the browser's language
 * @param {string} element - The DOM element to replace by the article.
 */
function jowiki(element) {
    // Get the language code of the browser
    const languageCode = navigator.language.substring(0, 2);
  
    // Construct the URL to retrieve a random article in the browser's language
    const url = `https://${languageCode}.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&callback=processRandomArticle`;
  
    // Define a global function to handle the JSONP response
    window.processRandomArticle = function(data) {
      const pageId = data.query.random[0].id;
  
      // Construct the URL to the HTML content of the article
      const htmlUrl = `https://${languageCode}.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&format=json&callback=processArticleHTML`;
  
      // Define a global function to handle the JSONP response
      window.processArticleHTML = function(data) {
        const htmlContent = data.parse.text["*"];
        const title = data.parse.title;
  
        // Create a container element and set its innerHTML to the HTML content of the article
        const containerElement = document.createElement('div');
        const headingElement = document.createElement('h1');
        headingElement.textContent = title;
        containerElement.appendChild(headingElement);
        containerElement.innerHTML+= htmlContent;
  
        element.appendChild(containerElement);
  
        // Clean up global functions
        delete window.processRandomArticle;
        delete window.processArticleHTML;
      };
  
      // Add a script element to the page to load the HTML content of the article
      const scriptElement = document.createElement('script');
      scriptElement.src = htmlUrl;
      document.body.appendChild(scriptElement);
    };
  
    // Add a script element to the page to load the random article data
    const scriptElement = document.createElement('script');
    scriptElement.src = url;
    document.body.appendChild(scriptElement);
  }
  
  function joimg(element) {
    const width = element.dataset.joWidth;
    const height = element.dataset.joHeight;
  
    // Create a data URL for the placeholder image
    const dataUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc' /%3E%3C/svg%3E`;
  
    // Create an image element with the placeholder image as its source
    const imgElement = document.createElement('img');
    imgElement.src = dataUrl;
    imgElement.width = width;
    imgElement.height = height;
  
    // Replace the element with the image element
    element.parentNode.replaceChild(imgElement, element);
  }
  
  window.addEventListener('load', function() {
    const imgTags = document.querySelectorAll('[data-jo="img"]');
    for (const tag of imgTags) {
      joimg(tag);
    }
  });
  
  window.addEventListener('load', function() {
    const wikiTags = document.querySelectorAll('[data-jo="wiki"]');
    for (const tag of wikiTags) {
        jowiki(tag);
    }
    const imgTags = document.querySelectorAll('[data-jo="img"]');
    for (const tag of imgTags) {
      joimg(tag);
    }
  });
  