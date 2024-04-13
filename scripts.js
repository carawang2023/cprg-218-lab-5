var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }

function searchPhotos() {
  const query = document.getElementById('searchInput').value;
  
  fetch(`https://api.pexels.com/v1/search?query=nailart&orientation=landscape&per_page=12&page=1`, {
    headers: {
      Authorization: 'Ysh4i5movZoJ05bGj3pEDasrIcKUgt9zY0PuCnxu1sxJOfeNxNO4OHP5'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayPhotos(data.photos);
    })
    .catch(error => console.error('Error searching photos:', error));
}

function displayPhotos(photos) {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = photo.src.medium;
    image.alt = photo.alt_description;
    card.appendChild(image);

    const caption = document.createElement('p');
    caption.textContent = `Nail Art (${photo.id})`;
    card.appendChild(caption);

    cardsContainer.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  const cards = document.getElementsByClassName('card');

  for (let card of cards) {
    const caption = card.getElementsByTagName('p')[0].textContent.toLowerCase();
    if (caption.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
});

// Initial call to fetch photos when the page loads
searchPhotos();