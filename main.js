const ITEMS = [
{
    id: 1,
    name: 'Iphone 14 Pro Max',
    price: 1099,
    image:'images/iphone.jpg',
    qty: 1
},

{
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    price: 1099,
    image:'images/samsung_galaxy.jpg',
    qty: 1
},

{
    id: 3,
    name: 'Google Pixel 7 Pro',
    price: 1099,
    image:'images/google_pixel.jpg',
    qty: 1
},

{
    id: 4,
    name: 'One Plus 11 5G',
    price: 1099,
    image:'images/one_plus.jpg',
    qty: 1
},

]

const openBtn = document.getElementById('open_cart_btn')
const cart = document.getElementById('sidecart')
const closeBtn = document.getElementById('close_btn')
const backdrop = document.querySelector('.backdrop')
const itemsEl = document.querySelector('.items')
const cartItems = document.querySelector('.cart_items')

let cart_data = []


openBtn.addEventListener('click', openCart)
closeBtn.addEventListener('click', closeCart)
backdrop.addEventListener('click', closeCart)

renderItems()
renderCartItems()

//Open Cart

function openCart(){
    cart.classList.add('open')
    backdrop.style.display ='block'
    setTimeout(() => {
        backdrop.classList.add('show')
    }, 0);
}

//Close Cart

function closeCart(){
    cart.classList.remove('open')
    backdrop.classList.remove('show')

    setTimeout(() => {
        backdrop.style.display ='none' 
    }, 500);
}

// Add Items to Cart
function addItem(idx, itemId){
    // find same items
    const foundedItem =cart_data.find(item => item.id.toString() === itemId.toString())

    if(foundedItem){
       increaseQty(itemId)
    }else{
     cart_data.push(ITEMS[idx])
    }
    updateCart()
    openCart()
}


// Remowe Cart Items

function removeCartItem(itemId){
    cart_data = cart_data.filter(item => item.id != itemId)

    updateCart()
}


// Increase Qty

function increaseQty(itemId) {
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString() ? {...item, qty: item.qty + 1}
     :item
     )
     updateCart()
}


// Descrease Qty

function decreaseQty(itemId) {
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString()
     ? {...item, qty: item.qty > 1 ? item.qty -1 : item.qty}
     :item
     )
     updateCart()
}










// Render Items
function renderItems() {
    ITEMS.forEach((item, idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('item')
        itemEl.onclick = () => addItem(idx, item.id)
        itemEl.innerHTML = `
        <img src="${item.image}" alt="" />
        <button>Add to Cart</button>  
        `
        itemsEl.appendChild(itemEl)
    })
}

// Display / render cart items

function renderCartItems() {
    // remowe everything from cart
    cartItems.innerHTML = ''
    // add new data
    cart_data.forEach((item) => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart_item')
        cartItem.innerHTML = `
        <div class="remove_item" onclick="removeCartItem(${item.id})" >
                <span>&times;</span>
              </div>
              <div class="item_img">
                <img src="${item.image}" alt="" />
              </div>
              <div class="item_details">
                <p>${item.name}</p>
                <strong>$${item.price}</strong>
                <div class="qty">
                  <span onclick="decreaseQty(${item.id})">-</span>
                  <strong>${item.qty}</strong>
                  <span onclick ="increaseQty(${item.id})" >+</span>

                </div>
              </div>
        `
        cartItems.appendChild(cartItem)
    })

}

function updateCart() {
    // rerender cart items with updated data
    renderCartItems()
}



