let products;
(async function loadProducts() {
  const response = await fetch("../data/products.json");
  products = await response.json();

  return products;
})();
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

function removingAllChilds(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  let chosenProduct = products.find((product) => id === product.id);
  // 2. Add found product to the cartList array
  cartList.push(chosenProduct);
  console.log(`Se ha añadido al carrito el producto ${chosenProduct.name}`);
}

// Exercise 2
function cleanCart() {
  cart.length = 0;
  console.log(`El carrito esta vacio ${cart}`);
  let ul = document.querySelector('.list');
  removingAllChilds(ul);
  return cart;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  total = cart.reduce((acc, { subTotalWithDiscount }) => acc + subTotalWithDiscount, 0).toFixed(2);
  console.log(`El total del carrito es ${total}`);
  return total;
}

// Exercise 4
function generateCart() {
  // Using the "cartlist" array that contains all the items in the shopping cart,
  // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
  for (const productList of cartList) {
    let inCart = false;
    for (const productCart of cart) {
      if (productList.id === productCart.id) {
        inCart = true;
        productCart.quantity++;
        productCart.subTotal = productCart.quantity * productCart.price;
        productCart.subTotalWithDiscount = productCart.subTotal;
      }
    }

    if (!inCart) {
      let newProduct = { ...productList };
      newProduct.quantity = 1;
      newProduct.subTotal = newProduct.quantity * newProduct.price;
      newProduct.subTotalWithDiscount = newProduct.subTotal;
      cart.push(newProduct);
    }
  }
  cartList.length = 0;
  applyPromotionsCart();
  console.log(cart);
  return cart;
}

// Exercise 5
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for (const product of cart) {
    if (product.id === 1 && product.quantity >= 3) {
      product.subTotalWithDiscount = 10 * product.quantity;
      console.log(
        `El precio total con descuento de ${product.name} es ${product.subTotalWithDiscount}`
      );
    }
    if (product.id === 3 && product.quantity >= 10) {
      product.subTotalWithDiscount = Number((
        ((product.price * 2) / 3) *
        product.quantity
      ).toFixed(2));
      console.log(
        `El precio total con descuento de ${product.name} es ${product.subTotalWithDiscount}`
      );
    }
  }
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  let chosenProduct = products.find((product) => id === product.id);
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
  let inCart = false;
  for (const product of cart) {
    if (chosenProduct.id === product.id) {
      inCart = true;
      product.quantity++;
      product.subTotal = product.quantity * product.price;
      product.subTotalWithDiscount = product.subTotal;
    }
  }
  if (!inCart) {
    chosenProduct.quantity = 1;
    chosenProduct.subTotal = chosenProduct.price;
    chosenProduct.subTotalWithDiscount = chosenProduct.subTotal;
    cart.push(chosenProduct);
  }

  applyPromotionsCart();
  console.log(cart);
}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  let productToRemove = cart.find((product) => id === product.id);
  if(!productToRemove) return;
  // 2. Decrease found product to the cartt array
  if (productToRemove.quantity > 1) {
    productToRemove.quantity--;
    productToRemove.subTotal = productToRemove.quantity * productToRemove.price;
    productToRemove.subTotalWithDiscount = productToRemove.subTotal;
    applyPromotionsCart();
    console.log(`Aun quedan ${productToRemove.quantity} productos de ${productToRemove.name}`);
    return;
  }
  // 3 Erase from the cart
  let index = cart.indexOf(productToRemove);
  cart.splice(index, 1);
  console.log(cart);
}

// Exercise 9
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  let ul = document.querySelector(".list");
  removingAllChilds(ul);
  let fragment = document.createDocumentFragment();
  for (const {name, subTotal ,subTotalWithDiscount, quantity} of cart) {
    let li = document.createElement('li');
    let item = document.createElement('p');
    let price = document.createElement('p');
    let discount = document.createElement('p');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    item.textContent = `${quantity} x ${name}`;
    if (subTotal !== subTotalWithDiscount && subTotalWithDiscount) {
      let div = document.createElement('div');
      div.classList.add('d-flex');
      price.innerHTML = `<del>$${subTotal}</del>`;
      price.classList.add('text-danger');
      price.classList.add('mr-2');
      discount.textContent = `$${subTotalWithDiscount}`
      li.appendChild(item);
      div.appendChild(price);
      div.appendChild(discount);
      li.appendChild(div)
      fragment.appendChild(li);
      continue;
    }
    price.textContent = `$${subTotal}`;
    li.appendChild(item);
    li.appendChild(price);
    fragment.appendChild(li);
  }
  if (cart.length) {
    let liTotal = document.createElement('li')
    let total = document.createElement("p");
    total.textContent = `Total: $${calculateTotal()}`;
    liTotal.classList.add('d-flex');
    liTotal.classList.add('justify-content-end');
    liTotal.appendChild(total);
    fragment.appendChild(liTotal);
  }
  ul.appendChild(fragment);
}
