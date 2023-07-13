import unflatten from '../unflatten';

describe('unflatten', function () {
    it('should un flatten object', function () {
        const flat = [
            {
                "id": "uIKPPLxBJq",
                "username": "johncarlo_franco@yahoo.com",
                "email": "johncarlo_franco@yahoo.com",
                "createdAt": "2023-04-02T07:23:46.514Z",
                "updatedAt": "2023-05-05T08:32:39.656Z",
                "acl_read": "uIKPPLxBJq",
                "acl_write": "uIKPPLxBJq",
                "roles_id": "4MU0iLuSH9",
                "roles_acl_read": "mym6W0VjeX",
                "roles_acl_write": "mym6W0VjeX",
                "roles_createdAt": "2023-02-24T08:04:56.080Z",
                "roles_name": "ADMIN",
                "roles_updatedAt": "2023-05-05T08:50:29.712Z"
            },
            {
                "id": "1G9CUK2ABJ",
                "username": "admin@cavite.com",
                "email": "admin@cavite.com",
                "createdAt": "2023-04-02T06:43:03.248Z",
                "updatedAt": "2023-05-05T08:50:29.705Z",
                "acl_read": "1G9CUK2ABJ",
                "acl_write": "1G9CUK2ABJ",
                "roles_id": "4MU0iLuSH9",
                "roles_acl_read": "mym6W0VjeX",
                "roles_acl_write": "mym6W0VjeX",
                "roles_createdAt": "2023-02-24T08:04:56.080Z",
                "roles_name": "ADMIN",
                "roles_updatedAt": "2023-05-05T08:50:29.712Z"
            }
        ];
        const received = unflatten(flat);
        const expected = [
            {
                "id": "uIKPPLxBJq",
                "username": "johncarlo_franco@yahoo.com",
                "email": "johncarlo_franco@yahoo.com",
                "password": "84febb9a056832da305660c03372f1f6",
                "createdAt": "2023-04-02T07:23:46.514Z",
                "updatedAt": "2023-05-05T08:32:39.656Z",
                "acl": {
                    "read": [
                        "uIKPPLxBJq",
                    ],
                    "write": [
                        "uIKPPLxBJq"
                    ]
                },
                "roles": [
                    {
                        "id": "4MU0iLuSH9",
                        "acl": {
                            "read": [
                                "mym6W0VjeX"
                            ],
                            "write": [
                                "mym6W0VjeX"
                            ]
                        },
                        "createdAt": "2023-02-24T08:04:56.080Z",
                        "name": "ADMIN",
                        "updatedAt": "2023-05-05T08:50:29.712Z"
                    }
                ]
            },
            {
                "id": "1G9CUK2ABJ",
                "username": "admin@cavite.com",
                "email": "admin@cavite.com",
                "password": "84febb9a056832da305660c03372f1f6",
                "createdAt": "2023-04-02T06:43:03.248Z",
                "updatedAt": "2023-05-05T08:50:29.705Z",
                "acl": {
                    "read": [
                        "1G9CUK2ABJ",
                    ],
                    "write": [
                        "1G9CUK2ABJ"
                    ]
                },
                "roles": [
                    {
                        "id": "4MU0iLuSH9",
                        "acl": {
                            "read": [
                                "mym6W0VjeX",
                            ],
                            "write": [
                                "mym6W0VjeX",
                            ]
                        },
                        "createdAt": "2023-02-24T08:04:56.080Z",
                        "name": "ADMIN",
                        "updatedAt": "2023-05-05T08:50:29.712Z"
                    }
                ]
            }
        ];
        console.log(received);
        console.log(JSON.stringify(received));
        // expect(received).toEqual(expected);


    });
});