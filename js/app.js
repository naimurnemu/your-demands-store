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
        <div class="card h-100 p-2">
            <img
                src="${product?.image}"
                class="p-3 card-img-top h-50"
                alt="product"
            />
            <div class="card-body">
                <h6 class="card-title m-0">${product?.title}</h5>
                <h5 class="text-warning m-0 text-center">Price: $ ${product.price}</h5>
                <h5 class="card-text m-0">
                    <small> ${product?.category}</small>
                </h5>
                <button onclick="addToCart(${product?.price})" id="addToCart-btn" class="buy-now btn btn-outline-primary">add to cart</button>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details</button>
                <div class="d-flex justify-content-around pt-3">
                    <small class=" text-success text-center"><span>Total count:</span> <br><span><i class="fas fa-user-alt"></i> ${product?.rating?.count}</span></small>
                    <small class=" text-info text-center"><span>Rating:</span> <br><span><i class="fas fa-star-half-alt"></i> ${product?.rating?.rate}</span></small>
                </div>
            </div> 
        </div>
      `;
        document.getElementById("Product-container").appendChild(div);
        const modalDiv = document.getElementById("modal-box");
        modalDiv.innerHTML = ``;
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
        setInnerText("total-tax", (priceConverted *= 0.0).toFixed(2));
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
