/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookVO } from './BookVO';
import type { UserVO } from './UserVO';

export type BorrowVO = {
    bookId?: number;
    bookVO?: BookVO;
    borrowDate?: string;
    id?: number;
    isDelete?: number;
    isReturned?: number;
    returnDate?: string;
    userId?: number;
    userVO?: UserVO;
};
