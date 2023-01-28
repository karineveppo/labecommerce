import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { CATEGORY , TUser, TProduct, TPurchase } from "./types"
import express, { Request, Response} from 'express'; //importando o express, também precisamos importar os objetos Request e Response, sempre entre chaves {}
import cors from 'cors';

// console.log("Tabela de usuários")
//     console.table(users)

// console.log("Tabela de produtos")
//     console.table(products)

// console.log("Tabela de compras")
//     console.table(purchases)


// console.log(createUser("u008", "felipe@email.com", "f7890"))

// console.table(getAllUsers())
    
// console.log(createProduct("p008", "DNA Revelado das Emoções", 90, CATEGORY.LIVROS ))
    
// console.table(getAllProducts())
    
// console.log(getProductById("p008"))

// console.table(queryProductsByName("Livro"))

// console.log(createPurchase("u008", "p008", 1, 90))

// console.log(getAllPurchasesFromUserId("u002"))

const app = express(); //invocando a função express() dentro da variável app 
app.use(express.json()); //configuração do middleware que garante que nossas respostas estejam sempre no formato json
app.use(cors()); //configuração do middleware que habilita o CORS

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
});

//endpoint de teste
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

//Get All Users
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})


//Get All Products
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

//Search Product by name
app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string 
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

//Create User
app.post("/users", (req: Request, res: Response) => {

    const { id, email, password } = req.body as TUser

    const newUser = {
        id,
        email, 
        password
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

//Create Product
app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, category} = req.body as TProduct

    const newProduct = {
        id,
        name, 
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
    
})

//Create Purchase
app.post("/purchases", (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId, 
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
    
})

//Get Products by id
app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
})

