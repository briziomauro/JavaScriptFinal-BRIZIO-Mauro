const ecommerceProd = document.getElementById("ecommerceProd");
const insideCart = document.getElementById("insideCart");
const cartContainer = document.getElementById("cartContainer");
const products = [
    {
        id: 1,
        name: "Mate Imperial",
        price: 6500,
        amount: 1,
        img: "https://d2r9epyceweg5n.cloudfront.net/stores/001/310/957/products/imperial-premium1-dedbd5907665441e1716337116637328-1024-1024.jpg",
    },
    {
        id: 2,
        name: "Yerba Playadito",
        price: 600,
        amount: 1,
        img: "https://carrefourar.vtexassets.com/arquivos/ids/207097/7793704000928_03.jpg?v=637623985987930000",
    },
    {
        id: 3,
        name: "Termo Stanley",
        price: 20000,
        amount: 1,
        img: "https://carrefourar.vtexassets.com/arquivos/ids/164142/6939236363136_04.jpg?v=637467710509270000",
    },
    {
        id: 4,
        name: "Matera",
        price: 3500,
        amount: 1,
        img: "http://cdn.shopify.com/s/files/1/0609/3851/8702/products/matera-cuadrada-cuero_1_grande.png?v=1647359270",
    },
    {
        id: 5,
        name: "Bombilla Pico de Loro",
        price: 1500,
        amount: 1,
        img: "http://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg",
    },
];
let cart = JSON.parse(localStorage.getItem("cartStorage")) || [];

products.forEach((product) => {
    let contenido = document.createElement("div");
    contenido.className = "productCard"
    contenido.innerHTML = `
 <img src="${product.img}">
 <h3>${product.name}</h3>
 <p>${product.price} $</p>
 `;
    ecommerceProd.append(contenido)

    let boton = document.createElement("button");
    boton.innerText = "Añadir al carrito"
    boton.className = "buttonCart"
    contenido.append(boton);

    boton.addEventListener("click", () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.amount++;
                }
            });
        }
        else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            amount: product.amount,
        });
        };
        localCart();
    });
});


const takeOut = () => {
    cartContainer.innerHTML = "";
    cartContainer.style.display = "flex";
    const cartHead = document.createElement("div");
    cartHead.className = "cartHead"
    cartHead.innerHTML = `
    <h1 class="tituloCart">TUS PRODUCTOS</h1>
    `;
    cartContainer.append(cartHead);
    const headButton = document.createElement("h2");
    headButton.innerText = "X";
    headButton.className = "headButtonStyle";
    headButton.addEventListener("click", () => {
        cartContainer.style.display = "none";
    })
    cartHead.append(headButton);

    cart.forEach((product) => {
        let cartContent = document.createElement("div");
        cartContent.className = "cartContentStyle";
        cartContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p>${product.price} $</p>
        <p>Cantidad: ${product.amount}</p>
        <span class="deleteProduct"> x </span>
        `;
        cartContainer.append(cartContent);
        
        let close = cartContent.querySelector(".deleteProduct");
        close.addEventListener("click", () =>{
            deleteCartProduct(product.id);
        });
    });

    const total = cart.reduce((acc, prod) => acc + prod.price, 0);
    const totalPrice = document.createElement("div")
    totalPrice.className = "totalPriceStyle"
    totalPrice.innerHTML = `TOTAL A PAGAR: ${total} $`;
    cartContainer.append(totalPrice);
};
insideCart.addEventListener("click", takeOut);

const deleteCartProduct = (id) => {
    const foundId = cart.find((element)=> element.id === id);
    cart = cart.filter((cartId) =>{
        return cartId !== foundId;
    });
    takeOut();
    localCart();
};

const localCart = () => {
    localStorage.setItem("cartStorage", JSON.stringify(cart))
};
