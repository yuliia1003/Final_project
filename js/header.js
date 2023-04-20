(() => {
   const quotes = [
      `"The key is not to prioritize what's on your schedule, but to schedule your priorities." - <span class="header__quote-author">Stephen Covey</span>`,
      `"Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort." - <span class="header__quote-author">Paul J. Meyer</span>`,
      `"The most efficient way to live reasonably is every morning to make a plan of one's day and every night to examine the results obtained." - <span class="header__quote-author">Alexis Carrel</span>`
    ];
    
    const quoteElement = document.querySelector(".header__quote");
    
    function changeQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteElement.innerHTML = quotes[randomIndex];
    }
    
    changeQuote();
    setInterval(changeQuote, 30000);
})();