import moment from 'moment'


export class Product {
    constructor(
        id,
        name,
        description,
        barcode,
        userId,
        quantity,
        isGlutenFree,
        isLactoseFree,
        isVegan,
        isVegetarian,
        expiryDate,
        address,
        lat,
        lng,
        rating
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.barcode = barcode
        this.userId = userId
        this.quantity = quantity
        this.isGlutenFree = isGlutenFree
        this.isLactoseFree = isLactoseFree
        this.isVegan = isVegan
        this.isVegetarian = isVegetarian
        this.expiryDate = expiryDate
        this.address = address
        this.lat = lat
        this.lng = lng
        this.rating = rating
    }

    get readableDate() {
        const expires = new Date(this.expiryDate)
        return moment(expires).format('DD/MM/YYYY')
    }
}

export default Product