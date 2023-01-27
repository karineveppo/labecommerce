import { TUser, TProduct, TPurchase } from "./types"

export const users: TUser[] = [
    {
        id: "u001",
        email: "marcosbenhur@email.com",
        password: "mb0123",
    },
    {
        id: "u002",
        email: "karine@email.com",
        password: "k1234",
    },
    {
        id: "u003",
        email: "marcosdaniel@email.com",
        password: "md2345",
    },
    {
        id: "u004",
        email: "enzopaschoal@email.com",
        password: "ep3456",
    },
    {
        id: "u005",
        email: "rafaelakarine@email.com",
        password: "rk4567",
    },
    {
        id: "u006",
        email: "flaviamanuela@email.com",
        password: "fm5678",
    },
    {
        id: "u007",
        email: "vinuciusoyama@email.com",
        password: "vo6789",
    },
]


export const products: TProduct[] = [
    {
        id: "p001",
        name: "Box Mangá Bleach - vol 1-21",
        price: 1088,
        category: "Box Mangá"
    },
    {
        id: "p002",
        name: "Box Mangá Demon Slayer - vol 1-23",
        price: 981,
        category: "Box Mangá"
    },
    {
        id: "p003",
        name: "Box Mangá One Piece - vol 1-23",
        price: 1064,
        category: "Box Mangá"
    },
    {
        id: "p004",
        name: "Box Mangá Naruto - vol 1-27",
        price: 887,
        category: "Box Mangá"
    },
    {
        id: "p005",
        name: "Mngá Hunter X Hunter vol.1",
        price: 57,
        category: "Mangá Avulso"
    },
    {
        id: "p006",
        name: "Tate no Yuusha no Nariagari vol.1 ",
        price: 69,
        category: "Mangá Avulso"
    },
    {
        id: "p007",
        name: "Hellsing vol.1",
        price: 52,
        category: "Mangá Avulso"
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
