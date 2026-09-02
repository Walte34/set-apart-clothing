// SET APART CLOTHING

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


// SAVE CART

function saveCart() {
    localStorage.setItem(
        "setApartCart",
        JSON.stringify(cart)
    );
}


// UPDATE CART NUMBER

function updateCartCount() {

    const count =
        document.getElementById("cart-count");

    if (!count) return;

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    count.textContent = totalItems;
}


// CART NOTIFICATION

function showCartNotification(
    name,
    size,
    quantity,
    isError = false
) {

    const oldNotification =
        document.getElementById("cart-notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification =
        document.createElement("div");

    notification.id =
        "cart-notification";

    if (isError) {

        notification.innerHTML = `
            <div class="cart-notification-icon">
                !
            </div>

            <div class="cart-notification-content">
                <strong>SIZE REQUIRED</strong>
                <span>Please choose a size before adding to cart.</span>
            </div>
        `;

    } else {

        notification.innerHTML = `
            <div class="cart-notification-icon">
                ✓
            </div>

            <div class="cart-notification-content">
                <strong>ADDED TO CART</strong>
                <span>${name}</span>
                <small>Size ${size} • Qty ${quantity}</small>
            </div>

            <a
                href="cart.html"
                class="cart-notification-button">
                VIEW CART
            </a>
        `;
    }

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 10);

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(() => {

            if (notification.parentNode) {
                notification.remove();
            }

        }, 500);

    }, 3000);
}


// ADD TO CART

function addToCart(
    name,
    price,
    size,
    quantity = 1
) {

    const existingItem = cart.find(
        item =>
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

    saveCart();

    updateCartCount();

    showCartNotification(
        name,
        size,
        quantity
    );
}


// REMOVE ITEM

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}


// CHANGE QUANTITY

function changeQuantity(
    index,
    amount
) {

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


// DISPLAY CART

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
                    class="button">

                    SHOP NOW

                </a>

            </div>
        `;

        const cartTotal =
            document.getElementById(
                "cart-total"
            );

        if (cartTotal) {
            cartTotal.textContent = "0.00";
        }

        const bottomTotal =
            document.getElementById(
                "cart-total-bottom"
            );

        if (bottomTotal) {
            bottomTotal.textContent = "0.00";
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


// LOAD PRODUCT PAGE

function loadProductPage() {

    const name =
        document.getElementById(
            "product-name"
        );

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


    document.title =
        product.name +
        " — SET APART";


    document.getElementById(
        "product-name"
    ).textContent =
        product.name;


    document.getElementById(
        "product-image-text"
    ).textContent =
        product.imageText;


    document.getElementById(
        "product-description"
    ).textContent =
        product.description;


    const price =
        document.querySelector(
            ".product-detail-price"
        );

    if (price) {
        price.textContent =
            "$" +
            product.price;
    }


    const addButton =
        document.getElementById(
            "product-add-cart"
        );


    if (!addButton) return;


    addButton.onclick = () => {

        const size =
            document.getElementById(
                "product-size"
            ).value;


        const quantity =
            Number(
                document.getElementById(
                    "product-quantity"
                ).value
            );


        if (!size) {

            showCartNotification(
                "",
                "",
                "",
                true
            );

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


// SHOP PAGE BUTTONS

function setupShopButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

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

                    showCartNotification(
                        "",
                        "",
                        "",
                        true
                    );

                    return;
                }


                addToCart(
                    name,
                    price,
                    size
                );
            }
        );
    });
}


// CHECKOUT

function setupCheckout() {

    const button =
        document.getElementById(
            "checkout-button"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

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


// START EVERYTHING

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        displayCart();

        setupShopButtons();

        setupCheckout();

        loadProductPage();

    }
);
