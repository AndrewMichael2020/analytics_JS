var xhr = new XMLHttpRequest();  // Corrected: "XHTMLRequest" should be "XMLHttpRequest"
var url = './health_article.json'; // URL of the JSON file
xhr.open('GET', url, true);        // Corrected: mismatched quotes
xhr.responseType = 'json';         // Expect a JSON response

xhr.onload = function () {
    // Ensure the request was successful (status code 200)
    if (xhr.status === 200) {
        // Access the 'articles' property from the parsed JSON response
        var articles = xhr.response.articles;

        // Get the div element where you want to display the articles
        var articlesDiv = document.getElementById('articles');

        // Clear any previous content inside the div (optional)
        articlesDiv.innerHTML = '';

        // Loop through the articles array and create HTML content for each article
        articles.forEach(function(article) {
            // Create a new div for each article
            var articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            // Create and append a title for the article
            var title = document.createElement('h2');
            title.textContent = article.title;
            articleDiv.appendChild(title);

            // Create and append content for the article
            var description = document.createElement('p');
            description.textContent = article.description;
            articleDiv.appendChild(description);

            // Create and append 'Ways to Achieve' header
            var waysHeader = document.createElement('h3');
            waysHeader.textContent = 'Ways to Achieve:';
            articleDiv.appendChild(waysHeader);

            // Create and append list of ways to achieve
            var waysList = document.createElement('ul');
            article.ways_to_achieve.forEach(function(way) {
                var listItem = document.createElement('li');
                listItem.textContent = way;
                waysList.appendChild(listItem);
            });
            articleDiv.appendChild(waysList);

            // Create and append 'Benefits' header
            var benefitsHeader = document.createElement('h3');
            benefitsHeader.textContent = 'Benefits:';
            articleDiv.appendChild(benefitsHeader);

            // Create and append list of benefits
            var benefitsList = document.createElement('ul');
            article.benefits.forEach(function(benefit) {
                var listItem = document.createElement('li');
                listItem.textContent = benefit;
                benefitsList.appendChild(listItem);
            });
            articleDiv.appendChild(benefitsList);

            // Append the article div to the main articles div
            articlesDiv.appendChild(articleDiv);
        });
    } else {
        // Handle errors (if any)
        console.error('Error loading the articles:', xhr.statusText);
    }
};

xhr.send(); // Send the request
