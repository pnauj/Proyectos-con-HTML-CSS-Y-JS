const db = {
  methods: {
    find: (id) => {
      return db.items.find((item) => item.id === id);
    },
    remove: (items) => {
      items.forEeach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty;
      });

      console.log(db);
    },
  },
  items: [
    {
      id: 0,
      title: "Funko Pop",
      price: 250,
      qty: 16,
    },
    {
      id: 1,
      title: "Philips Hue",
      price: 300,
      qty: 5,
    },
    {
      id: 2,
      title: "Harry Potter",
      price: 150,
      qty: 4,
    },
    {
      id: 3,
      title: "GOT",
      price: 300,
      qty: 10,
    },
  ],
};

const shoppingCart = {
  items: [],
  methods: {
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty += qty;
        } else {
          alert("no hay inventario");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },
    remove: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);
      if (cartItem.qty - qty > 0) {
        cartItem.qty -= qty;
      } else {
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
    },
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    getTotal: () => {
      const total = shoppingCart.items.reduce((acc, item) => {
        const found = db.methods.find(item.id);
        return acc + found.price * item.qty;
      }, 0);
      return total;
    },
    hasInventory: (id, qty) => {
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    purchase: () => {
      db.methods.remove(shoppingCart.items);
      shoppingCart.items = [];
    },
  },
};

renderStore();

function renderStore() {
  const html = db.items.map((item) => {
    return `
            <div class="item">
                <div class="title">${item.title}</div>
                <div class="price">${numberToCurrency(item.price)}</div>
                <div class="qty">${item.qty}</div>

                <div class="actions">
                    <button class="add" data-id="${
                      item.id
                    }">Add to Shopping Cart</button>
                </div>
            </div>
        `;
  });

  document.querySelector("#store-container").innerHTML = html.join("");
  document.querySelectorAll('.item .actions .add').forEach(button => {
    button.addEventListener('click' , e => {
      const id = button.getAttribute('data-id')
      const item = db.methods.find(id)

      if(item && item.qty -1 > 0){
        shoppingCart.methods.add(id, 1)
        console.log(shoppingCart);
        renderShoppingCart()
      } else {
        console.log('ya no hay inventario');
      }
    })
  })
}
function renderShoppingCart() {}

function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
