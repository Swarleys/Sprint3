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
  cartList.length = 0;
  console.log(`El carrito esta vacio ${cartList}`);
  return cartList;
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  total = cartList.reduce((acc, { price }) => acc + price, 0).toFixed(2);
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
      product.subTotalWithDiscount = (
        ((product.price * 2) / 3) *
        product.quantity
      ).toFixed(2);
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
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
}

// Exercise 9
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
}
