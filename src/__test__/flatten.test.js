import flatten from '../flatten';

xdescribe('flatten', function () {
    it('should flat with object', function () {
        const object = {
            "name": "John",
            "age": 30,
            "isMarried": true,
            "address": {
                "street": "123 Main St",
                "city": "New York"
            },
            "nullValue": null
        };
        const received = flatten(object);
        const expected = [
            {
                name: 'John',
                age: 30,
                isMarried: true,
                address_street: '123 Main St',
                address_city: 'New York',
                nullValue: null
            }
        ];
        expect(received).toEqual(expected);
    });
    it('should flat with array of string', function () {
        const object = {
            "name": "John",
            "age": 30,
            "isMarried": true,
            "favoriteFoods": ["pizza", "ice cream", "sushi"],
        };
        const received = flatten(object);
        const expected = [
            {
                name: 'John',
                age: 30,
                isMarried: true,
                favoriteFoods: 'pizza'
            },
            {
                name: 'John',
                age: 30,
                isMarried: true,
                favoriteFoods: 'ice cream'
            },
            {
                name: 'John',
                age: 30,
                isMarried: true,
                favoriteFoods: 'sushi'
            }
        ];
        expect(received).toEqual(expected);
    });
    it('should flat with array of string and object', function () {
        const object = {
            "name": "John",
            "age": 30,
            "isMarried": true,
            "address": {
                "street": "123 Main St",
                "city": "New York"
            },
            "favoriteFoods": ["pizza", "ice cream", "sushi"],
        };
        const received = flatten(object);
        const expected = [
            {
                name: 'John',
                age: 30,
                isMarried: true,
                address_street: '123 Main St',
                address_city: 'New York',
                favoriteFoods: 'pizza'
            },
            {
                name: 'John',
                age: 30,
                isMarried: true,
                address_street: '123 Main St',
                address_city: 'New York',
                favoriteFoods: 'ice cream'
            },
            {
                name: 'John',
                age: 30,
                isMarried: true,
                address_street: '123 Main St',
                address_city: 'New York',
                favoriteFoods: 'sushi'
            }
        ];
        expect(received).toEqual(expected);
    });
    fit('should flat with array of object', function () {
        const object = {
            "name": "John",
            "age": 30,
            "isMarried": true,
            "addresses": [
                {
                    "street": "123 Main St",
                    "city": "New York"
                },
                {
                    "street": "124 Mid St",
                    "city": "Tokyo"
                }
            ]
        };
        const received = flatten(object);
        const expected = [
            {
                name: 'John',
                age: 30,
                isMarried: true,
                addresses_street: '123 Main St',
                addresses_city: 'New York'
            },
            {
                name: 'John',
                age: 30,
                isMarried: true,
                addresses_street: '124 Mid St',
                addresses_city: 'Tokyo'
            }
        ];
        expect(received).toEqual(expected);
    });
    it('should flat with array of object', function () {
        const object = {
            "id": 1001,
            "date": "2022-04-01",
            "total": 50.0,
            "items": [
                {
                    "id": 1,
                    "name": "Widget",
                    "quantity": 2,
                    "price": 20.0
                },
                {
                    "id": 2,
                    "name": "Gadget",
                    "quantity": 1,
                    "price": 10.0
                }
            ]
        };
        const received = flatten(object);
        const expected = [
                {
                    id: 1001,
                    date: '2022-04-01',
                    total: 50,
                    items_id: 1,
                    items_name: 'Widget',
                    items_quantity: 2,
                    items_price: 20
                },
                {
                    id: 1001,
                    date: '2022-04-01',
                    total: 50,
                    items_id: 2,
                    items_name: 'Gadget',
                    items_quantity: 1,
                    items_price: 10
                }
            ]
        ;
        console.log(received);
        // expect(received).toEqual(expected);
    });
    it('should flat object to csv format', function () {
        const john = {id: 'jo', username: 'john'};
        const category = {name: 'android', parent: {name: 'mobile'}};
        const post = {
            id: 'tut',
            title: 'tutorial',
            author: john,
            category: category,
            roles: []
        };
        const expected = [
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile'
            }
        ];
        const received = flatten(post);
        // expect(received).toEqual(expected);
    });
    it('should flat object with array to csv format', function () {
        const roles = [
            {name: 'admin'},
            {name: 'moderator'}
        ]
        const comments = [
            {id: 'th', comment: 'thanks'},
            {id: 'wo', comment: 'wow'},
        ];

        const post = {
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow'
            }
        ];
        // expect(flatten(post)).toEqual(expected);
    });
    it('should flat nested object and array to csv format', function () {
        const john = {id: 'jo', username: 'john'};
        const category = {name: 'android', parent: {name: 'mobile'}};
        const roles = [{name: 'admin'}, {name: 'moderator'}]
        const comments = [
            {id: 'th', comment: 'thanks'},
            {id: 'wo', comment: 'wow'},
        ];
        const post = {
            id: 'tut',
            title: 'tutorial',
            author: john,
            category: category,
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks'
            },
            {
                id: 'tut',
                title: 'tutorial',
                author_id: 'jo',
                author_username: 'john',
                category_name: 'android',
                category_parent_name: 'mobile',
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow'
            }
        ];
        // expect(flatten(post)).toEqual(expected);
    });
    it('should flat nested array to csv format', function () {
        const roles = [{name: 'admin'}, {name: 'moderator'}]
        const categories = [{category: 'mobile'}, {category: 'web'}]
        const comments = [
            {
                id: 'th',
                comment: 'thanks',
                categories: categories
            },
            {
                id: 'wo',
                comment: 'wow',
                categories: categories
            },
        ];
        const post = {
            roles: roles,
            comments: comments,
        };
        const expected = [
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'admin',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'admin',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'moderator',
                comments_id: 'th',
                comments_comment: 'thanks',
                comments_categories_category: 'web'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'mobile'
            },
            {
                roles_name: 'moderator',
                comments_id: 'wo',
                comments_comment: 'wow',
                comments_categories_category: 'web'
            }
        ];
        // expect(flatten(post)).toEqual(expected);
    });
    it('should flat object with array of objects', function () {
        const object = {
            "id": "AGoPj2VUFU",
            "username": "zapote5bacoor@gmail.com",
            "password": "4053d03d9866b4e85ffc9545b8a3e49f",
            "createdAt": "2023-05-05T06:46:16.354Z",
            "updatedAt": "2023-05-05T06:46:16.354Z",
            "acl": {"read": ["AGoPj2VUFU", "*"], "write": ["AGoPj2VUFU"]},
            "roles": []
        };
        const expected = [
            {
                id: 'AGoPj2VUFU',
                username: 'zapote5bacoor@gmail.com',
                password: '4053d03d9866b4e85ffc9545b8a3e49f',
                createdAt: '2023-05-05T06:46:16.354Z',
                updatedAt: '2023-05-05T06:46:16.354Z',
                acl_read_0: 'AGoPj2VUFU',
                acl_read_1: '*',
                acl_write_0: 'AGoPj2VUFU',
            }
        ]
        const received = flatten(object);
        console.log(received);
        // expect(received).toEqual(expected);
    });
    it('should flat nested object', function () {
        const object = {
            "id": 1,
            "name": "John",
            "age": 30,
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "CA",
                "zip": "12345"
            },
            "orders": [
                {
                    "id": 1001,
                    "date": "2022-04-01",
                    "total": 50.0,
                    "items": [
                        {
                            "id": 1,
                            "name": "Widget",
                            "quantity": 2,
                            "price": 20.0
                        },
                        {
                            "id": 2,
                            "name": "Gadget",
                            "quantity": 1,
                            "price": 10.0
                        }
                    ]
                },
                {
                    "id": 1002,
                    "date": "2022-04-15",
                    "total": 25.0,
                    "items": [
                        {
                            "id": 3,
                            "name": "Thingamajig",
                            "quantity": 1,
                            "price": 25.0
                        }
                    ]
                }
            ]
        }
        const expected = [
            {
                "id": 1,
                "name": "John",
                "age": 30,
                "address.street": "123 Main St",
                "address.city": "Anytown",
                "address.state": "CA",
                "address.zip": "12345",
                "orders.id": 1001,
                "orders.date": "2022-04-01",
                "orders.total": 50,
                "orders.items.id": 1,
                "orders.items.name": "Widget",
                "orders.items.quantity": 2,
                "orders.items.price": 20
            },
            {
                "id": 1,
                "name": "John",
                "age": 30,
                "address.street": "123 Main St",
                "address.city": "Anytown",
                "address.state": "CA",
                "address.zip": "12345",
                "orders.id": 1001,
                "orders.date": "2022-04-01",
                "orders.total": 50,
                "orders.items.id": 2,
                "orders.items.name": "Gadget",
                "orders.items.quantity": 1,
                "orders.items.price": 10
            },
            {
                "id": 1,
                "name": "John",
                "age": 30,
                "address.street": "123 Main St",
                "address.city": "Anytown",
                "address.state": "CA",
                "address.zip": "12345",
                "orders.id": 1002,
                "orders.date": "2022-04-15",
                "orders.total": 25,
                "orders.items.id": 3,
                "orders.items.name": "Thingamajig",
                "orders.items.quantity": 1,
                "orders.items.price": 25
            }
        ];
        const received = flatten(object);
        console.log(received);
        // expect(received).toEqual(expected);
    });
});