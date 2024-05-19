/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_BookEditVO_ } from '../models/BaseResponse_BookEditVO_';
import type { BaseResponse_BookVO_ } from '../models/BaseResponse_BookVO_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Book_ } from '../models/BaseResponse_Page_Book_';
import type { BaseResponse_Page_BorrowVO_ } from '../models/BaseResponse_Page_BorrowVO_';
import type { BookAddRequest } from '../models/BookAddRequest';
import type { BookEditRequest } from '../models/BookEditRequest';
import type { BookQueryRequest } from '../models/BookQueryRequest';
import type { BookUpdateRequest } from '../models/BookUpdateRequest';
import type { BorrowAddRequest } from '../models/BorrowAddRequest';
import type { BorrowQueryRequest } from '../models/BorrowQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookControllerService {

    /**
     * addBook
     * @param bookAddRequest bookAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addBookUsingPost(
bookAddRequest: BookAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/add',
            body: bookAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * doBorrow
     * @param borrowAddRequest borrowAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doBorrowUsingPost(
borrowAddRequest: BorrowAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/borrow/do',
            body: borrowAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listBorrowByPage
     * @param borrowQueryRequest borrowQueryRequest
     * @returns BaseResponse_Page_BorrowVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listBorrowByPageUsingPost(
borrowQueryRequest: BorrowQueryRequest,
): CancelablePromise<BaseResponse_Page_BorrowVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/borrow/list/page',
            body: borrowQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * returnBook
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static returnBookUsingPost(
id?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/borrow/return',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteBook
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteBookUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * editBook
     * @param bookEditRequest bookEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editBookUsingPost(
bookEditRequest: BookEditRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/edit',
            body: bookEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getBookEditVOById
     * @param id id
     * @returns BaseResponse_BookEditVO_ OK
     * @throws ApiError
     */
    public static getBookEditVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_BookEditVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/book/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getBookVOById
     * @param id id
     * @returns BaseResponse_BookVO_ OK
     * @throws ApiError
     */
    public static getBookVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_BookVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/book/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listBookByPage
     * @param bookQueryRequest bookQueryRequest
     * @returns BaseResponse_Page_Book_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listBookByPageUsingPost(
bookQueryRequest: BookQueryRequest,
): CancelablePromise<BaseResponse_Page_Book_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/list/page',
            body: bookQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * offShelfBook
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offShelfBookUsingPost(
id?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/offshelf',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateBook
     * @param bookUpdateRequest bookUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateBookUsingPost(
bookUpdateRequest: BookUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/book/update',
            body: bookUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
