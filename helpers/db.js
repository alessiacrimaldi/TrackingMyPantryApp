import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('products.db')

export const init = () => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, barcode TEXT NOT NULL, userId TEXT NOT NULL, quantity INTEGER NOT NULL, isGlutenFree BOOLEAN NOT NULL, isLactoseFree BOOLEAN NOT NULL, isVegan BOOLEAN NOT NULL, isVegetarian BOOLEAN NOT NULL, expiryDate TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, favorite BOOLEAN NOT NULL, rating INTEGER NOT NULL);',
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

export const insertProduct = (name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng, rating) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO products (name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng, favorite, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  // we do this to avoid SQL injection!
                [name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, lat, lng, false, rating],
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

export const fetchFavorites = () => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM products WHERE favorite = true',
                [],
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

export const addFavorite = (id) => {
    const promise = new Promise((resolve, reject) =>
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE products SET favorite = true WHERE id = ?`,
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

// export const rateProduct = (id, rating) => {
//     const promise = new Promise((resolve, reject) =>
//         db.transaction((tx) => {
//             tx.executeSql(
//                 `UPDATE products SET rating = ? WHERE id = ?`,
//                 [rating, id],
//                 (_, result) => {
//                     resolve(result)
//                 },
//                 (_, err) => {
//                     reject(err)
//                 }
//             )
//         })
//     )
//     return promise
// }