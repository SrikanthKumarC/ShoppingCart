import items from './items.json'
import {getDollarAmount, getImageURL} from './util.js'

const template = document.querySelector('#item');
const grid = document.querySelector('[data-grid]')

setupStore(grid);

export function setupStore(container) {
    items.forEach((StoreItem) => {
        const templateClone = template.content.cloneNode(true);
        const priceNode = templateClone.querySelector('[data-price]')
        const nameNode = templateClone.querySelector('[data-name]')
        const colorNode = templateClone.querySelector('[data-color]')
        const imageNode = templateClone.querySelector('[data-img]')
        const itemNode = templateClone.querySelector('[data-store-item]')
        priceNode.innerText = getDollarAmount(StoreItem.priceCents);
        nameNode.innerText = StoreItem.category;
        imageNode.src = getImageURL(StoreItem.imageColor)
        colorNode.innerText = StoreItem.name;
        itemNode.dataset.id = StoreItem.id;
        container.appendChild(templateClone);
    })
}
