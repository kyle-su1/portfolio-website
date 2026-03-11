// Active nav link based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// Theme toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('#themeToggle svg');
  if (isDark) {
    icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  } else {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
}

// Profile image fallback
function initProfileImage() {
  const img = document.getElementById('profileImg');
  const placeholder = document.getElementById('profilePlaceholder');
  if (!img) return;

  img.onload = () => { placeholder.style.display = 'none'; };
  img.onerror = () => {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  };

  if (img.complete) {
    if (img.naturalWidth === 0) {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
    } else {
      placeholder.style.display = 'none';
    }
  }
}

function toggleMoreProjects() {
  const extra = document.getElementById('extra-projects');
  const btn = document.getElementById('seeMoreBtn');
  const expanded = extra.style.display !== 'none';
  extra.style.display = expanded ? 'none' : 'block';
  btn.textContent = expanded ? 'See more' : 'See less';
}



// Shelf data — edit these arrays to update your picks
const shelfData = {
  albums: [
    { name: 'Nurture', artist: 'Porter Robinson', art: 'albums/nurture.png' },
    { name: 'For Long Tomorrow', artist: 'toe', art: 'albums/flt.jpg' },
    { name: 'plastic death', artist: 'glass beach', art: 'albums/plastic_death.jpg' },
    { name: 'Dragon New Warm Mountain I Believe in You', artist: 'Big Thief', art: 'albums/dnwmibiy.jpg' },
    { name: 'Punisher', artist: 'Phoebe Bridgers', art: 'albums/punisher.jpg' },
    { name: 'Civilisation', artist: 'Kero Kero Bonito', art: 'albums/civilisation.jpg' },
    { name: 'De Todas las Flores', artist: 'Natalia Lafourcade', art: 'albums/dtlf.jpg' },
    { name: 'SOUL LADY', artist: 'YUKIKA', art: 'albums/soul_lady.jpg' },
    { name: 'ワンルームサバイバル', artist: 'Serani Poji ', art: 'albums/ors.jpg' }

  ],
  quotes: [
    { text: 'In this world, nothing can be easily resolved without taking risks.', author: '— Klein Moretti, Lord of the Mysteries' },
    { text: 'Be strict with yourself and tolerant with others.', author: '— Marcus Aurelius' },
    { text: 'Night falls. Or has fallen. Why is it that night falls, instead of rising, like the dawn? Yet if you look east, at sunset, you can see night rising, not falling; darkness lifting into the sky, up from the horizon, like a black sun behind cloud cover. Like smoke from an unseen fire, a line of fire just below the horizon, brushfire or a burning city. Maybe night falls because it’s heavy, a thick curtain pulled up over the eyes.', author: '- Margaret Atwood, The Handmaid\’s Tale '},
    { text: 'And builds, within, a tower that is not stone\n(Not stone can jacket heaven) — but slip\nOf pebbles, — visible wings of silence sown\nIn azure circles, widening as they dip', author: '— Harold Hart Crane'}
  ],
  vocab: [
    { word: 'somnambulant', pos: ' adj.', def: 'resembling or characteristic of a sleepwalker; sluggish.' },
    { word: 'desultory', pos: ' adj.', def: 'lacking a plan, purpose, or enthusiasm.' },
    { word: 'crepescular', pos: ' adj.', def: 'of, resembling, or relating to twilight.' },
    { word: 'prerogative', pos: ' n.', def: 'a right or privilege exclusive to a particular individual or class.' },
  ],
};



let shelfIndex = 0;

function renderShelf(index) {
  const album = shelfData.albums[index % shelfData.albums.length];
  const quote = shelfData.quotes[index % shelfData.quotes.length];
  const vocab = shelfData.vocab[index % shelfData.vocab.length];

  // Album
  const albumArt = document.getElementById('albumArt');
  const albumArtPlaceholder = document.getElementById('albumArtPlaceholder');
  document.getElementById('albumName').textContent = album.name;
  document.getElementById('albumArtist').textContent = album.artist;
  if (album.art) {
    albumArt.src = album.art;
    albumArt.style.display = 'block';
    albumArtPlaceholder.style.display = 'none';
  } else {
    albumArt.style.display = 'none';
    albumArtPlaceholder.style.display = 'flex';
  }

  // Quote
  document.getElementById('quoteText').textContent = quote.text;
  document.getElementById('quoteAuthor').textContent = quote.author;

  // Vocab
  document.getElementById('vocabWord').textContent = vocab.word;
  document.getElementById('vocabPos').textContent = vocab.pos;
  document.getElementById('vocabDef').textContent = vocab.def;
}

function rotateShelf() {
  const inners = document.querySelectorAll('.shelf-inner');
  inners.forEach(el => el.classList.add('fading'));
  setTimeout(() => {
    shelfIndex++;
    renderShelf(shelfIndex);
    inners.forEach(el => el.classList.remove('fading'));
  }, 350);
}

function initShelf() {
  shelfIndex = Math.floor(Math.random() * Math.max(shelfData.albums.length, shelfData.quotes.length, shelfData.vocab.length));
  renderShelf(shelfIndex);
  setInterval(rotateShelf, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('seeMoreBtn').addEventListener('click', toggleMoreProjects);
  if (document.body.classList.contains('dark-mode')) {
    document.querySelector('#themeToggle svg').innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  }
  initProfileImage();
  initShelf();
});
