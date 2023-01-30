import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { CATEGORY , TUser2, TProduct, TPurchase } from "./types"
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
        const result = await db("users2")
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
        const result = await db("products")
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

//Get All Purchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db("purchases");

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
        const result =  await db("products")
        .where("name", "LIKE", `%${q}%`);
        
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
        const { id, name, email, password } = req.body //as TUser2

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
        
        
        await db("users2").insert({id, name, email, password});
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
        
        await db("products").insert({id, name, price, category, description, image_url});
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
        const { id, buyer_id } = req.body //as TPurchase

        if (!id || !buyer_id) {
            res.status(400)
            throw new Error("Precisa inserir id ou buyer_id!")
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'userId' e 'productId' precisam ser strings e 'totalPrice' precisa ser do tipo number.")
        }

        const productsList = req.body.products
        let totalPrice = 0
        const products = []

        // fazendo o for no array de produtos da requisição (postman)
        for (let product of productsList) {
            //buscando cada produto pelo id
            const productRow = await db("products").where({id: product.productId});

            // somando o total da compra de acordo com o preço do produto e a quantidade passada no array de produtos da requisição
            totalPrice += productRow[0].price * product.quantity

            // populando o produto no array products para mostrar no response da req
            products.push({...productRow[0], quantity: product.quantity})

            // salvando as informações individuais de cada produto na tabela purchases_products
            await db("purchases_products").insert({ purchase_id: id, product_id: product.productId, quantity: product.quantity });
        }

        // salvando os dados na tabela purchase
        const purchase = await db("purchases").insert({id,total_price:totalPrice, paid: 1, buyer_id });

        const data = {
            id,
            buyer:buyer_id ,
            totalPrice: totalPrice,
            products: products
        }

        res.status(201).send({
            data,
            message: "Pedido realizado com sucesso!",
        })

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
        const [result] = await db("products").where({id: id});               
        
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
app.get("/users2/:id/purchases", async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const [purchaseIndex] = await db("purchases").where({buyer_id: id})

        if (purchaseIndex) {
            res.status(200).send(purchaseIndex)
        } else {
            res.status(400)
            throw new Error("Esse usuário não fez compras!")
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

//Delete User by id
app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const userIndex = await db("users2").del().where({id: id})

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("User apagado com sucesso!")
        } else {
            res.status(404).send("User não encontrado!")
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


//Delete Product by id
app.delete("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const productIndex = await db("products").del().where({id: id})

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("Produto apagado com sucesso!")
        } else {
            res.status(404).send("Produto não encontrado!")
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


//Edit User by id
app.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const [user] = await db("users").where({ id: id })

        if (user) {

            const updateUser = {
                email: newEmail || user.email,
                password: newPassword || user.password
            }

            await db("users").update(updateUser).where({ id: id });

        } else {
            res.status(404).send("User não encontrado!")
        }

        res.status(200).send("Cadastro atualizado com sucesso!")
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

//Edit Product by id
app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as CATEGORY | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined

        const [product] = await db("products").where({ id: id })

        if (product) {

            const updateProduct = {
                name: newName || product.name,
                price: isNaN(newPrice) ? product.price : newPrice,
                category: newCategory || product.category,
                description: newDescription || product.description,
                image_url: newImageUrl || product.image_url
            }

            await db("products").update(updateProduct).where({ id: id });

            res.status(200).send({ 
                "produto": updateProduct,
                message: "Produto atualizado com sucesso!"
            })
        } else {
            res.status(404).send("Produto não encontrado!")
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

//Delete purchase by id

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (!idToDelete) {
            res.status(400)
            throw new Error("É necessário informar um 'id'")
        }

        const [purchaseExist] = await db("purchases").where({ id: idToDelete })

        if (purchaseExist) {
            await db("purchases").del().where({ id: idToDelete })
            res.status(200).send({
                message: "Pedido cancelado com sucesso!"
            });

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
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

//Get purchase by id

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const purchaseId = req.params.id

        if (!purchaseId) {
            res.status(400)
            throw new Error("É necessário informar um 'id'")
        }

        const purchases = await db("purchases_products").where({purchase_id: purchaseId});
        const productsList = []

        for (let purchase of purchases) {
            const product = await db("products").where({id: purchase.product_id})
            productsList.push({...product[0], quantity: purchase.quantity})
        }

        const purchase = await db("purchases").where({ id: purchaseId });

        const purchaseData = purchase[0]

        const user = await db("users").where({ id: purchaseData.buyer_id });

        const userData = user[0]

        const data = {
            purchaseId: purchaseData.id,
            totalPrice: purchaseData.total_price,
            createdAt: purchaseData.created_at,
            isPaid: purchaseData.paid ? true : false,
            buyerId: userData.id,
            email: userData.email,
            name: userData.name,
            productsList
        }

        res.status(200).send(data)

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
