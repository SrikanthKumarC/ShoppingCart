const shoppingCartContainer = document.querySelector('[data-cart]')
const itemsContainer = document.querySelector('[data-items-container]')
const cartButton = document.querySelector('[data-cart-button]');
const qtyElement = document.querySelector('[data-qty]')
const cartItemTemplate = document.querySelector('#cart_item');
const cartTotalElement = document.querySelector('[data-total]')


//local storage
const PREFIX = 'SHOPPING_CART'
const KEY = 'items'


import items from './items.json'
import { getDollarAmount, getImageURL } from './util';


let cart = []
initializeCart();
checkAndUpdate();

function initializeCart() {
    items.forEach(item => {
        cart.push({
            id: item.id,
            details: item,
            qty: 0
        })
    })
    const cartItemsStore = localStorage.getItem(`${PREFIX}-${KEY}`)
    if (!cartItemsStore) {
        localStorage.setItem(`${PREFIX}-${KEY}`, JSON.stringify(cart));
    } else {
        cart = JSON.parse(cartItemsStore);
    }
}

// Add to cart functionality
const addToCartButtonNodes = document.querySelectorAll('[data-add-cart]')
const addToCartArray = Array.from(addToCartButtonNodes);

// each item 
addToCartArray.forEach((btn) => {
    btn.addEventListener('click', () => {
        //get the id of the clicked item
        const ParentNode = btn.closest('[data-store-item]')
        const itemId = ParentNode.dataset.id;
        cart = cart.map((item) => {
            if (parseInt(itemId) == item.id) {
                item.qty = item.qty+1;
            }
            return item;
        })
        localStorage.setItem(`${PREFIX}-${KEY}`, JSON.stringify(cart));
        populateCart();
        checkAndUpdate();
    })
})

function populateCart() {
    itemsContainer.innerHTML = ''
    const selectedItems = cart.filter(item => item.qty>0);
    console.log('here')
    selectedItems.forEach(cartItem => {
        const templateClone = cartItemTemplate.content.cloneNode(true);
        const priceNode = templateClone.querySelector('[data-cart-price]')
        const nameNode = templateClone.querySelector('[data-cart-name]')
        const imageNode = templateClone.querySelector('[data-cart-img]')
        const dataCartIdNode = templateClone.querySelector('[data-cart-id]')
        dataCartIdNode.dataset.cartId = cartItem.id;
        const qtyNode = templateClone.querySelector('[data-cart-qty]')
        const removeFromCartBtn = templateClone.querySelector('[data-remove-from-cart-button]');
        removeFromCartBtn.addEventListener('click', removeItemFromCart);
        priceNode.innerText = getDollarAmount(cartItem.details.priceCents);
        nameNode.innerText = cartItem.details.name;
        imageNode.src = getImageURL(cartItem.details.imageColor);
        qtyNode.innerText = `x${cartItem.qty}`;
        itemsContainer.appendChild(templateClone)
    })
}


function removeItemFromCart(e) {
    const element = e.target.parentElement.parentElement;
    console.log(element)
    const itemId = element.dataset.cartId;
    console.log('itemid: ', itemId)
    cart = cart.filter((cartItem) => {
        if (cartItem.id === parseInt(itemId)) {
            console.log('here   wfads')
            cartItem.qty = 0;
        }
        return cartItem;
    })
    localStorage.setItem(`${PREFIX}-${KEY}`, JSON.stringify(cart));
    populateCart();
    checkAndUpdate();
}


function checkAndUpdate() {
    const TotalQty = cart.reduce((sum, cartItem) => sum+cartItem.qty, 0);
    if (TotalQty > 0) {
        qtyElement.classList.remove('invisible')
        cartButton.classList.remove('invisible')
        cartTotalElement.innerText = getTotalCartPrice();
        qtyElement.innerHTML = TotalQty;
    }else{
        qtyElement.classList.add('invisible')
        cartButton.classList.add('invisible')
        shoppingCartContainer.classList.add('invisible')
    }
}

function getTotalCartPrice() {
    const selectedItems = cart.filter(item => item.qty>0);
    const totalInCents = selectedItems.reduce((sum, cartItem) => sum+(cartItem.details.priceCents * cartItem.qty), 0);
    return getDollarAmount(totalInCents);
}

// shopping cart button
cartButton.addEventListener('click' , () => {
    shoppingCartContainer.classList.toggle('invisible')
    populateCart();
    checkAndUpdate();
})

