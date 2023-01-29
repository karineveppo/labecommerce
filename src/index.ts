import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { CATEGORY , TUser, TProduct, TPurchase } from "./types"
import express, { Request, Response} from 'express'; //importando o express, também precisamos importar os objetos Request e Response, sempre entre chaves {}
import cors from 'cors';
import { db } from './database/knex'

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
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Get All Products
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM products;
    `)
    res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Search Product by name
app.get("/product/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q 
        const result =  await db.raw(`
        SELECT * FROM products
        WHERE name LIKE "%${q}%";
        `)
            // products.filter((product) => {
            // return product.name.toLowerCase().includes(q.toLowerCase())

        if (q !== undefined) {
            if (typeof q !== "string") {
                throw new Error("O nome do produto deve ser uma string")
            }

            if (q.length < 1) {
                throw new Error("O nome do produto deve possuir no mínimo 1 caractere")
            }
        
        }
        
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Create User
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body //as TUser

        if (id === undefined || name === undefined || email === undefined || password === undefined) {
            throw new Error("Todos os campos devem ser preenchidos")
        }

        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string")
        }

        const userExists = users.find((user) => user.id === id)
        if (userExists) {
            throw new Error("Não deve ser possível criar mais de uma conta com a mesma id")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser um texto")
        }

        if (typeof email !== "string") {
            throw new Error("'e-mail' deve ser uma string")
        }
        const emailExists = users.find((user) => user.email === email)
        if (emailExists) {
            throw new Error("Não deve ser possível criar mais de uma conta com o mesmo e-mail")
        }

        // const newUser = {
        //     id,
        //     email,
        //     password
        // }
        // users.push(newUser)

        await db.raw(`
            INSERT INTO users(id, name, email, password)
            VALUES ("${id}", "${name}", "${email}", "${password}");
        `)

        res.status(201).send("Cadastro realizado com sucesso!")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Create Product
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, category, description, image_url } = req.body //as TProduct

        if (id !== undefined) {

            if (typeof id !== "string") {
                throw new Error("'id' deve ser uma string")
            }
            const productExists = products.find((product) => product.id === id)

            if (productExists) {
                throw new Error("Não deve ser possível criar mais de um produto com a mesma id")
            }
        }

        // const newProduct = {
        //     id,
        //     name,
        //     price,
        //     category
        // }
        // products.push(newProduct)

        await db.raw(`
        INSERT INTO products(id, name, price, category, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${category}", "${description}","${image_url}");
    `)

        res.status(201).send("Produto cadastrado com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Create Purchase
app.post("/purchases", async (req: Request, res: Response) => {

    try {
        const { id, total_price, paid, created_at, buyer_id } = req.body //as TPurchase

        if (typeof id!== "string") {
            res.status(400)
            throw new Error("O 'id' precisa ser uma string")
        }

        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' precisa ser um number")
        }

        // const foundPurchaseUser = users.find((user) => {
        //     return user.id === id
        // })

        // if (!foundPurchaseUser) {
        //     res.status(400)
        //     throw new Error("Usuário não encontrado!")
        // }

        // const foundPurchaseProduct = products.find((product) => {
        //     return product.id === id
        // })

        // if (!foundPurchaseProduct) {
        //     res.status(400)
        //     throw new Error("Produto não encontrado!")
        // }

        const [verificationBuyerId] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${buyer_id}";
        `)

        if(verificationBuyerId) {
            await db.raw(`
            INSERT INTO purchases(id, total_price, paid, created_at, buyer_id)
            VALUES("${id}", ${total_price}, ${paid},"${created_at}", "${buyer_id}");
            `)
        }

        res.status(201).send("Compra cadastrada com sucesso!")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Get Products by id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [result] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
        `)
        //products.find((product) => {
            //return product.id === id
       // })

        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400)
            throw new Error("Produto não encontrado!")
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Get User Purchases by User id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const [purchaseIndex] = await db.raw(`
        SELECT * FROM users
        WHERE id = "${id}";
    `)
        //purchases.find((purchase) => purchase.userId === id)

        if (purchaseIndex) {
            res.status(200).send(purchaseIndex)
        } else {
            res.status(400)
            throw new Error("Esse usuário não fez compras!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }})


//Delete User by id
app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIndex = users.findIndex((user) => {
            return user.id === id
        })

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("User apagado com sucesso!")
        } else {
            res.status(404).send("User não encontrado!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})


//Delete Product by id
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const productIndex = products.findIndex((product) => {
            return product.id === id
        })

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("Produto apagado com sucesso!")
        } else {
            res.status(404).send("Produto não encontrado!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//Edit User by id
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)

        
        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password

            res.status(200).send("Cadastro atualizado com sucesso!")

        } else {
            res.status(404).send("User não encontrado!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//Edit Product by id
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as CATEGORY | undefined

        const product = products.find((product) => product.id === id)

        if (product) {
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category

            res.status(200).send("Produto atualizado com sucesso!")
        } else {
            res.status(404).send("Produto não encontrado!")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

