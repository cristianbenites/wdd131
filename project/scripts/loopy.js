function getDates() {
    const today = new Date();

    const yearElmt = document.querySelector("#currentyear");
    yearElmt.innerHTML = today.getFullYear();

    const lastModElmt = document.querySelector(".lastModified");
    lastModElmt.innerHTML = `Last Modification: ${document.lastModified}`;
}
getDates();

const cookies = [
  {
    id: '1',
    title: "Milka Oreo",
    description: "Buttery dough, with pieces of milk chocolate, drops of white chocolate and pieces of oreo cookies. Filled with a generous piece of Milka oreo chocolate.",
    displayPrice: "R$ 20.50",
    price: 20.5,
    imageUrl:
    "images/milka_oreo.webp"
  },
  {
    id: '2',
    title: "Kinder Bueno",
    description: "Lightly vanilla-flavored dough with milk chocolate chips and white chocolate. Filling: homemade cream made with toasted hazelnuts and crushed Kinder Bueno white.",
    displayPrice: "R$ 20.50",
    price: 20.5,
    imageUrl:
    "images/kinder_bueno.webp"
  },
  {
    id: '3',
    title: "Chocotella",
    description: "This one is for those who love NUTELLA. Traditional dough, with pieces of milk chocolate and drops of semi-sweet chocolate. Filled with lots of pure Nutella. And there's more: to finish, lots of drops of milk chocolate.",
    displayPrice: "R$ 17.50",
    price: 17.5,
    imageUrl:
    "images/chocotella.webp"
  },
  {
    id: '4',
    title: "Biscoff",
    description: "Dough with crushed biscoff cookies and a pinch of cinnamon, combined with drops of white, milk and semi-sweet chocolate, filled with lotus cream and finished with a biscuit.",
    displayPrice: "R$ 21.00",
    price: 21.0,
    imageUrl:
    "images/biscoff.webp"
  },
  {
    id: '4',
    title: "Dulce de Leche and Nuts",
    description: "Super buttery dough, with drops of semi-sweet and milk chocolate, pecan nuts and filled with Minas Gerais dulce de leche.",
    displayPrice: "R$ 19.00",
    price: 19.0,
    imageUrl:
    "images/dulce_de_leche_and_nuts.webp"
  },
  {
    id: '5',
    title: "Chocolate Chips",
    description: "Dough with milk and semisweet chocolate drops. Finished with fleur de sel.",
    displayPrice: "R$ 16.00",
    price: 16.0,
    imageUrl:
    "images/traditional.webp"
  },
];

function createCookieCards() {
    const section = document.querySelector('.sec-2');
    if(section) {
        cookies.map(temple => makeCard(temple))
            .forEach(card => section.appendChild(card));
    }
}

function addToCart(cookie) {
    const selected = getSelectedProducts();

    const item = selected.find(i => i.id == cookie.id);

    if(item) {
        item.quantity += 1;
    } else {
        selected.push({
            id: cookie.id,
            title: cookie.title,
            quantity: 1
        })
    }

    updateSelectedProducts(selected);
}

function makeCard(cookie) {
    const img = document.createElement('img');
    img.setAttribute('src', cookie.imageUrl);
    img.setAttribute('alt', `Image of the cookie ${cookie.title}`);

    const figure = document.createElement('figure');
    figure.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = cookie.title;

    const p = document.createElement('p');
    p.textContent = cookie.description;

    const span = document.createElement('span');
    span.textContent = cookie.displayPrice;

    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    button.setAttribute('data-product-id', cookie.id);
    button.addEventListener('click', () => addToCart(cookie));

    const body = document.createElement('div');
    body.classList.add('product-body');

    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(span);
    body.appendChild(button);

    const card = document.createElement('div');
    card.classList.add('product-card');

    card.appendChild(figure);
    card.appendChild(body);

    return card;
}
createCookieCards();

function getSelectedProducts() {
    const saved = localStorage.getItem('shopping-cart');
    let selected = [];
    if(saved) {
        selected = JSON.parse(saved);
    } else {
        localStorage.setItem('shopping-cart', '[]');
    }
    return selected;
}

function updateSelectedProducts(selected) {
    localStorage.setItem('shopping-cart', JSON.stringify(selected));
    run();
}

function buildShoppingCart() {
    const selected = getSelectedProducts();
    const section = document.getElementById('shopping-cart');

    let ul = section.querySelector('ul');
    if (ul) {
        ul.remove();
    }

    let btnSend = section.querySelector('#order-products');
    console.log('btn', btnSend);
    if (btnSend) {
        btnSend.remove();
    }

    if(selected.length == 0) {
        section.innerHTML += `<p>You didn't select any products yet.</p>`
        return;
    }

    const p = section.querySelector('p');
    if (p) {
        p.remove();
    }

    ul = document.createElement('ul');
    section.appendChild(ul);

    selected.forEach(item => putItemOnList(item, ul));

    btnSend = document.createElement('button');
    btnSend.classList.add('.btn');
    btnSend.setAttribute('id', 'order-products');
    btnSend.textContent = 'Order My Cookies'
    btnSend.addEventListener('click', sendOrder);

    section.appendChild(btnSend);
}

function sendOrder() {
    const selected = getSelectedProducts();

    let payload = 'Hello! I would like to order the following cookies: ';
    selected.forEach(item => {
        payload += `Item: ${item.title} Quantity: ${item.quantity}. `;
    })

    const link = `https://wa.me/5566999814899?text=${payload}`;
    window.open(link, '_blank').focus();
}

function removeItem(id) {
    const selected = getSelectedProducts();
    const newGroup = selected.filter(item => item.id != id);

    updateSelectedProducts(newGroup);
}

function putItemOnList(item, ul) {
    let li = document.createElement('li');
    li.setAttribute('data-product-id', item.id);
    li.innerHTML = `${item.title}: ${item.quantity}`;

    const a = document.createElement('button');
    a.classList.add('.btn');
    a.innerText = 'remove';
    a.addEventListener('click', () => removeItem(item.id));

    li.appendChild(a);
    ul.appendChild(li);
}

function run() {
    const section = document.getElementById('shopping-cart');
    if(section) {
        buildShoppingCart();
    }
}

run();
