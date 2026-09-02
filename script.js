// =========================================
// SET APART CLOTHING
// =========================================

let cart = JSON.parse(localStorage.getItem("setApartCart")) || [];

const products = {
    "fear-not": {
        name: "FEAR NOT TEE",
        price: 30,
        imageText: "FEAR NOT",
        description:
            "A faith-driven heavyweight tee inspired by Isaiah 41:10. Designed as a reminder to stand firm, trust God, and walk boldly."
    },

    "armor-of-god": {
        name: "ARMOR OF GOD TEE",
        price: 30,
        imageText: "ARMOR OF GOD",
        description:
            "A heavyweight streetwear tee inspired by Ephesians 6. A reminder to stand firm in faith and put on the armor of God."
    }
};


// =========================================
// SAVE CART
// =========================================

function saveCart() {

    localStorage.setItem(
        "setApartCart",
        JSON.stringify(cart)
    );
}


// =========================================
// UPDATE CART NUMBER
// =========================================

function updateCartCount() {

    const count =
        document.getElementById("cart-count");

    if (!count) return;

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    count.textContent = totalItems;
}


// =========================================
// ADD TO CART
// =========================================

function addToCart(
    name,
    price,
    size,
    quantity = 1
) {

    // Make sure a size was selected
    if (!size) {
        return;
    }


    // Check if this exact product + size
    // is already in the cart

    const existingItem =
        cart.find(item =>
            item.name === name &&
            item.size === size
        );


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            name: name,

            price: price,

            size: size,

            quantity: quantity

        });
    }


    // Save cart
    saveCart();


    // Update number in navigation
    updateCartCount();


    // Animate cart number
    const cartCount =
        document.getElementById(
            "cart-count"
        );

    if (cartCount) {

        cartCount.classList.remove(
            "cart-count-pop"
        );

        void cartCount.offsetWidth;

        cartCount.classList.add(
            "cart-count-pop"
        );
    }
}


// =========================================
// REMOVE ITEM
// =========================================

function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}


// =========================================
// CHANGE QUANTITY
// =========================================

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }


    saveCart();

    displayCart();

    updateCartCount();
}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    const container =
        document.getElementById(
            "cart-items"
        );

    if (!container) return;


    // EMPTY CART

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty.
                </h2>

                <p>
                    Find something you love
                    and add it to your cart.
                </p>

                <br>

                <a
                    href="shop.html"
                    class="button">

                    SHOP NOW

                </a>

            </div>

        `;


        const total =
            document.getElementById(
                "cart-total"
            );

        if (total) {

            total.textContent =
                "0.00";
        }


        const bottomTotal =
            document.getElementById(
                "cart-total-bottom"
            );

        if (bottomTotal) {

            bottomTotal.textContent =
                "0.00";
        }


        return;
    }


    let total = 0;


    container.innerHTML = "";


    cart.forEach(
        (item, index) => {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        $${item.price.toFixed(2)}
                        each
                    </p>

                </div>


                <div class="cart-item-actions">

                    <button
                        class="quantity-button"
                        onclick="changeQuantity(${index}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-button"
                        onclick="changeQuantity(${index}, 1)">

                        +

                    </button>


                    <strong>
                        $${itemTotal.toFixed(2)}
                    </strong>


                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            `;


            container.appendChild(
                itemElement
            );
        }
    );


    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    if (cartTotal) {

        cartTotal.textContent =
            total.toFixed(2);
    }


    const bottomTotal =
        document.getElementById(
            "cart-total-bottom"
        );


    if (bottomTotal) {

        bottomTotal.textContent =
            total.toFixed(2);
    }
}


// =========================================
// LOAD PRODUCT PAGE
// =========================================

function loadProductPage() {

    const name =
        document.getElementById(
            "product-name"
        );


    // Not a product page
    if (!name) return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productID =
        params.get("product") ||
        "fear-not";


    const product =
        products[productID];


    if (!product) return;


    // Page title

    document.title =
        product.name +
        " — SET APART";


    // Product name

    name.textContent =
        product.name;


    // Product image text

    const imageText =
        document.getElementById(
            "product-image-text"
        );


    if (imageText) {

        imageText.textContent =
            product.imageText;
    }


    // Product description

    const description =
        document.getElementById(
            "product-description"
        );


    if (description) {

        description.textContent =
            product.description;
    }


    // Product price

    const price =
        document.querySelector(
            ".product-detail-price"
        );


    if (price) {

        price.textContent =
            "$" +
            product.price;
    }


    // Add button

    const addButton =
        document.getElementById(
            "product-add-cart"
        );


    const sizeSelect =
        document.getElementById(
            "product-size"
        );


    const quantitySelect =
        document.getElementById(
            "product-quantity"
        );


    if (
        !addButton ||
        !sizeSelect ||
        !quantitySelect
    ) {

        return;
    }


    addButton.onclick =
        function () {

            const size =
                sizeSelect.value;


            const quantity =
                Number(
                    quantitySelect.value
                );


            // Don't add if no size
            if (!size) {

                sizeSelect.focus();

                return;
            }


            addToCart(
                product.name,
                product.price,
                size,
                quantity
            );
        };
}


// =========================================
// SHOP PAGE BUTTONS
// =========================================

function setupShopButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const name =
                        button.dataset.name;


                    const price =
                        Number(
                            button.dataset.price
                        );


                    const sizeSelect =
                        document.getElementById(
                            button.dataset.size
                        );


                    if (!sizeSelect) return;


                    const size =
                        sizeSelect.value;


                    // Don't add without size

                    if (!size) {

                        sizeSelect.focus();

                        return;
                    }


                    addToCart(
                        name,
                        price,
                        size,
                        1
                    );
                }
            );
        }
    );
}


// =========================================
// CHECKOUT
// =========================================

function setupCheckout() {

    const button =
        document.getElementById(
            "checkout-button"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            alert(
                "Checkout will be connected to a secure payment system next!"
            );
        }
    );
}


// =========================================
// START EVERYTHING
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

        setupShopButtons();

        setupCheckout();

        loadProductPage();

    }
);
