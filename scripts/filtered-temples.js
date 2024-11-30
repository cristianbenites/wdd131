function getDates() {
    const today = new Date();

    const yearElmt = document.querySelector("#currentyear");
    yearElmt.innerHTML = today.getFullYear();

    const lastModElmt = document.querySelector(".lastModified");
    lastModElmt.innerHTML = `Last Modification: ${document.lastModified}`;
}

getDates();

const menuBtn = document.querySelector("button.menu");
const nav = document.querySelector("header nav");
menuBtn.addEventListener("click", function() {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("open");
})

const temples = [
  {
    id: '1',
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    id: '2',
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    id: '3',
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    id: '4',
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    id: '5',
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    id: '6',
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    id: '7',
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    id: '8',
    templeName: "Brasília Brazil",
    location: "Brasília, Brazil",
    dedicated: "2023, September, 17",
    area: 25000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-39204.jpg"
  },
  {
    id: '9',
    templeName: "Curitiba Brazil",
    location: "Curitiba, Brazil",
    dedicated: "2008, June, 1",
    area: 3145,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-4882.jpg"
  },
  {
    id: '10',
    templeName: "Campinas Brazil",
    location: "Campinas, Brazil",
    dedicated: "2002, May, 17",
    area: 2446,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-5206.jpg"
  },
];

function makeCard(temple) {
    const img = document.createElement('img');
    img.setAttribute('src', temple.imageUrl);
    img.setAttribute('alt', `Image of ${temple.templeName} Temple`);

    const h2 = document.createElement('h2');
    h2.textContent = temple.templeName;

    const location = document.createElement('p');
    location.textContent = `LOCATION: ${temple.location}`;

    const dedicated = document.createElement('p');
    dedicated.textContent = `DEDICATED: ${temple.dedicated}`;

    const size = document.createElement('p');
    size.textContent = `SIZE: ${temple.area}`;

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-card-id', temple.id);

    card.appendChild(h2);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(size);
    card.appendChild(img);

    return card;
}

function createTempleCards() {
    temples.map(temple => makeCard(temple))
        .forEach(card => document.querySelector('main').appendChild(card));
}

createTempleCards();

function filterTemples(filteredList) {
    const cards = document.querySelectorAll('.card');

    const templeIds = filteredList.map(t => t.id);
    console.log(templeIds);
    console.log(cards);

    cards.forEach(card => {
        const cardId = card.getAttribute('data-card-id');
        if(templeIds.includes(cardId)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    })
}

const homeLink = document.getElementById('home');
const oldLink = document.getElementById('old');
const newLink = document.getElementById('new');
const largeLink = document.getElementById('large');
const smallLink = document.getElementById('small');

homeLink.addEventListener('click', () => {
    filterTemples(temples);
    document.querySelector('main > h2').textContent = 'Home';
});

oldLink.addEventListener('click', () => {
    const filtered = temples.filter(t =>
        (new Date(t.dedicated) < new Date('1900, January, 1')));

    filterTemples(filtered);
    document.querySelector('main > h2').textContent = 'Old';
});

newLink.addEventListener('click', () => {
    const filtered = temples.filter(t =>
        (new Date(t.dedicated) > new Date('2000, January, 1')));

    filterTemples(filtered);
    document.querySelector('main > h2').textContent = 'New';
});


largeLink.addEventListener('click', () => {
    filterTemples(temples.filter(t => t.area > 90000));
    document.querySelector('main > h2').textContent = 'Large';
});

smallLink.addEventListener('click', () => {
    filterTemples(temples.filter(t => t.area < 10000));
    document.querySelector('main > h2').textContent = 'Small';
});
