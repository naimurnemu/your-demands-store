/* // get data from input-field
 const getInputData = (id) => {
    const inputField = document.getElementById(id);
    const inputValue = inputField.value;
    return inputValue;
    const searchValue = getInputData('search-field')
};
search query link khuje na paway code kora jayni
const url = `https://fakestoreapi.com/search?query=${searchValue}` */

// load data From server
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
// initial call
loadProducts();

// show all product in UI
const showProducts = (products) => {
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card single-product h-100 p-2">
            <img
                src="${product?.image}"
                class="p-3 card-img-top img-fluid h-100"
                alt="product"
            />
            <div class="card-body">
                <h4 class="card-title">${product?.title}</h4>
                <p class="card-text">
                     ${product?.category}
                </p>
                <h3 class="text-secondary">Price: $ ${product.price}</h3>
            </div>
            <div class="d-flex justify-content-between px-3">
            <button onclick="addToCart(${product?.price})" id="addToCart-btn" class="buy-now btn btn-outline-primary">add to cart</button>
            <button id="details-btn" class="btn btn-outline-danger">Details</button></div>
            <div class="d-flex justify-content-around pt-3">
            <h5 class="text-success text-center"><span>Total count:</span> <br><span><i class="fas fa-user-alt"></i> ${product?.rating?.count}</span></h5>
            <h5 class="text-info text-center"><span>Rating:</span> <br><span><i class="fas fa-star-half-alt"></i> ${product?.rating?.rate}</span></h5>
            </div>
            </div>
            
        </div>
      `;
        document.getElementById("Product-container").appendChild(div);
    });
};

// Clear Element field
const clearField = (id) => {
    const field = document.getElementById(id);
    field.innerText = 0;
};

// BUY button event
const buyBtnEvent = () => {
    clearField("total-Products");
    clearField("price");
    clearField("delivery-charge");
    clearField("total-tax");
    clearField("total");
    document.getElementById(
        "Purcase-div"
    ).innerHTML = `<h2 class="m-4 p-4 shadow-lg border border-warning border-3 rounded-3">WELCOME, Have a nice day!</h2>`;
    count = 0;
};

// total product update
let count = 0;
const addToCart = (price) => {
    count = count + 1;
    updatePrice("price", price);
    updateTaxAndCharge();
    updateTotal();
    document.getElementById("total-Products").innerText = count;
    document.getElementById(
        "Purcase-div"
    ).innerHTML = `<button onclick="buyBtnEvent()" class="btn btn-primary text-center">
    Buy Now
</button>`;
};

// Get value from element
const getElementValue = (id) => {
    const element = document.getElementById(id);
    const elementText = element.innerText;
    const elementValue = parseFloat(elementText);
    return elementValue;
};
// set innerText value
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getElementValue(id);
    const convertPrice = parseFloat(value);
    const totalPrice = (convertedOldPrice + convertPrice).toFixed(2);
    setInnerText(id, totalPrice);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    let priceConverted = getElementValue("price");
    if (priceConverted > 200 && priceConverted <= 400) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", (priceConverted *= 0.2).toFixed(2));
    } else if (priceConverted > 400 && priceConverted <= 500) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", (priceConverted *= 0.3).toFixed(2));
    } else if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", (priceConverted *= 0.4).toFixed(2));
    } else {
        setInnerText("delivery-charge", 20);
        setInnerText("total-tax", (priceConverted *= 0.2).toFixed(2));
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getElementValue("price") +
        getElementValue("delivery-charge") +
        getElementValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};
