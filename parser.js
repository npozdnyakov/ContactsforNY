document.getElementById('getContacts').addEventListener('click', () => {
  const url = document.getElementById('url').value;
  const corsProxy = 'https://api.allorigins.win/raw?url=';
  fetch(corsProxy + url)
    .then(response => response.text())
    .then(htmlContent => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const artists = doc.querySelectorAll('.nftnyc-artist');
      const results = document.getElementById('results');
      results.innerHTML = '';

      artists.forEach(artist => {
        const artistName = artist.querySelector('.artist-name').innerText.trim();
        const artistDesc = artist.querySelector('.artist-desc').innerText.trim();
        const artistTwitter = artist.querySelector('.artist-twitter').getAttribute('href');

        // Extract the Twitter handle using a regular expression
        const twitterHandleRegex = /@\w+/;
        const twitterHandleMatch = artistTwitter.match(twitterHandleRegex);
        const twitterHandle = twitterHandleMatch ? twitterHandleMatch[0] : '';

        // Create a new table row and add the data
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${artistName}</td>
          <td>${artistDesc}</td>
          <td>${twitterHandle ? `<a href="https://twitter.com/${twitterHandle.slice(1)}" target="_blank" rel="noopener noreferrer">${twitterHandle}</a>` : ' -- '}</td>
        `;
        results.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching the URL:', error);
    });
});
