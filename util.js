export function centsToDollars(cents) {
    const dollar = cents/100;
    return dollar.toFixed(2);
}

export function getDollarAmount(cents) {
    return `$${centsToDollars(cents)}`
}
const SRC_EXAMPLE = "https://dummyimage.com/420x260/FF0/FF0"

export function getImageURL(imageColor) {
    return `https://dummyimage.com/420x260/${imageColor}/${imageColor}`
}


/**
 * 
 *  <template id="item">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div class="block relative h-48 rounded overflow-hidden">
                <img data-img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block"
                  src="https://dummyimage.com/420x260/FF0/FF0"
                />
              </div>
              <div class="mt-4 flex items-end justify-between">
                <div>
                  <h3 data-name
                    class="text-gray-500 text-xs tracking-widest title-font uppercase mb-1"
                  >
                    Primary Color
                  </h3>
                  <h2 data-color class="text-gray-900 title-font text-lg font-medium">
                    Yellow
                  </h2>
                  <p data-price class="mt-1">$21.00</p>
                </div>
                <button
                  class="text-white py-2 px-4 text-xl bg-blue-500 rounded hover:bg-blue-700"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
 */
 