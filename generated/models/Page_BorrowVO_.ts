/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BorrowVO } from './BorrowVO';
import type { OrderItem } from './OrderItem';

export type Page_BorrowVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<BorrowVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
