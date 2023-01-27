import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { CATEGORY } from "./types"
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