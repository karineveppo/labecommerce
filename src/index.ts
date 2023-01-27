import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { CATEGORY } from "./types"
console.log("Tabela de usuários")
    console.table(users)

console.log("Tabela de produtos")
    console.table(products)

console.log("Tabela de compras")
    console.table(purchases)


console.log(createUser("u008", "felipe@email.com", "f7890"))

console.table(getAllUsers())
    
console.log(createProduct("p008", "DNA Revelado das Emoções", 90, CATEGORY.LIVROS ))
    
console.table(getAllProducts())
    
console.log(getProductById("p008"))

console.table(queryProductsByName("Livro"))

console.log(createPurchase("u008", "p008", 1, 90))

console.log(getAllPurchasesFromUserId("u002"))