export enum CATEGORY {
    BOX_MANGAS = "Box Mangás",
    MANGAS_AVULSOS = "Mangás Avulsos",
    LIVROS = "Livros"
}

export type TUser = {
    id: string,
    email: string, 
    password: string,
}

export type TProduct = {
    id: string,
    name: string, 
    price: number,
    category: CATEGORY
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number, 
    totalPrice: number
}