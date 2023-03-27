const ecommerceProd = document.getElementById("ecommerceProd");
const insideCart = document.getElementById("insideCart");
const products = [
    {
        id: 1,
        name: "Mate Imperial",
        price: 6500,
        img: "https://d2r9epyceweg5n.cloudfront.net/stores/001/310/957/products/imperial-premium1-dedbd5907665441e1716337116637328-1024-1024.jpg",
    },
    {
        id: 2,
        name: "Yerba Playadito",
        price: 600,
        img: "https://carrefourar.vtexassets.com/arquivos/ids/207097/7793704000928_03.jpg?v=637623985987930000",
    },
    {
        id: 3,
        name: "Termo Stanley",
        price: 20000,
        img: "https://carrefourar.vtexassets.com/arquivos/ids/164142/6939236363136_04.jpg?v=637467710509270000",
    },
    {
        id: 4,
        name: "Matera",
        price: 3500,
        img: "http://cdn.shopify.com/s/files/1/0609/3851/8702/products/matera-cuadrada-cuero_1_grande.png?v=1647359270",
    },
    {
        id: 5,
        name: "Bombilla Pico de Loro",
        price: 1500,
        img: "http://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg",
    },
];
let cart = []

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

    boton.addEventListener("click", () =>{
        cart.push({
            id : product.id,
            name : product.name,
            price : product.price,
            img : product.img,
        });
    });
});
insideCart.addEventListener("click", () =>{

})