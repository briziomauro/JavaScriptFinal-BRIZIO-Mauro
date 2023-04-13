const ecommerceProd = document.getElementById("ecommerceProd");
const insideCart = document.getElementById("insideCart");
const cartContainer = document.getElementById("cartContainer");

let cart = JSON.parse(localStorage.getItem("cartStorage")) || [];

const asynProd = async () =>{
    const reply = await fetch("./json/data.json");
    const data = await reply.json();

    data.forEach((product) => {
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
};
asynProd();

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

const btnSwal = document.getElementsByTagName("button");

btnSwal.onclick = () => {
   Swal.fire({
    position: 'bot-end',
    icon: 'success',
    title: 'Su producto se ha añadido al carrito',
    showConfirmButton: false,
    timer: 1500
    })
}

const localCart = () => {
    localStorage.setItem("cartStorage", JSON.stringify(cart))
};


