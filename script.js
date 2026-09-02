// =========================================
// SET APART CLOTHING
// =========================================


// CART

let cart =
    JSON.parse(
        localStorage.getItem("setApartCart")
    ) || [];


// PRODUCTS

const products = {

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

    }

    else {

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


    cart.splice(
        index,
        1
    );


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


    cart[index].quantity +=
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

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



    // CART WITH ITEMS

    let total = 0;


    container.innerHTML = "";


    cart.forEach(

        (item, index) => {

            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


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


    // Not on product page

    if (!productName) return;



    // GET PRODUCT FROM URL

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



    // PAGE TITLE

    document.title =
        product.name +
        " — SET APART";



    // PRODUCT NAME

    productName.textContent =
        product.name;



    // PRICE

    const price =
        document.querySelector(
            ".product-detail-price"
        );


    if (price) {

        price.textContent =
            "$" +
            product.price;

    }



    // DESCRIPTION

    const description =
        document.getElementById(
            "product-description"
        );


    if (description) {

        description.textContent =
            product.description;

    }



    // =====================================
    // PRODUCT IMAGES
    // =====================================

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

        // Starting images

        mainImage.src =
            product.backImage;


        backThumb.src =
            product.backImage;


        frontThumb.src =
            product.frontImage;



        // BACK BUTTON

        backThumb.onclick =
            function () {

                mainImage.src =
                    product.backImage;


                backThumb.classList.add(
                    "active"
                );


                frontThumb.classList.remove(
                    "active"
                );

            };



        // FRONT BUTTON

        frontThumb.onclick =
            function () {

                mainImage.src =
                    product.frontImage;


                frontThumb.classList.add(
                    "active"
                );


                backThumb.classList.remove(
                    "active"
                );

            };

    }



    // =====================================
    // PRODUCT MESSAGE
    // =====================================

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



    // =====================================
    // ADD TO CART BUTTON
    // =====================================

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


            // NO SIZE SELECTED

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

            if (
                cart.length === 0
            ) {

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
