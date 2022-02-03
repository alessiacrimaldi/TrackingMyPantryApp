import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('products.db')

export const init = () => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, barcode TEXT NOT NULL, userId TEXT NOT NULL, quantity INTEGER NOT NULL, isGlutenFree BOOLEAN NOT NULL, isLactoseFree BOOLEAN NOT NULL, isVegan BOOLEAN NOT NULL, isVegetarian BOOLEAN NOT NULL, expiryDate DATE NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, rating INTEGER);',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    )
    return promise
}

export const insertProduct = (name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  // we do this to avoid SQL injection!
                [name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng, null],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    )
    return promise
}

export const fetchProducts = (id) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM products WHERE userId = ?',
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    )
    return promise
}

export const removeProduct = (id) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM products WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    )
    return promise
}

export const rateProduct = (id, rating) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE products SET rating = ? WHERE id = ?`,
                [rating, id],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    )
    return promise
}