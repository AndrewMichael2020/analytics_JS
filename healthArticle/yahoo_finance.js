var xhr = new XMLHttpRequest();
var url = './yahoo_finance.xml'; // Local XML file

xhr.open('GET', url, true);
xhr.responseType = 'document'; // Expect an XML response
xhr.overrideMimeType('text/xml'); // Ensure response is treated as XML

xhr.onload = function () {
    if (xhr.status === 200) {
        console.log('XML Loaded Successfully'); // Debug: Check if the file is loaded
        var xmlDoc = xhr.responseXML; // Parse the XML response
        var items = xmlDoc.querySelectorAll('item'); // Extract <item> elements
        console.log(`Found ${items.length} items`); // Debug: Log item count

        var articlesDiv = document.getElementById('articles');
        articlesDiv.innerHTML = ''; // Clear previous content

        items.forEach(function (item) {
            var title = item.querySelector('title')?.textContent.trim() || 'No title';
            var link = item.querySelector('link')?.textContent.trim() || '#';
            var pubDate = item.querySelector('pubDate')?.textContent.trim() || 'No date';
            var source = item.querySelector('source')?.textContent.trim() || 'Unknown Source';
            var imageUrl = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]?.getAttribute('url');

            console.log(`Processing item: ${title}`); // Debug: Log each item's title

            var articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            var titleElement = document.createElement('h2');
            var titleLink = document.createElement('a');
            titleLink.href = link;
            titleLink.target = '_blank';
            titleLink.textContent = title;
            titleElement.appendChild(titleLink);
            articleDiv.appendChild(titleElement);

            var dateElement = document.createElement('p');
            dateElement.textContent = `Published on: ${new Date(pubDate).toLocaleString()}`;
            articleDiv.appendChild(dateElement);

            var sourceElement = document.createElement('p');
            sourceElement.textContent = `Source: ${source}`;
            articleDiv.appendChild(sourceElement);

            if (imageUrl) {
                var imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = title;
                imageElement.style.maxWidth = '200px';
                articleDiv.appendChild(imageElement);
            }

            articlesDiv.appendChild(articleDiv);
        });
    } else {
        console.error('Error loading the XML:', xhr.statusText);
    }
};

xhr.onerror = function () {
    console.error('Request failed.');
};

xhr.send();
