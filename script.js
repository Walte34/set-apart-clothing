// =========================================
// SET APART CLOTHING
// =========================================

let cart =
    JSON.parse(
        localStorage.getItem("setApartCart")
    ) || [];


const products = {

    // =========================================
    // FEAR NOT
    // =========================================

    "fear-not": {
        name: "FEAR NOT TEE",
        price: 30,

        backImage:
            "images1/fear-not-back.png",

        frontImage:
            "images1/fear-not-front.png",

        description:
            "A faith-driven heavyweight tee inspired by Isaiah 41:10. Designed as a reminder to stand firm, trust God, and walk boldly.",

        messageTitle:
            "FEAR<br><span>NOT.</span>",

        messageQuote:
            "“Do not fear, for I am with you.”",

        messageReference:
            "ISAIAH 41:10"
    },


    // =========================================
    // ARMOR OF GOD
    // =========================================

    "armor-of-god": {
        name: "ARMOR OF GOD TEE",
        price: 30,

        backImage:
            "images1/armor-back.webp",

        frontImage:
            "images1/armor-front.webp",

        description:
            "A heavyweight streetwear tee inspired by Ephesians 6:11. Designed as a reminder to stand firm in faith and put on the whole armor of God.",

        messageTitle:
            "ARMOR<br><span>OF GOD.</span>",

        messageQuote:
            "“Put on the full armor of God.”",

        messageReference:
            "EPHESIANS 6:11"
    },


    // =========================================
    // STAND FIRM
    // =========================================

    "stand-firm": {
        name: "STAND FIRM TEE",
        price: 30,

        backImage:
            "images1/stand-firm-back.png",

        frontImage:
            "images1/stand-firm-front.png",

        description:
            "A bold faith-driven heavyweight tee inspired by 1 Corinthians 16:13. Designed as a reminder to stay alert, stand firm in the faith, and be strong.",

        messageTitle:
            "STAND<br><span>FIRM.</span>",

        messageQuote:
            "“Stand firm in the faith.”",

        messageReference:
            "1 CORINTHIANS 16:13"
    },


    // =========================================
    // BE STRONG — JOSHUA 1:9
    // =========================================

    "joshua-1-9": {
        name: "BE STRONG TEE",
        price: 30,

        backImage:
            "images1/joshua-back.webp",

        frontImage:
            "images1/joshua-front.webp",

        description:
            "A faith-driven heavyweight tee inspired by Joshua 1:9. A reminder to be strong and courageous, knowing God is with you wherever you go.",

        messageTitle:
            "BE STRONG<br><span>AND COURAGEOUS.</span>",

        messageQuote:
            "“Be strong and courageous.”",

        messageReference:
            "JOSHUA 1:9"
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
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    if (!cartCount) return;

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalItems;
}


// =========================================
// CART COUNT ANIMATION
// =========================================

function animateCartCount() {

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    if (!cartCount) return;

    cartCount.classList.remove(
        "cart-count-pop"
    );

    void cartCount.offsetWidth;

    cartCount.classList.add(
        "cart-count-pop"
    );
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

    if (!size) return;

    const existingItem =
        cart.find(
            item =>
                item.name === name &&
                item.size === size
        );

    if (existingItem) {

        existingItem.quantity +=
            quantity;

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    animateCartCount();
}


// =========================================
// REMOVE FROM CART
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

    if (
        cart[index].quantity <= 0
    ) {
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
                    class="button"
                >
                    SHOP NOW
                </a>

            </div>
        `;

        const cartTotal =
            document.getElementById(
                "cart-total"
            );

        if (cartTotal) {
            cartTotal.textContent =
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
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-button"
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                    <strong>
                        $${itemTotal.toFixed(2)}
                    </strong>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})"
                    >
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

    const productName =
        document.getElementById(
            "product-name"
        );

    if (!productName) return;


    const params =
        new URLSearchParams(
            window.location.search
        );

    const productID =
        params.get("product");

    const product =
        products[productID];


    // If the product does not exist,
    // go back to the shop instead of
    // accidentally showing Fear Not.

    if (!product) {

        window.location.href =
            "shop.html";

        return;
    }


    document.title =
        product.name +
        " — SET APART";


    productName.textContent =
        product.name;


    const price =
        document.querySelector(
            ".product-detail-price"
        );

    if (price) {
        price.textContent =
            "$" + product.price;
    }


    const description =
        document.getElementById(
            "product-description"
        );

    if (description) {
        description.textContent =
            product.description;
    }


    const mainImage =
        document.getElementById(
            "product-main-image"
        );

    const backThumb =
        document.getElementById(
            "product-thumb-back"
        );

    const frontThumb =
        document.getElementById(
            "product-thumb-front"
        );


    if (
        mainImage &&
        backThumb &&
        frontThumb
    ) {

        mainImage.src =
            product.backImage;

        mainImage.alt =
            product.name + " Back";

        backThumb.src =
            product.backImage;

        backThumb.alt =
            product.name + " Back";

        frontThumb.src =
            product.frontImage;

        frontThumb.alt =
            product.name + " Front";


        backThumb.onclick =
            function () {

                mainImage.src =
                    product.backImage;

                mainImage.alt =
                    product.name + " Back";

                backThumb.classList.add(
                    "active"
                );

                frontThumb.classList.remove(
                    "active"
                );
            };


        frontThumb.onclick =
            function () {

                mainImage.src =
                    product.frontImage;

                mainImage.alt =
                    product.name + " Front";

                frontThumb.classList.add(
                    "active"
                );

                backThumb.classList.remove(
                    "active"
                );
            };
    }


    const messageTitle =
        document.getElementById(
            "product-message-title"
        );

    if (messageTitle) {
        messageTitle.innerHTML =
            product.messageTitle;
    }


    const messageQuote =
        document.getElementById(
            "product-message-quote"
        );

    if (messageQuote) {
        messageQuote.textContent =
            product.messageQuote;
    }


    const messageReference =
        document.getElementById(
            "product-message-reference"
        );

    if (messageReference) {
        messageReference.textContent =
            product.messageReference;
    }


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

    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );

    if (!checkoutButton) return;

    checkoutButton.addEventListener(
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
// START WEBSITE
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
