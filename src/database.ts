import { TUser2, TProduct, TPurchase, CATEGORY } from "./types"

export const users: TUser2[] = [
    {
        id: "u001",
        name: "Marcos Benhur",
        email: "marcosbenhur@email.com",
        password: "mb0123",
    },
    {
        id: "u002",
        name: "karine",
        email: "karine@email.com",
        password: "k1234",
    },
    {
        id: "u003",
        name: "Marcos Daniel",
        email: "marcosdaniel@email.com",
        password: "md2345",
    },
    {
        id: "u004",
        name: "Enzo Paschoal",
        email: "enzopaschoal@email.com",
        password: "ep3456",
    },
    {
        id: "u005",
        name: "Rafaela Karine",
        email: "rafaelakarine@email.com",
        password: "rk4567",
    },
    {
        id: "u006",
        name: "Flavia Manuela",
        email: "flaviamanuela@email.com",
        password: "fm5678",
    },
    {
        id: "u007",
        name:"Vinicius Oyama",
        email: "viniciusoyama@email.com",
        password: "vo6789",
    },
]


export const products: TProduct[] = [
    {
        id: "p001",
        name: "Box Mangá Bleach - vol 1-21",
        price: 1088,
        category: CATEGORY.BOX_MANGAS
    },
    {
        id: "p002",
        name: "Box Mangá Demon Slayer - vol 1-23",
        price: 981,
        category: CATEGORY.BOX_MANGAS
    },
    {
        id: "p003",
        name: "Box Mangá One Piece - vol 1-23",
        price: 1064,
        category: CATEGORY.BOX_MANGAS
    },
    {
        id: "p004",
        name: "Box Mangá Naruto - vol 1-27",
        price: 887,
        category: CATEGORY.BOX_MANGAS
    },
    {
        id: "p005",
        name: "Mangá Hunter X Hunter vol.1",
        price: 57,
        category: CATEGORY.MANGAS_AVULSOS
    },
    {
        id: "p006",
        name: "Tate no Yuusha no Nariagari vol.1 ",
        price: 69,
        category: CATEGORY.MANGAS_AVULSOS
    },
    {
        id: "p007",
        name: "Hellsing vol.1",
        price: 52,
        category: CATEGORY.MANGAS_AVULSOS
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "u001",
        productId: "p001",
        quantity: 1, 
        totalPrice: 1088
    }, 
    {
        userId: "u002",
        productId: "p004",
        quantity: 2, 
        totalPrice: 1774
    }
]

//User - CreateUser- cria um novo usuário.
export function createUser(id: string, name: string, email: string, password: string): void {
    const newUser2: TUser2 = {
        id,
        name,
        email,
        password
    }
    users.push(newUser2)
    console.log("Cadastro realizado com sucesso")
}

//GetAllUser - busca todas as pessoas da lista de users
export function getAllUsers(): TUser2[] {
    return users
}

//Product- Create Product - cria um novo produto na lista de products
export function createProduct (id: string, name: string, price: number, category: CATEGORY): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
}

//GetAllProducts - busca todos os produtos da lista de products
export function getAllProducts(): TProduct[] {
    return products
}

//GetProductById - busca por produtos baseado em um id da lista de products
export function getProductById(idToSearch: string): TProduct[] | undefined {
    return products.filter((product) => {
        product.id === idToSearch
    })
}

//QueryProductsByName - busca por produtos baseado em um nome da lista de products
export function queryProductsByName(q: string): void {
    const query = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.table(query)
}

//Purchase - createPurchase - cria uma nova compra na lista de purchases
export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

//getAllPurchasesFromUserId - busca todas as compras feitas baseado no id do usuário
export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {
    return purchases.filter((purchase) => {
        return purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase())
    })
}
