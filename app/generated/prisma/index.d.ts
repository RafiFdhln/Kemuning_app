
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model Inquiry
 * 
 */
export type Inquiry = $Result.DefaultSelection<Prisma.$InquiryPayload>
/**
 * Model InquiryItem
 * 
 */
export type InquiryItem = $Result.DefaultSelection<Prisma.$InquiryItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ItemType: {
  GOODS: 'GOODS',
  SERVICE: 'SERVICE'
};

export type ItemType = (typeof ItemType)[keyof typeof ItemType]


export const InquiryStatus: {
  PENDING: 'PENDING',
  QUOTED: 'QUOTED',
  ORDERED: 'ORDERED',
  DELIVERED: 'DELIVERED'
};

export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus]

}

export type ItemType = $Enums.ItemType

export const ItemType: typeof $Enums.ItemType

export type InquiryStatus = $Enums.InquiryStatus

export const InquiryStatus: typeof $Enums.InquiryStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Items
 * const items = await prisma.item.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Items
   * const items = await prisma.item.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquiry`: Exposes CRUD operations for the **Inquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inquiries
    * const inquiries = await prisma.inquiry.findMany()
    * ```
    */
  get inquiry(): Prisma.InquiryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquiryItem`: Exposes CRUD operations for the **InquiryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InquiryItems
    * const inquiryItems = await prisma.inquiryItem.findMany()
    * ```
    */
  get inquiryItem(): Prisma.InquiryItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Item: 'Item',
    Customer: 'Customer',
    Supplier: 'Supplier',
    Inquiry: 'Inquiry',
    InquiryItem: 'InquiryItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "item" | "customer" | "supplier" | "inquiry" | "inquiryItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      Inquiry: {
        payload: Prisma.$InquiryPayload<ExtArgs>
        fields: Prisma.InquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findFirst: {
            args: Prisma.InquiryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findMany: {
            args: Prisma.InquiryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          create: {
            args: Prisma.InquiryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          createMany: {
            args: Prisma.InquiryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InquiryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          update: {
            args: Prisma.InquiryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          deleteMany: {
            args: Prisma.InquiryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InquiryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          aggregate: {
            args: Prisma.InquiryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquiry>
          }
          groupBy: {
            args: Prisma.InquiryGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryCountArgs<ExtArgs>
            result: $Utils.Optional<InquiryCountAggregateOutputType> | number
          }
        }
      }
      InquiryItem: {
        payload: Prisma.$InquiryItemPayload<ExtArgs>
        fields: Prisma.InquiryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          findFirst: {
            args: Prisma.InquiryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          findMany: {
            args: Prisma.InquiryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>[]
          }
          create: {
            args: Prisma.InquiryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          createMany: {
            args: Prisma.InquiryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InquiryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          update: {
            args: Prisma.InquiryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          deleteMany: {
            args: Prisma.InquiryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InquiryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryItemPayload>
          }
          aggregate: {
            args: Prisma.InquiryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquiryItem>
          }
          groupBy: {
            args: Prisma.InquiryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquiryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryItemCountArgs<ExtArgs>
            result: $Utils.Optional<InquiryItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    item?: ItemOmit
    customer?: CustomerOmit
    supplier?: SupplierOmit
    inquiry?: InquiryOmit
    inquiryItem?: InquiryItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    inquiryItems: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiryItems?: boolean | ItemCountOutputTypeCountInquiryItemsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountInquiryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryItemWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    inquiries: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiries?: boolean | CustomerCountOutputTypeCountInquiriesArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountInquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    inquiryItems: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiryItems?: boolean | SupplierCountOutputTypeCountInquiryItemsArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountInquiryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryItemWhereInput
  }


  /**
   * Count Type InquiryCountOutputType
   */

  export type InquiryCountOutputType = {
    items: number
  }

  export type InquiryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | InquiryCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryCountOutputType
     */
    select?: InquiryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ItemSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    brand: string | null
    type: $Enums.ItemType | null
    unit: string | null
    price: Decimal | null
    remarks: string | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    brand: string | null
    type: $Enums.ItemType | null
    unit: string | null
    price: Decimal | null
    remarks: string | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    code: number
    name: number
    brand: number
    type: number
    unit: number
    price: number
    remarks: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    price?: true
  }

  export type ItemSumAggregateInputType = {
    price?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    brand?: true
    type?: true
    unit?: true
    price?: true
    remarks?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    brand?: true
    type?: true
    unit?: true
    price?: true
    remarks?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    brand?: true
    type?: true
    unit?: true
    price?: true
    remarks?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    code: string
    name: string
    brand: string | null
    type: $Enums.ItemType
    unit: string | null
    price: Decimal | null
    remarks: string | null
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    brand?: boolean
    type?: boolean
    unit?: boolean
    price?: boolean
    remarks?: boolean
    inquiryItems?: boolean | Item$inquiryItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>



  export type ItemSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    brand?: boolean
    type?: boolean
    unit?: boolean
    price?: boolean
    remarks?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "brand" | "type" | "unit" | "price" | "remarks", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiryItems?: boolean | Item$inquiryItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      inquiryItems: Prisma.$InquiryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      brand: string | null
      type: $Enums.ItemType
      unit: string | null
      price: Prisma.Decimal | null
      remarks: string | null
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquiryItems<T extends Item$inquiryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Item$inquiryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly code: FieldRef<"Item", 'String'>
    readonly name: FieldRef<"Item", 'String'>
    readonly brand: FieldRef<"Item", 'String'>
    readonly type: FieldRef<"Item", 'ItemType'>
    readonly unit: FieldRef<"Item", 'String'>
    readonly price: FieldRef<"Item", 'Decimal'>
    readonly remarks: FieldRef<"Item", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item.inquiryItems
   */
  export type Item$inquiryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    where?: InquiryItemWhereInput
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    cursor?: InquiryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    npwp: string | null
    address: string | null
    remarks: string | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    npwp: string | null
    address: string | null
    remarks: string | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    code: number
    name: number
    npwp: number
    address: number
    remarks: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    code: string
    name: string
    npwp: string | null
    address: string | null
    remarks: string | null
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    npwp?: boolean
    address?: boolean
    remarks?: boolean
    inquiries?: boolean | Customer$inquiriesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>



  export type CustomerSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    npwp?: boolean
    address?: boolean
    remarks?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "npwp" | "address" | "remarks", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiries?: boolean | Customer$inquiriesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      inquiries: Prisma.$InquiryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      npwp: string | null
      address: string | null
      remarks: string | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquiries<T extends Customer$inquiriesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$inquiriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly code: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly npwp: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly remarks: FieldRef<"Customer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.inquiries
   */
  export type Customer$inquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    cursor?: InquiryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    npwp: string | null
    address: string | null
    remarks: string | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    npwp: string | null
    address: string | null
    remarks: string | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    code: number
    name: number
    npwp: number
    address: number
    remarks: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    npwp?: true
    address?: true
    remarks?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    code: string
    name: string
    npwp: string | null
    address: string | null
    remarks: string | null
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    npwp?: boolean
    address?: boolean
    remarks?: boolean
    inquiryItems?: boolean | Supplier$inquiryItemsArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>



  export type SupplierSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    npwp?: boolean
    address?: boolean
    remarks?: boolean
  }

  export type SupplierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "npwp" | "address" | "remarks", ExtArgs["result"]["supplier"]>
  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiryItems?: boolean | Supplier$inquiryItemsArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      inquiryItems: Prisma.$InquiryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      npwp: string | null
      address: string | null
      remarks: string | null
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquiryItems<T extends Supplier$inquiryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$inquiryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supplier model
   */
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly code: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly npwp: FieldRef<"Supplier", 'String'>
    readonly address: FieldRef<"Supplier", 'String'>
    readonly remarks: FieldRef<"Supplier", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to delete.
     */
    limit?: number
  }

  /**
   * Supplier.inquiryItems
   */
  export type Supplier$inquiryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    where?: InquiryItemWhereInput
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    cursor?: InquiryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model Inquiry
   */

  export type AggregateInquiry = {
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  export type InquiryMinAggregateOutputType = {
    id: string | null
    requestNumber: string | null
    requestDate: Date | null
    customerId: string | null
    status: $Enums.InquiryStatus | null
    remarks: string | null
    noQuotation: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InquiryMaxAggregateOutputType = {
    id: string | null
    requestNumber: string | null
    requestDate: Date | null
    customerId: string | null
    status: $Enums.InquiryStatus | null
    remarks: string | null
    noQuotation: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InquiryCountAggregateOutputType = {
    id: number
    requestNumber: number
    requestDate: number
    customerId: number
    status: number
    remarks: number
    noQuotation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InquiryMinAggregateInputType = {
    id?: true
    requestNumber?: true
    requestDate?: true
    customerId?: true
    status?: true
    remarks?: true
    noQuotation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InquiryMaxAggregateInputType = {
    id?: true
    requestNumber?: true
    requestDate?: true
    customerId?: true
    status?: true
    remarks?: true
    noQuotation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InquiryCountAggregateInputType = {
    id?: true
    requestNumber?: true
    requestDate?: true
    customerId?: true
    status?: true
    remarks?: true
    noQuotation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiry to aggregate.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inquiries
    **/
    _count?: true | InquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryMaxAggregateInputType
  }

  export type GetInquiryAggregateType<T extends InquiryAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiry[P]>
      : GetScalarType<T[P], AggregateInquiry[P]>
  }




  export type InquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithAggregationInput | InquiryOrderByWithAggregationInput[]
    by: InquiryScalarFieldEnum[] | InquiryScalarFieldEnum
    having?: InquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryCountAggregateInputType | true
    _min?: InquiryMinAggregateInputType
    _max?: InquiryMaxAggregateInputType
  }

  export type InquiryGroupByOutputType = {
    id: string
    requestNumber: string | null
    requestDate: Date
    customerId: string
    status: $Enums.InquiryStatus
    remarks: string | null
    noQuotation: boolean
    createdAt: Date
    updatedAt: Date
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  type GetInquiryGroupByPayload<T extends InquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryGroupByOutputType[P]>
        }
      >
    >


  export type InquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestNumber?: boolean
    requestDate?: boolean
    customerId?: boolean
    status?: boolean
    remarks?: boolean
    noQuotation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | Inquiry$itemsArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inquiry"]>



  export type InquirySelectScalar = {
    id?: boolean
    requestNumber?: boolean
    requestDate?: boolean
    customerId?: boolean
    status?: boolean
    remarks?: boolean
    noQuotation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InquiryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestNumber" | "requestDate" | "customerId" | "status" | "remarks" | "noQuotation" | "createdAt" | "updatedAt", ExtArgs["result"]["inquiry"]>
  export type InquiryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | Inquiry$itemsArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inquiry"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      items: Prisma.$InquiryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestNumber: string | null
      requestDate: Date
      customerId: string
      status: $Enums.InquiryStatus
      remarks: string | null
      noQuotation: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inquiry"]>
    composites: {}
  }

  type InquiryGetPayload<S extends boolean | null | undefined | InquiryDefaultArgs> = $Result.GetResult<Prisma.$InquiryPayload, S>

  type InquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquiryCountAggregateInputType | true
    }

  export interface InquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inquiry'], meta: { name: 'Inquiry' } }
    /**
     * Find zero or one Inquiry that matches the filter.
     * @param {InquiryFindUniqueArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquiryFindUniqueArgs>(args: SelectSubset<T, InquiryFindUniqueArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inquiry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquiryFindUniqueOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquiryFindUniqueOrThrowArgs>(args: SelectSubset<T, InquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquiryFindFirstArgs>(args?: SelectSubset<T, InquiryFindFirstArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquiryFindFirstOrThrowArgs>(args?: SelectSubset<T, InquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inquiries
     * const inquiries = await prisma.inquiry.findMany()
     * 
     * // Get first 10 Inquiries
     * const inquiries = await prisma.inquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquiryFindManyArgs>(args?: SelectSubset<T, InquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inquiry.
     * @param {InquiryCreateArgs} args - Arguments to create a Inquiry.
     * @example
     * // Create one Inquiry
     * const Inquiry = await prisma.inquiry.create({
     *   data: {
     *     // ... data to create a Inquiry
     *   }
     * })
     * 
     */
    create<T extends InquiryCreateArgs>(args: SelectSubset<T, InquiryCreateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inquiries.
     * @param {InquiryCreateManyArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquiryCreateManyArgs>(args?: SelectSubset<T, InquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Inquiry.
     * @param {InquiryDeleteArgs} args - Arguments to delete one Inquiry.
     * @example
     * // Delete one Inquiry
     * const Inquiry = await prisma.inquiry.delete({
     *   where: {
     *     // ... filter to delete one Inquiry
     *   }
     * })
     * 
     */
    delete<T extends InquiryDeleteArgs>(args: SelectSubset<T, InquiryDeleteArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inquiry.
     * @param {InquiryUpdateArgs} args - Arguments to update one Inquiry.
     * @example
     * // Update one Inquiry
     * const inquiry = await prisma.inquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquiryUpdateArgs>(args: SelectSubset<T, InquiryUpdateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inquiries.
     * @param {InquiryDeleteManyArgs} args - Arguments to filter Inquiries to delete.
     * @example
     * // Delete a few Inquiries
     * const { count } = await prisma.inquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquiryDeleteManyArgs>(args?: SelectSubset<T, InquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquiryUpdateManyArgs>(args: SelectSubset<T, InquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Inquiry.
     * @param {InquiryUpsertArgs} args - Arguments to update or create a Inquiry.
     * @example
     * // Update or create a Inquiry
     * const inquiry = await prisma.inquiry.upsert({
     *   create: {
     *     // ... data to create a Inquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inquiry we want to update
     *   }
     * })
     */
    upsert<T extends InquiryUpsertArgs>(args: SelectSubset<T, InquiryUpsertArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryCountArgs} args - Arguments to filter Inquiries to count.
     * @example
     * // Count the number of Inquiries
     * const count = await prisma.inquiry.count({
     *   where: {
     *     // ... the filter for the Inquiries we want to count
     *   }
     * })
    **/
    count<T extends InquiryCountArgs>(
      args?: Subset<T, InquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquiryAggregateArgs>(args: Subset<T, InquiryAggregateArgs>): Prisma.PrismaPromise<GetInquiryAggregateType<T>>

    /**
     * Group by Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryGroupByArgs['orderBy'] }
        : { orderBy?: InquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inquiry model
   */
  readonly fields: InquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Inquiry$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Inquiry$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inquiry model
   */
  interface InquiryFieldRefs {
    readonly id: FieldRef<"Inquiry", 'String'>
    readonly requestNumber: FieldRef<"Inquiry", 'String'>
    readonly requestDate: FieldRef<"Inquiry", 'DateTime'>
    readonly customerId: FieldRef<"Inquiry", 'String'>
    readonly status: FieldRef<"Inquiry", 'InquiryStatus'>
    readonly remarks: FieldRef<"Inquiry", 'String'>
    readonly noQuotation: FieldRef<"Inquiry", 'Boolean'>
    readonly createdAt: FieldRef<"Inquiry", 'DateTime'>
    readonly updatedAt: FieldRef<"Inquiry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inquiry findUnique
   */
  export type InquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findUniqueOrThrow
   */
  export type InquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findFirst
   */
  export type InquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findFirstOrThrow
   */
  export type InquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findMany
   */
  export type InquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiries to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry create
   */
  export type InquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to create a Inquiry.
     */
    data: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
  }

  /**
   * Inquiry createMany
   */
  export type InquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry update
   */
  export type InquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to update a Inquiry.
     */
    data: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
    /**
     * Choose, which Inquiry to update.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry updateMany
   */
  export type InquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to update.
     */
    limit?: number
  }

  /**
   * Inquiry upsert
   */
  export type InquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The filter to search for the Inquiry to update in case it exists.
     */
    where: InquiryWhereUniqueInput
    /**
     * In case the Inquiry found by the `where` argument doesn't exist, create a new Inquiry with this data.
     */
    create: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
    /**
     * In case the Inquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
  }

  /**
   * Inquiry delete
   */
  export type InquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter which Inquiry to delete.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry deleteMany
   */
  export type InquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiries to delete
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to delete.
     */
    limit?: number
  }

  /**
   * Inquiry.items
   */
  export type Inquiry$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    where?: InquiryItemWhereInput
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    cursor?: InquiryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * Inquiry without action
   */
  export type InquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
  }


  /**
   * Model InquiryItem
   */

  export type AggregateInquiryItem = {
    _count: InquiryItemCountAggregateOutputType | null
    _avg: InquiryItemAvgAggregateOutputType | null
    _sum: InquiryItemSumAggregateOutputType | null
    _min: InquiryItemMinAggregateOutputType | null
    _max: InquiryItemMaxAggregateOutputType | null
  }

  export type InquiryItemAvgAggregateOutputType = {
    qty: number | null
    hpp: Decimal | null
    markupPercent: Decimal | null
    priceAfterUp: Decimal | null
    sellingPrice: Decimal | null
    totalPrice: Decimal | null
    poPrice: Decimal | null
  }

  export type InquiryItemSumAggregateOutputType = {
    qty: number | null
    hpp: Decimal | null
    markupPercent: Decimal | null
    priceAfterUp: Decimal | null
    sellingPrice: Decimal | null
    totalPrice: Decimal | null
    poPrice: Decimal | null
  }

  export type InquiryItemMinAggregateOutputType = {
    id: string | null
    inquiryId: string | null
    supplierId: string | null
    itemId: string | null
    name: string | null
    brand: string | null
    status: string | null
    qty: number | null
    unit: string | null
    hpp: Decimal | null
    markupPercent: Decimal | null
    priceAfterUp: Decimal | null
    sellingPrice: Decimal | null
    totalPrice: Decimal | null
    poPrice: Decimal | null
    notes: string | null
    deliveryTime: Date | null
  }

  export type InquiryItemMaxAggregateOutputType = {
    id: string | null
    inquiryId: string | null
    supplierId: string | null
    itemId: string | null
    name: string | null
    brand: string | null
    status: string | null
    qty: number | null
    unit: string | null
    hpp: Decimal | null
    markupPercent: Decimal | null
    priceAfterUp: Decimal | null
    sellingPrice: Decimal | null
    totalPrice: Decimal | null
    poPrice: Decimal | null
    notes: string | null
    deliveryTime: Date | null
  }

  export type InquiryItemCountAggregateOutputType = {
    id: number
    inquiryId: number
    supplierId: number
    itemId: number
    name: number
    brand: number
    status: number
    qty: number
    unit: number
    hpp: number
    markupPercent: number
    priceAfterUp: number
    sellingPrice: number
    totalPrice: number
    poPrice: number
    notes: number
    deliveryTime: number
    _all: number
  }


  export type InquiryItemAvgAggregateInputType = {
    qty?: true
    hpp?: true
    markupPercent?: true
    priceAfterUp?: true
    sellingPrice?: true
    totalPrice?: true
    poPrice?: true
  }

  export type InquiryItemSumAggregateInputType = {
    qty?: true
    hpp?: true
    markupPercent?: true
    priceAfterUp?: true
    sellingPrice?: true
    totalPrice?: true
    poPrice?: true
  }

  export type InquiryItemMinAggregateInputType = {
    id?: true
    inquiryId?: true
    supplierId?: true
    itemId?: true
    name?: true
    brand?: true
    status?: true
    qty?: true
    unit?: true
    hpp?: true
    markupPercent?: true
    priceAfterUp?: true
    sellingPrice?: true
    totalPrice?: true
    poPrice?: true
    notes?: true
    deliveryTime?: true
  }

  export type InquiryItemMaxAggregateInputType = {
    id?: true
    inquiryId?: true
    supplierId?: true
    itemId?: true
    name?: true
    brand?: true
    status?: true
    qty?: true
    unit?: true
    hpp?: true
    markupPercent?: true
    priceAfterUp?: true
    sellingPrice?: true
    totalPrice?: true
    poPrice?: true
    notes?: true
    deliveryTime?: true
  }

  export type InquiryItemCountAggregateInputType = {
    id?: true
    inquiryId?: true
    supplierId?: true
    itemId?: true
    name?: true
    brand?: true
    status?: true
    qty?: true
    unit?: true
    hpp?: true
    markupPercent?: true
    priceAfterUp?: true
    sellingPrice?: true
    totalPrice?: true
    poPrice?: true
    notes?: true
    deliveryTime?: true
    _all?: true
  }

  export type InquiryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryItem to aggregate.
     */
    where?: InquiryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryItems to fetch.
     */
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InquiryItems
    **/
    _count?: true | InquiryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InquiryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InquiryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryItemMaxAggregateInputType
  }

  export type GetInquiryItemAggregateType<T extends InquiryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiryItem[P]>
      : GetScalarType<T[P], AggregateInquiryItem[P]>
  }




  export type InquiryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryItemWhereInput
    orderBy?: InquiryItemOrderByWithAggregationInput | InquiryItemOrderByWithAggregationInput[]
    by: InquiryItemScalarFieldEnum[] | InquiryItemScalarFieldEnum
    having?: InquiryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryItemCountAggregateInputType | true
    _avg?: InquiryItemAvgAggregateInputType
    _sum?: InquiryItemSumAggregateInputType
    _min?: InquiryItemMinAggregateInputType
    _max?: InquiryItemMaxAggregateInputType
  }

  export type InquiryItemGroupByOutputType = {
    id: string
    inquiryId: string
    supplierId: string | null
    itemId: string | null
    name: string
    brand: string | null
    status: string | null
    qty: number
    unit: string | null
    hpp: Decimal | null
    markupPercent: Decimal | null
    priceAfterUp: Decimal | null
    sellingPrice: Decimal | null
    totalPrice: Decimal | null
    poPrice: Decimal | null
    notes: string | null
    deliveryTime: Date | null
    _count: InquiryItemCountAggregateOutputType | null
    _avg: InquiryItemAvgAggregateOutputType | null
    _sum: InquiryItemSumAggregateOutputType | null
    _min: InquiryItemMinAggregateOutputType | null
    _max: InquiryItemMaxAggregateOutputType | null
  }

  type GetInquiryItemGroupByPayload<T extends InquiryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryItemGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryItemGroupByOutputType[P]>
        }
      >
    >


  export type InquiryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquiryId?: boolean
    supplierId?: boolean
    itemId?: boolean
    name?: boolean
    brand?: boolean
    status?: boolean
    qty?: boolean
    unit?: boolean
    hpp?: boolean
    markupPercent?: boolean
    priceAfterUp?: boolean
    sellingPrice?: boolean
    totalPrice?: boolean
    poPrice?: boolean
    notes?: boolean
    deliveryTime?: boolean
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    supplier?: boolean | InquiryItem$supplierArgs<ExtArgs>
    item?: boolean | InquiryItem$itemArgs<ExtArgs>
  }, ExtArgs["result"]["inquiryItem"]>



  export type InquiryItemSelectScalar = {
    id?: boolean
    inquiryId?: boolean
    supplierId?: boolean
    itemId?: boolean
    name?: boolean
    brand?: boolean
    status?: boolean
    qty?: boolean
    unit?: boolean
    hpp?: boolean
    markupPercent?: boolean
    priceAfterUp?: boolean
    sellingPrice?: boolean
    totalPrice?: boolean
    poPrice?: boolean
    notes?: boolean
    deliveryTime?: boolean
  }

  export type InquiryItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inquiryId" | "supplierId" | "itemId" | "name" | "brand" | "status" | "qty" | "unit" | "hpp" | "markupPercent" | "priceAfterUp" | "sellingPrice" | "totalPrice" | "poPrice" | "notes" | "deliveryTime", ExtArgs["result"]["inquiryItem"]>
  export type InquiryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    supplier?: boolean | InquiryItem$supplierArgs<ExtArgs>
    item?: boolean | InquiryItem$itemArgs<ExtArgs>
  }

  export type $InquiryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InquiryItem"
    objects: {
      inquiry: Prisma.$InquiryPayload<ExtArgs>
      supplier: Prisma.$SupplierPayload<ExtArgs> | null
      item: Prisma.$ItemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inquiryId: string
      supplierId: string | null
      itemId: string | null
      name: string
      brand: string | null
      status: string | null
      qty: number
      unit: string | null
      hpp: Prisma.Decimal | null
      markupPercent: Prisma.Decimal | null
      priceAfterUp: Prisma.Decimal | null
      sellingPrice: Prisma.Decimal | null
      totalPrice: Prisma.Decimal | null
      poPrice: Prisma.Decimal | null
      notes: string | null
      deliveryTime: Date | null
    }, ExtArgs["result"]["inquiryItem"]>
    composites: {}
  }

  type InquiryItemGetPayload<S extends boolean | null | undefined | InquiryItemDefaultArgs> = $Result.GetResult<Prisma.$InquiryItemPayload, S>

  type InquiryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquiryItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquiryItemCountAggregateInputType | true
    }

  export interface InquiryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InquiryItem'], meta: { name: 'InquiryItem' } }
    /**
     * Find zero or one InquiryItem that matches the filter.
     * @param {InquiryItemFindUniqueArgs} args - Arguments to find a InquiryItem
     * @example
     * // Get one InquiryItem
     * const inquiryItem = await prisma.inquiryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquiryItemFindUniqueArgs>(args: SelectSubset<T, InquiryItemFindUniqueArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InquiryItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquiryItemFindUniqueOrThrowArgs} args - Arguments to find a InquiryItem
     * @example
     * // Get one InquiryItem
     * const inquiryItem = await prisma.inquiryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquiryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InquiryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InquiryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemFindFirstArgs} args - Arguments to find a InquiryItem
     * @example
     * // Get one InquiryItem
     * const inquiryItem = await prisma.inquiryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquiryItemFindFirstArgs>(args?: SelectSubset<T, InquiryItemFindFirstArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InquiryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemFindFirstOrThrowArgs} args - Arguments to find a InquiryItem
     * @example
     * // Get one InquiryItem
     * const inquiryItem = await prisma.inquiryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquiryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InquiryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InquiryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InquiryItems
     * const inquiryItems = await prisma.inquiryItem.findMany()
     * 
     * // Get first 10 InquiryItems
     * const inquiryItems = await prisma.inquiryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryItemWithIdOnly = await prisma.inquiryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquiryItemFindManyArgs>(args?: SelectSubset<T, InquiryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InquiryItem.
     * @param {InquiryItemCreateArgs} args - Arguments to create a InquiryItem.
     * @example
     * // Create one InquiryItem
     * const InquiryItem = await prisma.inquiryItem.create({
     *   data: {
     *     // ... data to create a InquiryItem
     *   }
     * })
     * 
     */
    create<T extends InquiryItemCreateArgs>(args: SelectSubset<T, InquiryItemCreateArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InquiryItems.
     * @param {InquiryItemCreateManyArgs} args - Arguments to create many InquiryItems.
     * @example
     * // Create many InquiryItems
     * const inquiryItem = await prisma.inquiryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquiryItemCreateManyArgs>(args?: SelectSubset<T, InquiryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InquiryItem.
     * @param {InquiryItemDeleteArgs} args - Arguments to delete one InquiryItem.
     * @example
     * // Delete one InquiryItem
     * const InquiryItem = await prisma.inquiryItem.delete({
     *   where: {
     *     // ... filter to delete one InquiryItem
     *   }
     * })
     * 
     */
    delete<T extends InquiryItemDeleteArgs>(args: SelectSubset<T, InquiryItemDeleteArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InquiryItem.
     * @param {InquiryItemUpdateArgs} args - Arguments to update one InquiryItem.
     * @example
     * // Update one InquiryItem
     * const inquiryItem = await prisma.inquiryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquiryItemUpdateArgs>(args: SelectSubset<T, InquiryItemUpdateArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InquiryItems.
     * @param {InquiryItemDeleteManyArgs} args - Arguments to filter InquiryItems to delete.
     * @example
     * // Delete a few InquiryItems
     * const { count } = await prisma.inquiryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquiryItemDeleteManyArgs>(args?: SelectSubset<T, InquiryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InquiryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InquiryItems
     * const inquiryItem = await prisma.inquiryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquiryItemUpdateManyArgs>(args: SelectSubset<T, InquiryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InquiryItem.
     * @param {InquiryItemUpsertArgs} args - Arguments to update or create a InquiryItem.
     * @example
     * // Update or create a InquiryItem
     * const inquiryItem = await prisma.inquiryItem.upsert({
     *   create: {
     *     // ... data to create a InquiryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InquiryItem we want to update
     *   }
     * })
     */
    upsert<T extends InquiryItemUpsertArgs>(args: SelectSubset<T, InquiryItemUpsertArgs<ExtArgs>>): Prisma__InquiryItemClient<$Result.GetResult<Prisma.$InquiryItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InquiryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemCountArgs} args - Arguments to filter InquiryItems to count.
     * @example
     * // Count the number of InquiryItems
     * const count = await prisma.inquiryItem.count({
     *   where: {
     *     // ... the filter for the InquiryItems we want to count
     *   }
     * })
    **/
    count<T extends InquiryItemCountArgs>(
      args?: Subset<T, InquiryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InquiryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquiryItemAggregateArgs>(args: Subset<T, InquiryItemAggregateArgs>): Prisma.PrismaPromise<GetInquiryItemAggregateType<T>>

    /**
     * Group by InquiryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquiryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryItemGroupByArgs['orderBy'] }
        : { orderBy?: InquiryItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquiryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InquiryItem model
   */
  readonly fields: InquiryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InquiryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquiry<T extends InquiryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InquiryDefaultArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    supplier<T extends InquiryItem$supplierArgs<ExtArgs> = {}>(args?: Subset<T, InquiryItem$supplierArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item<T extends InquiryItem$itemArgs<ExtArgs> = {}>(args?: Subset<T, InquiryItem$itemArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InquiryItem model
   */
  interface InquiryItemFieldRefs {
    readonly id: FieldRef<"InquiryItem", 'String'>
    readonly inquiryId: FieldRef<"InquiryItem", 'String'>
    readonly supplierId: FieldRef<"InquiryItem", 'String'>
    readonly itemId: FieldRef<"InquiryItem", 'String'>
    readonly name: FieldRef<"InquiryItem", 'String'>
    readonly brand: FieldRef<"InquiryItem", 'String'>
    readonly status: FieldRef<"InquiryItem", 'String'>
    readonly qty: FieldRef<"InquiryItem", 'Int'>
    readonly unit: FieldRef<"InquiryItem", 'String'>
    readonly hpp: FieldRef<"InquiryItem", 'Decimal'>
    readonly markupPercent: FieldRef<"InquiryItem", 'Decimal'>
    readonly priceAfterUp: FieldRef<"InquiryItem", 'Decimal'>
    readonly sellingPrice: FieldRef<"InquiryItem", 'Decimal'>
    readonly totalPrice: FieldRef<"InquiryItem", 'Decimal'>
    readonly poPrice: FieldRef<"InquiryItem", 'Decimal'>
    readonly notes: FieldRef<"InquiryItem", 'String'>
    readonly deliveryTime: FieldRef<"InquiryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InquiryItem findUnique
   */
  export type InquiryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter, which InquiryItem to fetch.
     */
    where: InquiryItemWhereUniqueInput
  }

  /**
   * InquiryItem findUniqueOrThrow
   */
  export type InquiryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter, which InquiryItem to fetch.
     */
    where: InquiryItemWhereUniqueInput
  }

  /**
   * InquiryItem findFirst
   */
  export type InquiryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter, which InquiryItem to fetch.
     */
    where?: InquiryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryItems to fetch.
     */
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryItems.
     */
    cursor?: InquiryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryItems.
     */
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * InquiryItem findFirstOrThrow
   */
  export type InquiryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter, which InquiryItem to fetch.
     */
    where?: InquiryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryItems to fetch.
     */
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryItems.
     */
    cursor?: InquiryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryItems.
     */
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * InquiryItem findMany
   */
  export type InquiryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter, which InquiryItems to fetch.
     */
    where?: InquiryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryItems to fetch.
     */
    orderBy?: InquiryItemOrderByWithRelationInput | InquiryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InquiryItems.
     */
    cursor?: InquiryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryItems.
     */
    skip?: number
    distinct?: InquiryItemScalarFieldEnum | InquiryItemScalarFieldEnum[]
  }

  /**
   * InquiryItem create
   */
  export type InquiryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InquiryItem.
     */
    data: XOR<InquiryItemCreateInput, InquiryItemUncheckedCreateInput>
  }

  /**
   * InquiryItem createMany
   */
  export type InquiryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InquiryItems.
     */
    data: InquiryItemCreateManyInput | InquiryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InquiryItem update
   */
  export type InquiryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InquiryItem.
     */
    data: XOR<InquiryItemUpdateInput, InquiryItemUncheckedUpdateInput>
    /**
     * Choose, which InquiryItem to update.
     */
    where: InquiryItemWhereUniqueInput
  }

  /**
   * InquiryItem updateMany
   */
  export type InquiryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InquiryItems.
     */
    data: XOR<InquiryItemUpdateManyMutationInput, InquiryItemUncheckedUpdateManyInput>
    /**
     * Filter which InquiryItems to update
     */
    where?: InquiryItemWhereInput
    /**
     * Limit how many InquiryItems to update.
     */
    limit?: number
  }

  /**
   * InquiryItem upsert
   */
  export type InquiryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InquiryItem to update in case it exists.
     */
    where: InquiryItemWhereUniqueInput
    /**
     * In case the InquiryItem found by the `where` argument doesn't exist, create a new InquiryItem with this data.
     */
    create: XOR<InquiryItemCreateInput, InquiryItemUncheckedCreateInput>
    /**
     * In case the InquiryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryItemUpdateInput, InquiryItemUncheckedUpdateInput>
  }

  /**
   * InquiryItem delete
   */
  export type InquiryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
    /**
     * Filter which InquiryItem to delete.
     */
    where: InquiryItemWhereUniqueInput
  }

  /**
   * InquiryItem deleteMany
   */
  export type InquiryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryItems to delete
     */
    where?: InquiryItemWhereInput
    /**
     * Limit how many InquiryItems to delete.
     */
    limit?: number
  }

  /**
   * InquiryItem.supplier
   */
  export type InquiryItem$supplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    where?: SupplierWhereInput
  }

  /**
   * InquiryItem.item
   */
  export type InquiryItem$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
  }

  /**
   * InquiryItem without action
   */
  export type InquiryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryItem
     */
    select?: InquiryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryItem
     */
    omit?: InquiryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ItemScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    brand: 'brand',
    type: 'type',
    unit: 'unit',
    price: 'price',
    remarks: 'remarks'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    npwp: 'npwp',
    address: 'address',
    remarks: 'remarks'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    npwp: 'npwp',
    address: 'address',
    remarks: 'remarks'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const InquiryScalarFieldEnum: {
    id: 'id',
    requestNumber: 'requestNumber',
    requestDate: 'requestDate',
    customerId: 'customerId',
    status: 'status',
    remarks: 'remarks',
    noQuotation: 'noQuotation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InquiryScalarFieldEnum = (typeof InquiryScalarFieldEnum)[keyof typeof InquiryScalarFieldEnum]


  export const InquiryItemScalarFieldEnum: {
    id: 'id',
    inquiryId: 'inquiryId',
    supplierId: 'supplierId',
    itemId: 'itemId',
    name: 'name',
    brand: 'brand',
    status: 'status',
    qty: 'qty',
    unit: 'unit',
    hpp: 'hpp',
    markupPercent: 'markupPercent',
    priceAfterUp: 'priceAfterUp',
    sellingPrice: 'sellingPrice',
    totalPrice: 'totalPrice',
    poPrice: 'poPrice',
    notes: 'notes',
    deliveryTime: 'deliveryTime'
  };

  export type InquiryItemScalarFieldEnum = (typeof InquiryItemScalarFieldEnum)[keyof typeof InquiryItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ItemOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    brand: 'brand',
    unit: 'unit',
    remarks: 'remarks'
  };

  export type ItemOrderByRelevanceFieldEnum = (typeof ItemOrderByRelevanceFieldEnum)[keyof typeof ItemOrderByRelevanceFieldEnum]


  export const CustomerOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    npwp: 'npwp',
    address: 'address',
    remarks: 'remarks'
  };

  export type CustomerOrderByRelevanceFieldEnum = (typeof CustomerOrderByRelevanceFieldEnum)[keyof typeof CustomerOrderByRelevanceFieldEnum]


  export const SupplierOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    npwp: 'npwp',
    address: 'address',
    remarks: 'remarks'
  };

  export type SupplierOrderByRelevanceFieldEnum = (typeof SupplierOrderByRelevanceFieldEnum)[keyof typeof SupplierOrderByRelevanceFieldEnum]


  export const InquiryOrderByRelevanceFieldEnum: {
    id: 'id',
    requestNumber: 'requestNumber',
    customerId: 'customerId',
    remarks: 'remarks'
  };

  export type InquiryOrderByRelevanceFieldEnum = (typeof InquiryOrderByRelevanceFieldEnum)[keyof typeof InquiryOrderByRelevanceFieldEnum]


  export const InquiryItemOrderByRelevanceFieldEnum: {
    id: 'id',
    inquiryId: 'inquiryId',
    supplierId: 'supplierId',
    itemId: 'itemId',
    name: 'name',
    brand: 'brand',
    status: 'status',
    unit: 'unit',
    notes: 'notes'
  };

  export type InquiryItemOrderByRelevanceFieldEnum = (typeof InquiryItemOrderByRelevanceFieldEnum)[keyof typeof InquiryItemOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'ItemType'
   */
  export type EnumItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemType'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'InquiryStatus'
   */
  export type EnumInquiryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryStatus'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: StringFilter<"Item"> | string
    code?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    brand?: StringNullableFilter<"Item"> | string | null
    type?: EnumItemTypeFilter<"Item"> | $Enums.ItemType
    unit?: StringNullableFilter<"Item"> | string | null
    price?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableFilter<"Item"> | string | null
    inquiryItems?: InquiryItemListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    type?: SortOrder
    unit?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    inquiryItems?: InquiryItemOrderByRelationAggregateInput
    _relevance?: ItemOrderByRelevanceInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    brand?: StringNullableFilter<"Item"> | string | null
    type?: EnumItemTypeFilter<"Item"> | $Enums.ItemType
    unit?: StringNullableFilter<"Item"> | string | null
    price?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableFilter<"Item"> | string | null
    inquiryItems?: InquiryItemListRelationFilter
  }, "id" | "code">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    type?: SortOrder
    unit?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Item"> | string
    code?: StringWithAggregatesFilter<"Item"> | string
    name?: StringWithAggregatesFilter<"Item"> | string
    brand?: StringNullableWithAggregatesFilter<"Item"> | string | null
    type?: EnumItemTypeWithAggregatesFilter<"Item"> | $Enums.ItemType
    unit?: StringNullableWithAggregatesFilter<"Item"> | string | null
    price?: DecimalNullableWithAggregatesFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableWithAggregatesFilter<"Item"> | string | null
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    code?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    npwp?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    remarks?: StringNullableFilter<"Customer"> | string | null
    inquiries?: InquiryListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    inquiries?: InquiryOrderByRelationAggregateInput
    _relevance?: CustomerOrderByRelevanceInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    npwp?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    address?: StringNullableFilter<"Customer"> | string | null
    remarks?: StringNullableFilter<"Customer"> | string | null
    inquiries?: InquiryListRelationFilter
  }, "id" | "code" | "npwp">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    code?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    npwp?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"Customer"> | string | null
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    code?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    npwp?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    remarks?: StringNullableFilter<"Supplier"> | string | null
    inquiryItems?: InquiryItemListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    inquiryItems?: InquiryItemOrderByRelationAggregateInput
    _relevance?: SupplierOrderByRelevanceInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    npwp?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    name?: StringFilter<"Supplier"> | string
    address?: StringNullableFilter<"Supplier"> | string | null
    remarks?: StringNullableFilter<"Supplier"> | string | null
    inquiryItems?: InquiryItemListRelationFilter
  }, "id" | "code" | "npwp">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    code?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    npwp?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    address?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
  }

  export type InquiryWhereInput = {
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    id?: StringFilter<"Inquiry"> | string
    requestNumber?: StringNullableFilter<"Inquiry"> | string | null
    requestDate?: DateTimeFilter<"Inquiry"> | Date | string
    customerId?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    remarks?: StringNullableFilter<"Inquiry"> | string | null
    noQuotation?: BoolFilter<"Inquiry"> | boolean
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    items?: InquiryItemListRelationFilter
  }

  export type InquiryOrderByWithRelationInput = {
    id?: SortOrder
    requestNumber?: SortOrderInput | SortOrder
    requestDate?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    noQuotation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    items?: InquiryItemOrderByRelationAggregateInput
    _relevance?: InquiryOrderByRelevanceInput
  }

  export type InquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requestNumber?: string
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    requestDate?: DateTimeFilter<"Inquiry"> | Date | string
    customerId?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    remarks?: StringNullableFilter<"Inquiry"> | string | null
    noQuotation?: BoolFilter<"Inquiry"> | boolean
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    items?: InquiryItemListRelationFilter
  }, "id" | "requestNumber">

  export type InquiryOrderByWithAggregationInput = {
    id?: SortOrder
    requestNumber?: SortOrderInput | SortOrder
    requestDate?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    noQuotation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InquiryCountOrderByAggregateInput
    _max?: InquiryMaxOrderByAggregateInput
    _min?: InquiryMinOrderByAggregateInput
  }

  export type InquiryScalarWhereWithAggregatesInput = {
    AND?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    OR?: InquiryScalarWhereWithAggregatesInput[]
    NOT?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inquiry"> | string
    requestNumber?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    requestDate?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
    customerId?: StringWithAggregatesFilter<"Inquiry"> | string
    status?: EnumInquiryStatusWithAggregatesFilter<"Inquiry"> | $Enums.InquiryStatus
    remarks?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    noQuotation?: BoolWithAggregatesFilter<"Inquiry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
  }

  export type InquiryItemWhereInput = {
    AND?: InquiryItemWhereInput | InquiryItemWhereInput[]
    OR?: InquiryItemWhereInput[]
    NOT?: InquiryItemWhereInput | InquiryItemWhereInput[]
    id?: StringFilter<"InquiryItem"> | string
    inquiryId?: StringFilter<"InquiryItem"> | string
    supplierId?: StringNullableFilter<"InquiryItem"> | string | null
    itemId?: StringNullableFilter<"InquiryItem"> | string | null
    name?: StringFilter<"InquiryItem"> | string
    brand?: StringNullableFilter<"InquiryItem"> | string | null
    status?: StringNullableFilter<"InquiryItem"> | string | null
    qty?: IntFilter<"InquiryItem"> | number
    unit?: StringNullableFilter<"InquiryItem"> | string | null
    hpp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    markupPercent?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    totalPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    poPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"InquiryItem"> | string | null
    deliveryTime?: DateTimeNullableFilter<"InquiryItem"> | Date | string | null
    inquiry?: XOR<InquiryScalarRelationFilter, InquiryWhereInput>
    supplier?: XOR<SupplierNullableScalarRelationFilter, SupplierWhereInput> | null
    item?: XOR<ItemNullableScalarRelationFilter, ItemWhereInput> | null
  }

  export type InquiryItemOrderByWithRelationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    itemId?: SortOrderInput | SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    qty?: SortOrder
    unit?: SortOrderInput | SortOrder
    hpp?: SortOrderInput | SortOrder
    markupPercent?: SortOrderInput | SortOrder
    priceAfterUp?: SortOrderInput | SortOrder
    sellingPrice?: SortOrderInput | SortOrder
    totalPrice?: SortOrderInput | SortOrder
    poPrice?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    deliveryTime?: SortOrderInput | SortOrder
    inquiry?: InquiryOrderByWithRelationInput
    supplier?: SupplierOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
    _relevance?: InquiryItemOrderByRelevanceInput
  }

  export type InquiryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InquiryItemWhereInput | InquiryItemWhereInput[]
    OR?: InquiryItemWhereInput[]
    NOT?: InquiryItemWhereInput | InquiryItemWhereInput[]
    inquiryId?: StringFilter<"InquiryItem"> | string
    supplierId?: StringNullableFilter<"InquiryItem"> | string | null
    itemId?: StringNullableFilter<"InquiryItem"> | string | null
    name?: StringFilter<"InquiryItem"> | string
    brand?: StringNullableFilter<"InquiryItem"> | string | null
    status?: StringNullableFilter<"InquiryItem"> | string | null
    qty?: IntFilter<"InquiryItem"> | number
    unit?: StringNullableFilter<"InquiryItem"> | string | null
    hpp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    markupPercent?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    totalPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    poPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"InquiryItem"> | string | null
    deliveryTime?: DateTimeNullableFilter<"InquiryItem"> | Date | string | null
    inquiry?: XOR<InquiryScalarRelationFilter, InquiryWhereInput>
    supplier?: XOR<SupplierNullableScalarRelationFilter, SupplierWhereInput> | null
    item?: XOR<ItemNullableScalarRelationFilter, ItemWhereInput> | null
  }, "id">

  export type InquiryItemOrderByWithAggregationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    supplierId?: SortOrderInput | SortOrder
    itemId?: SortOrderInput | SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    qty?: SortOrder
    unit?: SortOrderInput | SortOrder
    hpp?: SortOrderInput | SortOrder
    markupPercent?: SortOrderInput | SortOrder
    priceAfterUp?: SortOrderInput | SortOrder
    sellingPrice?: SortOrderInput | SortOrder
    totalPrice?: SortOrderInput | SortOrder
    poPrice?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    deliveryTime?: SortOrderInput | SortOrder
    _count?: InquiryItemCountOrderByAggregateInput
    _avg?: InquiryItemAvgOrderByAggregateInput
    _max?: InquiryItemMaxOrderByAggregateInput
    _min?: InquiryItemMinOrderByAggregateInput
    _sum?: InquiryItemSumOrderByAggregateInput
  }

  export type InquiryItemScalarWhereWithAggregatesInput = {
    AND?: InquiryItemScalarWhereWithAggregatesInput | InquiryItemScalarWhereWithAggregatesInput[]
    OR?: InquiryItemScalarWhereWithAggregatesInput[]
    NOT?: InquiryItemScalarWhereWithAggregatesInput | InquiryItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InquiryItem"> | string
    inquiryId?: StringWithAggregatesFilter<"InquiryItem"> | string
    supplierId?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    itemId?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    name?: StringWithAggregatesFilter<"InquiryItem"> | string
    brand?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    status?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    qty?: IntWithAggregatesFilter<"InquiryItem"> | number
    unit?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    hpp?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    markupPercent?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    totalPrice?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    poPrice?: DecimalNullableWithAggregatesFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableWithAggregatesFilter<"InquiryItem"> | string | null
    deliveryTime?: DateTimeNullableWithAggregatesFilter<"InquiryItem"> | Date | string | null
  }

  export type ItemCreateInput = {
    id?: string
    code: string
    name: string
    brand?: string | null
    type: $Enums.ItemType
    unit?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
    inquiryItems?: InquiryItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    brand?: string | null
    type: $Enums.ItemType
    unit?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
    inquiryItems?: InquiryItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiryItems?: InquiryItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiryItems?: InquiryItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id?: string
    code: string
    name: string
    brand?: string | null
    type: $Enums.ItemType
    unit?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerCreateInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
    inquiries?: InquiryCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
    inquiries?: InquiryUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiries?: InquiryUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiries?: InquiryUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupplierCreateInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
    inquiryItems?: InquiryItemCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
    inquiryItems?: InquiryItemUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiryItems?: InquiryItemUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    inquiryItems?: InquiryItemUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InquiryCreateInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutInquiriesInput
    items?: InquiryItemCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    customerId: string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InquiryItemUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutInquiriesNestedInput
    items?: InquiryItemUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InquiryItemUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryCreateManyInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    customerId: string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryItemCreateInput = {
    id?: string
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
    inquiry: InquiryCreateNestedOneWithoutItemsInput
    supplier?: SupplierCreateNestedOneWithoutInquiryItemsInput
    item?: ItemCreateNestedOneWithoutInquiryItemsInput
  }

  export type InquiryItemUncheckedCreateInput = {
    id?: string
    inquiryId: string
    supplierId?: string | null
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inquiry?: InquiryUpdateOneRequiredWithoutItemsNestedInput
    supplier?: SupplierUpdateOneWithoutInquiryItemsNestedInput
    item?: ItemUpdateOneWithoutInquiryItemsNestedInput
  }

  export type InquiryItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemCreateManyInput = {
    id?: string
    inquiryId: string
    supplierId?: string | null
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[]
    notIn?: $Enums.ItemType[]
    not?: NestedEnumItemTypeFilter<$PrismaModel> | $Enums.ItemType
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type InquiryItemListRelationFilter = {
    every?: InquiryItemWhereInput
    some?: InquiryItemWhereInput
    none?: InquiryItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InquiryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemOrderByRelevanceInput = {
    fields: ItemOrderByRelevanceFieldEnum | ItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    price?: SortOrder
    remarks?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    price?: SortOrder
    remarks?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    price?: SortOrder
    remarks?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[]
    notIn?: $Enums.ItemType[]
    not?: NestedEnumItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemTypeFilter<$PrismaModel>
    _max?: NestedEnumItemTypeFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type InquiryListRelationFilter = {
    every?: InquiryWhereInput
    some?: InquiryWhereInput
    none?: InquiryWhereInput
  }

  export type InquiryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerOrderByRelevanceInput = {
    fields: CustomerOrderByRelevanceFieldEnum | CustomerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type SupplierOrderByRelevanceInput = {
    fields: SupplierOrderByRelevanceFieldEnum | SupplierOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    npwp?: SortOrder
    address?: SortOrder
    remarks?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[]
    notIn?: $Enums.InquiryStatus[]
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type InquiryOrderByRelevanceInput = {
    fields: InquiryOrderByRelevanceFieldEnum | InquiryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InquiryCountOrderByAggregateInput = {
    id?: SortOrder
    requestNumber?: SortOrder
    requestDate?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    noQuotation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    requestNumber?: SortOrder
    requestDate?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    noQuotation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InquiryMinOrderByAggregateInput = {
    id?: SortOrder
    requestNumber?: SortOrder
    requestDate?: SortOrder
    customerId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    noQuotation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[]
    notIn?: $Enums.InquiryStatus[]
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type InquiryScalarRelationFilter = {
    is?: InquiryWhereInput
    isNot?: InquiryWhereInput
  }

  export type SupplierNullableScalarRelationFilter = {
    is?: SupplierWhereInput | null
    isNot?: SupplierWhereInput | null
  }

  export type ItemNullableScalarRelationFilter = {
    is?: ItemWhereInput | null
    isNot?: ItemWhereInput | null
  }

  export type InquiryItemOrderByRelevanceInput = {
    fields: InquiryItemOrderByRelevanceFieldEnum | InquiryItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InquiryItemCountOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    supplierId?: SortOrder
    itemId?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    status?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    hpp?: SortOrder
    markupPercent?: SortOrder
    priceAfterUp?: SortOrder
    sellingPrice?: SortOrder
    totalPrice?: SortOrder
    poPrice?: SortOrder
    notes?: SortOrder
    deliveryTime?: SortOrder
  }

  export type InquiryItemAvgOrderByAggregateInput = {
    qty?: SortOrder
    hpp?: SortOrder
    markupPercent?: SortOrder
    priceAfterUp?: SortOrder
    sellingPrice?: SortOrder
    totalPrice?: SortOrder
    poPrice?: SortOrder
  }

  export type InquiryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    supplierId?: SortOrder
    itemId?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    status?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    hpp?: SortOrder
    markupPercent?: SortOrder
    priceAfterUp?: SortOrder
    sellingPrice?: SortOrder
    totalPrice?: SortOrder
    poPrice?: SortOrder
    notes?: SortOrder
    deliveryTime?: SortOrder
  }

  export type InquiryItemMinOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    supplierId?: SortOrder
    itemId?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    status?: SortOrder
    qty?: SortOrder
    unit?: SortOrder
    hpp?: SortOrder
    markupPercent?: SortOrder
    priceAfterUp?: SortOrder
    sellingPrice?: SortOrder
    totalPrice?: SortOrder
    poPrice?: SortOrder
    notes?: SortOrder
    deliveryTime?: SortOrder
  }

  export type InquiryItemSumOrderByAggregateInput = {
    qty?: SortOrder
    hpp?: SortOrder
    markupPercent?: SortOrder
    priceAfterUp?: SortOrder
    sellingPrice?: SortOrder
    totalPrice?: SortOrder
    poPrice?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InquiryItemCreateNestedManyWithoutItemInput = {
    create?: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput> | InquiryItemCreateWithoutItemInput[] | InquiryItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutItemInput | InquiryItemCreateOrConnectWithoutItemInput[]
    createMany?: InquiryItemCreateManyItemInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type InquiryItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput> | InquiryItemCreateWithoutItemInput[] | InquiryItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutItemInput | InquiryItemCreateOrConnectWithoutItemInput[]
    createMany?: InquiryItemCreateManyItemInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumItemTypeFieldUpdateOperationsInput = {
    set?: $Enums.ItemType
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type InquiryItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput> | InquiryItemCreateWithoutItemInput[] | InquiryItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutItemInput | InquiryItemCreateOrConnectWithoutItemInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutItemInput | InquiryItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InquiryItemCreateManyItemInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutItemInput | InquiryItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutItemInput | InquiryItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type InquiryItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput> | InquiryItemCreateWithoutItemInput[] | InquiryItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutItemInput | InquiryItemCreateOrConnectWithoutItemInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutItemInput | InquiryItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InquiryItemCreateManyItemInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutItemInput | InquiryItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutItemInput | InquiryItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type InquiryCreateNestedManyWithoutCustomerInput = {
    create?: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput> | InquiryCreateWithoutCustomerInput[] | InquiryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutCustomerInput | InquiryCreateOrConnectWithoutCustomerInput[]
    createMany?: InquiryCreateManyCustomerInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput> | InquiryCreateWithoutCustomerInput[] | InquiryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutCustomerInput | InquiryCreateOrConnectWithoutCustomerInput[]
    createMany?: InquiryCreateManyCustomerInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput> | InquiryCreateWithoutCustomerInput[] | InquiryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutCustomerInput | InquiryCreateOrConnectWithoutCustomerInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutCustomerInput | InquiryUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: InquiryCreateManyCustomerInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutCustomerInput | InquiryUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutCustomerInput | InquiryUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput> | InquiryCreateWithoutCustomerInput[] | InquiryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutCustomerInput | InquiryCreateOrConnectWithoutCustomerInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutCustomerInput | InquiryUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: InquiryCreateManyCustomerInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutCustomerInput | InquiryUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutCustomerInput | InquiryUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryItemCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput> | InquiryItemCreateWithoutSupplierInput[] | InquiryItemUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutSupplierInput | InquiryItemCreateOrConnectWithoutSupplierInput[]
    createMany?: InquiryItemCreateManySupplierInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type InquiryItemUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput> | InquiryItemCreateWithoutSupplierInput[] | InquiryItemUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutSupplierInput | InquiryItemCreateOrConnectWithoutSupplierInput[]
    createMany?: InquiryItemCreateManySupplierInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type InquiryItemUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput> | InquiryItemCreateWithoutSupplierInput[] | InquiryItemUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutSupplierInput | InquiryItemCreateOrConnectWithoutSupplierInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutSupplierInput | InquiryItemUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InquiryItemCreateManySupplierInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutSupplierInput | InquiryItemUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutSupplierInput | InquiryItemUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type InquiryItemUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput> | InquiryItemCreateWithoutSupplierInput[] | InquiryItemUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutSupplierInput | InquiryItemCreateOrConnectWithoutSupplierInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutSupplierInput | InquiryItemUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: InquiryItemCreateManySupplierInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutSupplierInput | InquiryItemUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutSupplierInput | InquiryItemUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutInquiriesInput = {
    create?: XOR<CustomerCreateWithoutInquiriesInput, CustomerUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutInquiriesInput
    connect?: CustomerWhereUniqueInput
  }

  export type InquiryItemCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput> | InquiryItemCreateWithoutInquiryInput[] | InquiryItemUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutInquiryInput | InquiryItemCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryItemCreateManyInquiryInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type InquiryItemUncheckedCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput> | InquiryItemCreateWithoutInquiryInput[] | InquiryItemUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutInquiryInput | InquiryItemCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryItemCreateManyInquiryInputEnvelope
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumInquiryStatusFieldUpdateOperationsInput = {
    set?: $Enums.InquiryStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomerUpdateOneRequiredWithoutInquiriesNestedInput = {
    create?: XOR<CustomerCreateWithoutInquiriesInput, CustomerUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutInquiriesInput
    upsert?: CustomerUpsertWithoutInquiriesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutInquiriesInput, CustomerUpdateWithoutInquiriesInput>, CustomerUncheckedUpdateWithoutInquiriesInput>
  }

  export type InquiryItemUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput> | InquiryItemCreateWithoutInquiryInput[] | InquiryItemUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutInquiryInput | InquiryItemCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutInquiryInput | InquiryItemUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryItemCreateManyInquiryInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutInquiryInput | InquiryItemUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutInquiryInput | InquiryItemUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type InquiryItemUncheckedUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput> | InquiryItemCreateWithoutInquiryInput[] | InquiryItemUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryItemCreateOrConnectWithoutInquiryInput | InquiryItemCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryItemUpsertWithWhereUniqueWithoutInquiryInput | InquiryItemUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryItemCreateManyInquiryInputEnvelope
    set?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    disconnect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    delete?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    connect?: InquiryItemWhereUniqueInput | InquiryItemWhereUniqueInput[]
    update?: InquiryItemUpdateWithWhereUniqueWithoutInquiryInput | InquiryItemUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryItemUpdateManyWithWhereWithoutInquiryInput | InquiryItemUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
  }

  export type InquiryCreateNestedOneWithoutItemsInput = {
    create?: XOR<InquiryCreateWithoutItemsInput, InquiryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutItemsInput
    connect?: InquiryWhereUniqueInput
  }

  export type SupplierCreateNestedOneWithoutInquiryItemsInput = {
    create?: XOR<SupplierCreateWithoutInquiryItemsInput, SupplierUncheckedCreateWithoutInquiryItemsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutInquiryItemsInput
    connect?: SupplierWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutInquiryItemsInput = {
    create?: XOR<ItemCreateWithoutInquiryItemsInput, ItemUncheckedCreateWithoutInquiryItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInquiryItemsInput
    connect?: ItemWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InquiryUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<InquiryCreateWithoutItemsInput, InquiryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutItemsInput
    upsert?: InquiryUpsertWithoutItemsInput
    connect?: InquiryWhereUniqueInput
    update?: XOR<XOR<InquiryUpdateToOneWithWhereWithoutItemsInput, InquiryUpdateWithoutItemsInput>, InquiryUncheckedUpdateWithoutItemsInput>
  }

  export type SupplierUpdateOneWithoutInquiryItemsNestedInput = {
    create?: XOR<SupplierCreateWithoutInquiryItemsInput, SupplierUncheckedCreateWithoutInquiryItemsInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutInquiryItemsInput
    upsert?: SupplierUpsertWithoutInquiryItemsInput
    disconnect?: SupplierWhereInput | boolean
    delete?: SupplierWhereInput | boolean
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutInquiryItemsInput, SupplierUpdateWithoutInquiryItemsInput>, SupplierUncheckedUpdateWithoutInquiryItemsInput>
  }

  export type ItemUpdateOneWithoutInquiryItemsNestedInput = {
    create?: XOR<ItemCreateWithoutInquiryItemsInput, ItemUncheckedCreateWithoutInquiryItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInquiryItemsInput
    upsert?: ItemUpsertWithoutInquiryItemsInput
    disconnect?: ItemWhereInput | boolean
    delete?: ItemWhereInput | boolean
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutInquiryItemsInput, ItemUpdateWithoutInquiryItemsInput>, ItemUncheckedUpdateWithoutInquiryItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[]
    notIn?: $Enums.ItemType[]
    not?: NestedEnumItemTypeFilter<$PrismaModel> | $Enums.ItemType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[]
    notIn?: $Enums.ItemType[]
    not?: NestedEnumItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemTypeFilter<$PrismaModel>
    _max?: NestedEnumItemTypeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[]
    notIn?: $Enums.InquiryStatus[]
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[]
    notIn?: $Enums.InquiryStatus[]
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InquiryItemCreateWithoutItemInput = {
    id?: string
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
    inquiry: InquiryCreateNestedOneWithoutItemsInput
    supplier?: SupplierCreateNestedOneWithoutInquiryItemsInput
  }

  export type InquiryItemUncheckedCreateWithoutItemInput = {
    id?: string
    inquiryId: string
    supplierId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemCreateOrConnectWithoutItemInput = {
    where: InquiryItemWhereUniqueInput
    create: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput>
  }

  export type InquiryItemCreateManyItemInputEnvelope = {
    data: InquiryItemCreateManyItemInput | InquiryItemCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type InquiryItemUpsertWithWhereUniqueWithoutItemInput = {
    where: InquiryItemWhereUniqueInput
    update: XOR<InquiryItemUpdateWithoutItemInput, InquiryItemUncheckedUpdateWithoutItemInput>
    create: XOR<InquiryItemCreateWithoutItemInput, InquiryItemUncheckedCreateWithoutItemInput>
  }

  export type InquiryItemUpdateWithWhereUniqueWithoutItemInput = {
    where: InquiryItemWhereUniqueInput
    data: XOR<InquiryItemUpdateWithoutItemInput, InquiryItemUncheckedUpdateWithoutItemInput>
  }

  export type InquiryItemUpdateManyWithWhereWithoutItemInput = {
    where: InquiryItemScalarWhereInput
    data: XOR<InquiryItemUpdateManyMutationInput, InquiryItemUncheckedUpdateManyWithoutItemInput>
  }

  export type InquiryItemScalarWhereInput = {
    AND?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
    OR?: InquiryItemScalarWhereInput[]
    NOT?: InquiryItemScalarWhereInput | InquiryItemScalarWhereInput[]
    id?: StringFilter<"InquiryItem"> | string
    inquiryId?: StringFilter<"InquiryItem"> | string
    supplierId?: StringNullableFilter<"InquiryItem"> | string | null
    itemId?: StringNullableFilter<"InquiryItem"> | string | null
    name?: StringFilter<"InquiryItem"> | string
    brand?: StringNullableFilter<"InquiryItem"> | string | null
    status?: StringNullableFilter<"InquiryItem"> | string | null
    qty?: IntFilter<"InquiryItem"> | number
    unit?: StringNullableFilter<"InquiryItem"> | string | null
    hpp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    markupPercent?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    totalPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    poPrice?: DecimalNullableFilter<"InquiryItem"> | Decimal | DecimalJsLike | number | string | null
    notes?: StringNullableFilter<"InquiryItem"> | string | null
    deliveryTime?: DateTimeNullableFilter<"InquiryItem"> | Date | string | null
  }

  export type InquiryCreateWithoutCustomerInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InquiryItemCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateWithoutCustomerInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InquiryItemUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryCreateOrConnectWithoutCustomerInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput>
  }

  export type InquiryCreateManyCustomerInputEnvelope = {
    data: InquiryCreateManyCustomerInput | InquiryCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type InquiryUpsertWithWhereUniqueWithoutCustomerInput = {
    where: InquiryWhereUniqueInput
    update: XOR<InquiryUpdateWithoutCustomerInput, InquiryUncheckedUpdateWithoutCustomerInput>
    create: XOR<InquiryCreateWithoutCustomerInput, InquiryUncheckedCreateWithoutCustomerInput>
  }

  export type InquiryUpdateWithWhereUniqueWithoutCustomerInput = {
    where: InquiryWhereUniqueInput
    data: XOR<InquiryUpdateWithoutCustomerInput, InquiryUncheckedUpdateWithoutCustomerInput>
  }

  export type InquiryUpdateManyWithWhereWithoutCustomerInput = {
    where: InquiryScalarWhereInput
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyWithoutCustomerInput>
  }

  export type InquiryScalarWhereInput = {
    AND?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    OR?: InquiryScalarWhereInput[]
    NOT?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    id?: StringFilter<"Inquiry"> | string
    requestNumber?: StringNullableFilter<"Inquiry"> | string | null
    requestDate?: DateTimeFilter<"Inquiry"> | Date | string
    customerId?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    remarks?: StringNullableFilter<"Inquiry"> | string | null
    noQuotation?: BoolFilter<"Inquiry"> | boolean
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
  }

  export type InquiryItemCreateWithoutSupplierInput = {
    id?: string
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
    inquiry: InquiryCreateNestedOneWithoutItemsInput
    item?: ItemCreateNestedOneWithoutInquiryItemsInput
  }

  export type InquiryItemUncheckedCreateWithoutSupplierInput = {
    id?: string
    inquiryId: string
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemCreateOrConnectWithoutSupplierInput = {
    where: InquiryItemWhereUniqueInput
    create: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput>
  }

  export type InquiryItemCreateManySupplierInputEnvelope = {
    data: InquiryItemCreateManySupplierInput | InquiryItemCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type InquiryItemUpsertWithWhereUniqueWithoutSupplierInput = {
    where: InquiryItemWhereUniqueInput
    update: XOR<InquiryItemUpdateWithoutSupplierInput, InquiryItemUncheckedUpdateWithoutSupplierInput>
    create: XOR<InquiryItemCreateWithoutSupplierInput, InquiryItemUncheckedCreateWithoutSupplierInput>
  }

  export type InquiryItemUpdateWithWhereUniqueWithoutSupplierInput = {
    where: InquiryItemWhereUniqueInput
    data: XOR<InquiryItemUpdateWithoutSupplierInput, InquiryItemUncheckedUpdateWithoutSupplierInput>
  }

  export type InquiryItemUpdateManyWithWhereWithoutSupplierInput = {
    where: InquiryItemScalarWhereInput
    data: XOR<InquiryItemUpdateManyMutationInput, InquiryItemUncheckedUpdateManyWithoutSupplierInput>
  }

  export type CustomerCreateWithoutInquiriesInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type CustomerUncheckedCreateWithoutInquiriesInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type CustomerCreateOrConnectWithoutInquiriesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutInquiriesInput, CustomerUncheckedCreateWithoutInquiriesInput>
  }

  export type InquiryItemCreateWithoutInquiryInput = {
    id?: string
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
    supplier?: SupplierCreateNestedOneWithoutInquiryItemsInput
    item?: ItemCreateNestedOneWithoutInquiryItemsInput
  }

  export type InquiryItemUncheckedCreateWithoutInquiryInput = {
    id?: string
    supplierId?: string | null
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemCreateOrConnectWithoutInquiryInput = {
    where: InquiryItemWhereUniqueInput
    create: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryItemCreateManyInquiryInputEnvelope = {
    data: InquiryItemCreateManyInquiryInput | InquiryItemCreateManyInquiryInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutInquiriesInput = {
    update: XOR<CustomerUpdateWithoutInquiriesInput, CustomerUncheckedUpdateWithoutInquiriesInput>
    create: XOR<CustomerCreateWithoutInquiriesInput, CustomerUncheckedCreateWithoutInquiriesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutInquiriesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutInquiriesInput, CustomerUncheckedUpdateWithoutInquiriesInput>
  }

  export type CustomerUpdateWithoutInquiriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUncheckedUpdateWithoutInquiriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InquiryItemUpsertWithWhereUniqueWithoutInquiryInput = {
    where: InquiryItemWhereUniqueInput
    update: XOR<InquiryItemUpdateWithoutInquiryInput, InquiryItemUncheckedUpdateWithoutInquiryInput>
    create: XOR<InquiryItemCreateWithoutInquiryInput, InquiryItemUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryItemUpdateWithWhereUniqueWithoutInquiryInput = {
    where: InquiryItemWhereUniqueInput
    data: XOR<InquiryItemUpdateWithoutInquiryInput, InquiryItemUncheckedUpdateWithoutInquiryInput>
  }

  export type InquiryItemUpdateManyWithWhereWithoutInquiryInput = {
    where: InquiryItemScalarWhereInput
    data: XOR<InquiryItemUpdateManyMutationInput, InquiryItemUncheckedUpdateManyWithoutInquiryInput>
  }

  export type InquiryCreateWithoutItemsInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutInquiriesInput
  }

  export type InquiryUncheckedCreateWithoutItemsInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    customerId: string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryCreateOrConnectWithoutItemsInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutItemsInput, InquiryUncheckedCreateWithoutItemsInput>
  }

  export type SupplierCreateWithoutInquiryItemsInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type SupplierUncheckedCreateWithoutInquiryItemsInput = {
    id?: string
    code: string
    name: string
    npwp?: string | null
    address?: string | null
    remarks?: string | null
  }

  export type SupplierCreateOrConnectWithoutInquiryItemsInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutInquiryItemsInput, SupplierUncheckedCreateWithoutInquiryItemsInput>
  }

  export type ItemCreateWithoutInquiryItemsInput = {
    id?: string
    code: string
    name: string
    brand?: string | null
    type: $Enums.ItemType
    unit?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
  }

  export type ItemUncheckedCreateWithoutInquiryItemsInput = {
    id?: string
    code: string
    name: string
    brand?: string | null
    type: $Enums.ItemType
    unit?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
  }

  export type ItemCreateOrConnectWithoutInquiryItemsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutInquiryItemsInput, ItemUncheckedCreateWithoutInquiryItemsInput>
  }

  export type InquiryUpsertWithoutItemsInput = {
    update: XOR<InquiryUpdateWithoutItemsInput, InquiryUncheckedUpdateWithoutItemsInput>
    create: XOR<InquiryCreateWithoutItemsInput, InquiryUncheckedCreateWithoutItemsInput>
    where?: InquiryWhereInput
  }

  export type InquiryUpdateToOneWithWhereWithoutItemsInput = {
    where?: InquiryWhereInput
    data: XOR<InquiryUpdateWithoutItemsInput, InquiryUncheckedUpdateWithoutItemsInput>
  }

  export type InquiryUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutInquiriesNestedInput
  }

  export type InquiryUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUpsertWithoutInquiryItemsInput = {
    update: XOR<SupplierUpdateWithoutInquiryItemsInput, SupplierUncheckedUpdateWithoutInquiryItemsInput>
    create: XOR<SupplierCreateWithoutInquiryItemsInput, SupplierUncheckedCreateWithoutInquiryItemsInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutInquiryItemsInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutInquiryItemsInput, SupplierUncheckedUpdateWithoutInquiryItemsInput>
  }

  export type SupplierUpdateWithoutInquiryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupplierUncheckedUpdateWithoutInquiryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    npwp?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemUpsertWithoutInquiryItemsInput = {
    update: XOR<ItemUpdateWithoutInquiryItemsInput, ItemUncheckedUpdateWithoutInquiryItemsInput>
    create: XOR<ItemCreateWithoutInquiryItemsInput, ItemUncheckedCreateWithoutInquiryItemsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutInquiryItemsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutInquiryItemsInput, ItemUncheckedUpdateWithoutInquiryItemsInput>
  }

  export type ItemUpdateWithoutInquiryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemUncheckedUpdateWithoutInquiryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InquiryItemCreateManyItemInput = {
    id?: string
    inquiryId: string
    supplierId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inquiry?: InquiryUpdateOneRequiredWithoutItemsNestedInput
    supplier?: SupplierUpdateOneWithoutInquiryItemsNestedInput
  }

  export type InquiryItemUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryCreateManyCustomerInput = {
    id?: string
    requestNumber?: string | null
    requestDate: Date | string
    status?: $Enums.InquiryStatus
    remarks?: string | null
    noQuotation?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InquiryItemUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InquiryItemUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestNumber?: NullableStringFieldUpdateOperationsInput | string | null
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    noQuotation?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryItemCreateManySupplierInput = {
    id?: string
    inquiryId: string
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inquiry?: InquiryUpdateOneRequiredWithoutItemsNestedInput
    item?: ItemUpdateOneWithoutInquiryItemsNestedInput
  }

  export type InquiryItemUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemCreateManyInquiryInput = {
    id?: string
    supplierId?: string | null
    itemId?: string | null
    name: string
    brand?: string | null
    status?: string | null
    qty?: number
    unit?: string | null
    hpp?: Decimal | DecimalJsLike | number | string | null
    markupPercent?: Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: Decimal | DecimalJsLike | number | string | null
    sellingPrice?: Decimal | DecimalJsLike | number | string | null
    totalPrice?: Decimal | DecimalJsLike | number | string | null
    poPrice?: Decimal | DecimalJsLike | number | string | null
    notes?: string | null
    deliveryTime?: Date | string | null
  }

  export type InquiryItemUpdateWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    supplier?: SupplierUpdateOneWithoutInquiryItemsNestedInput
    item?: ItemUpdateOneWithoutInquiryItemsNestedInput
  }

  export type InquiryItemUncheckedUpdateWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryItemUncheckedUpdateManyWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    itemId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    qty?: IntFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    hpp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    markupPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    priceAfterUp?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sellingPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    poPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}