/* tslint:disable:max-classes-per-file */
declare module 'keystone' {
  import * as mongoose from 'mongoose';
  import * as express from 'express';
  import * as expressSession from 'express-session';
  import * as KeystoneUtils from 'keystone-utils';
  import * as http from 'http';
  export interface ProjectOptions {
    name: string;
    brand: string;
    'module root': string;
    'frame guard': string | boolean;
    'auto update': boolean;
    'updates': string;
    nav: NavOptions;
    'csv field delimiter': string;
    app: Express.Application;
    mongoose: mongoose.Mongoose;
  }

  export interface NavOptions {
    [route: string]: string | string[];
  }
  type Path = string;

  export interface WebServerOptions {
    'env': string;
    port: number;
    host: string;
    views: string;
    'view engine': string;
    'custom engine': Function;
    'view cache': boolean;
    locals: {};
    static: string | string[];
    'static options': {};
    'less': string | string[];
    'less options': {};
    'sass': string | string[];
    'sass options': {};
    favicon: string;
    compress: boolean;
    logger: string;
    'logger options': {};
    'trust proxy': boolean;
  }

  export interface HTTPSWebServerOptions {
    ssl: boolean | string;
    'ssl key': Path;
    'ssl cert': Path;
    'ssl ca': Path;
    'ssl port': number;
    'ssl host': string;
  }

  export interface SocketWebServerOptions {
      'unix socket': string;
  }

  export interface DBOptions {
    mongo: string;
    'model prefix': string;
    auth: boolean | express.RequestHandler;
    'user model': string;
    'cookie secret': string;
    // TODO: this is kind of wrong but will delve into that later
    'session store': string | ((e: expressSession.SessionOptions) => expressSession.BaseMemoryStore);
    'session store options': {};
    'back url': string;
    'signin url': string;
    'signin redirect': string;
    'signin logo': Path;
    'signout url': string;
    'signout redirect': string;
  }

  export interface AdminUiOptions {
    'wysiwyg images': boolean;
    'wysiwyg cloudinary images': boolean;
    'wysiwyg additional buttons': string;
    'wysiwyg additional plugins': string;
    'wysiwyg additional options': {};
    'wysiwyg override toolbar': boolean;
    'wysiwyg menubar': boolean;
    'wysiwyg importcss': boolean;
    'wysiwyg skin': boolean;
  }

  export interface GoogleAnalyticsOptions {
    'ga property': string;
    'ga domain': string;
  }

  export interface GoogleMapsOptions {
    'google api key': string;
    'google server api key': string;
    'default region': string;
  }

  export interface S3ConfigOptions {
    's3 config': {
      bucket: string;
      key: string;
      secret: string;
      'default headers': {[key: string]: string}
    };
  }

  interface CloudinaryConfig {
      cloud_name: string;
      api_key: string;
      api_secret: string;
  }
  export interface CloudinaryOptions {
    'cloudinary config': string | CloudinaryConfig;
    'cloudinary prefix': string;
    'cloudinary folders': boolean;
    'cloudinary secure': boolean;
  }

  export interface RouteOptions {
    '404': express.RequestHandler;
    '500': express.RequestHandler;
    'routes': ((app: express.Application) => void) | express.Router;
  }

  export type Options = ProjectOptions &
  WebServerOptions &
  HTTPSWebServerOptions &
  SocketWebServerOptions &
  DBOptions &
  GoogleAnalyticsOptions &
  GoogleMapsOptions &
  S3ConfigOptions &
  CloudinaryOptions &
  RouteOptions;

  export namespace Schema {
    export type Relationship = mongoose.Types.ObjectId;
    export interface CloudinaryImage {
      public_id: string;
      version: number;
      signature: string;
      format: string;
      resource_type: string;
      url: string;
      width: number;
      height: number;
      secure_url: string;
      exists: boolean;
      _: {
        tag(options: CloudinaryOptions): string;
        src(options: CloudinaryOptions): string;
        scale(width: number, height: number, options?: CloudinaryOptions): string;
        fit(width: number, height: number, options?: CloudinaryOptions): string;
        lfit(width: number, height: number, options?: CloudinaryOptions): string;
        limit(width: number, height: number, options?: CloudinaryOptions): string;
        fill(width: number, height: number, options?: CloudinaryOptions): string;
        crop(width: number, height: number, options?: CloudinaryOptions): string;
        pad(width: number, height: number, options?: CloudinaryOptions): string;
        lpad(width: number, height: number, options?: CloudinaryOptions): string;
        thumbnail(width: number, height: number, options?: CloudinaryOptions): string;
      };
    }

    export interface CloudinaryOptions {
      transformation: string;
    }
    export interface Location {
      name: string; // building name
      number: string; // unit or shop number
      street1: string; // street address
      street2: string; // street address line 2
      suburb: string;
      state: string;
      postcode: string;
      country: string;
      geo: LngLat; // longitude, latitude
      _: {
        googleLookup(
          region: string, update: 'overwrite' |
          boolean,
          callback: (err: string, location: {}, result: {}) => void
        ): void;
      };
    }
    export type LngLat = [number, number];
  }

  export class Field  {
    /**
     * The extended Types
     */
    public static Types: {
      AzureFile: Field.ExtendedType;
      Boolean: Field.ExtendedType;
      CloudinaryImage: Field.ExtendedType;
      CloudinaryImages: Field.ExtendedType;
      Code: Field.ExtendedType;
      Color: Field.ExtendedType;
      Date: Field.ExtendedType;
      DateArray: Field.ExtendedType;
      Datetime: Field.ExtendedType;
      Email: Field.ExtendedType;
      Embedly: Field.ExtendedType;
      File: Field.ExtendedType;
      GeoPoint: Field.ExtendedType;
      Html: Field.ExtendedType;
      Key: Field.ExtendedType;
      LocalFile: Field.ExtendedType;
      LocalFiles: Field.ExtendedType;
      Location: Field.ExtendedType;
      Markdown: Field.ExtendedType;
      Money: Field.ExtendedType;
      Name: Field.ExtendedType;
      Number: Field.ExtendedType;
      Url: Field.ExtendedType;
      NumberArray: Field.ExtendedType;
      Password: Field.ExtendedType;
      Relationship: Field.ExtendedType;
      S3File: Field.ExtendedType;
      Select: Field.ExtendedType;
      Text: Field.ExtendedType;
      TextArray: Field.ExtendedType;
      Textarea: Field.ExtendedType;
    };

  }

  export namespace Field {
    export interface Options {
      type: List.FieldType;
      required?: boolean;
      initial?: boolean;
      default?: any;
      noedit?: boolean;
      note?: string;
      hidden?: boolean;
      collapse?: boolean;
      dependsOn?: {[fieldName: string]: any | any[]};
      [opt: string]: any;
    }

    export interface ExtendedType {
      // updateItem: (item: any, data: any, callback: () => void) => void;
    }
  }

  /** Has both the fields of the list type and methods of a mongoose document
   * IMPORTANT:
   */
  interface HasId {
    id: string;
  }

  type ModelDocument<T> = T & mongoose.Document & HasId;

  export type Lean<T> =  T & LeanDocument;

  interface LeanDocument {
    _id: string;
  }

  export class List<T> {
    /**
     * Get a Mongoose model instance for this List. WARNING: the mongoose
     * query results (results from `find()`, `findOne()`) are frozen and
     * cannot have properties added to them.
     */
    public model: mongoose.Model<ModelDocument<T>>;
    public schema: mongoose.Schema;
    public readonly label: string;
    public readonly singular: string;
    public readonly plural: string;
    public readonly namePath: string;
    public readonly nameField: string;
    public readonly nameIsVirtual: string;
    public readonly nameFieldIsFormHeader: string;
    public readonly nameIsInitial: string;
    public readonly initialFields: string;
    public searchFields: string;
    public defaultSort: string;
    public defaultColumns: string;
    constructor(name: string, opt?: List.Options<T>);
    // main methods from documentation
   /**
    * Add fields to this schema. Also supports fields grouped by string headers by passing `header, {}` as arguments
    * instead of a single argument
    * @param fields An object containing the fields to add to this model defining their type and optional properties
    */
    public add(fields: List.AddedFields<T>): void;
    public add(...fields: Array<Partial<List.AddedFields<T>> | string>): void;
   /**
    * @param rel the object containing the ref, path and refPath for the definition
    * of this relationship.
    */
    public relationship(rel: List.RelationshipOptions): void;
   /**
    *
    */
    public register(): void;
   /**
    * @param options that dictate the current `page`, results `perPage` and `maxPages'
    * @return a paginated mongoose document query that can be chained with subsequent
    * query operations.
    */
    public paginate(options: List.PaginationOptions): mongoose.DocumentQuery<Array<ModelDocument<T>>, ModelDocument<T>>;

  }

  export namespace List {
    export interface PaginationOptions {
      page: number;
      erPage: number;
      maxPages: number;
    }
    export type FieldType = Field.ExtendedType |
    StringConstructor | NumberConstructor | DateConstructor | BooleanConstructor;

    type AddedFields<T> = {
        [key in keyof T]: FieldType | Field.Options | AddedFields<T[keyof T]>;
    };

    export interface Options<K> {
      drilldown?: string;
      /**
       * NOTE: It is not possible to support correct inheritance scheme (i.e.), where `inherits` property
       * satisfies the inheritance without having a type wildcard `?` for List as in Java. That is,
       * the correct property would look like: inherits?: List<? super T>, where T is the list being created
       */
      inherits?: List<K>;
      sortable?: boolean;
      sortContext?: string;
      searchFields?: string; // space delimited field names
      defaultSort?: string;
      defaultColumns?: string;
      track?: boolean | {createdAt?: boolean | string, createdBy?: boolean | string,
        updatedAt?: boolean | string, updatedBy?: boolean | string};
      label?: string;
      path?: string;
      map?: {name: string};
      singular?: string;
      plural?: string;
      schema?: {};
      autokey?: {from: string, path: string, unique?: boolean, fixed?: boolean};
      noedit?: boolean;
      nocreate?: boolean;
      nodelete?: boolean;
      hidden?: boolean;
    }
    export interface RelationshipOptions {
      ref: string;
      path: string;
      refPath: string;
    }
  }

/**
 * Helper to simplify view logic in a Keystone application
 *
 * @api public
 */
  export class View {
    constructor(req: Express.Request, res: Express.Response);

    /**
     * Adds a method (or array of methods) to be executed in parallel
     * to the `init`, `action` or `render` queue.
     *
     * @param action type of action or a function that determines whether the callback is added to the queue
     * @param cb the callback that will be executed.
     */
    public on(action: string | (() => boolean) | {}, cb: express.NextFunction ): void;
    public on(action: string | (() => boolean), cond: {}, cb: express.NextFunction): void;
    /**
     * Queues a mongoose query for execution before the view is rendered.
     * The results of the query are set in `locals[key]`.
     *
     * Keys can be nested paths, containing objects will be created as required.
     *
     * The third argument `then` can be a method to call after the query is completed
     * like function(err, results, callback), or a `populatedRelated` definition
     * (string or array).
     *
     * Examples:
     *
     * view.query('books', keystone.list('Book').model.find());
     *
     *     an array of books from the database will be added to locals.books. You can
     *     also nest properties on the locals variable.
     *
     * view.query(
     *     'admin.books',
     *      keystone.list('Book').model.find().where('user', 'Admin')
     * );
     *
     *     locals.admin.books will be the result of the query
     *     views.query().then is always called if it is available
     *
     * view.query('books', keystone.list('Book').model.find())
     *     .then(function (err, results, next) {
     *         if (err) return next(err);
     *         console.log(results);
     *         next();
     *     });
     *
     * @api public
     * @param key
     * @param query
     * @param options
     */
    public query<T, DocType extends mongoose.Document>(
      key: string, query: mongoose.DocumentQuery<T, DocType>, options?: View.QueryOptions): void;

    public render(
      renderFn: string | express.ErrorRequestHandler,
      locals?: {} | (() => {}), callback?: (err: Error, html: string) => void): void;
  }

  export namespace View {
    export interface QueryOptions {

    }
  }

  export interface StartupEvents {
    onHttpServerCreated?: () => void;
    onHttpsServerCreated?: () => void;
    onSocketServerCreated?: () => void;
    onStart?: () => void;
    onMount?: () => void;
  }

  /**
   * Get a list registered for this
   * @param name The name of the list to use
   */
  export function list<T>(name: string): List<T>;
  /**
   * Set keystone options. See
   * @param key Option name
   * @param value Option value
   */
  export function set<K extends keyof Options>(key: K, value: Options[K]): void;
  export function get<K extends keyof Options>(key: K): Options[K];
  export function init(options: Partial<Options>): void;
  export function pre(action: string, middleware: express.RequestHandler): void;
  export function importer(dir: string): (path: string)
    => {[name: string]: express.RequestHandler | express.ErrorRequestHandler};
  // export function import(what: string): void;
  export function start(events?: StartupEvents): void;
  export function connect(...modules: Array<mongoose.Mongoose | express.Application>): void;
  export const utils: typeof KeystoneUtils;
  export const content: {editable: {}}; // TODO typings for content
  export const security: {crsf: {}}; // TODO typings for securitfunction readonly List: typeof Keystone.List;

  /* servers may be null until keystone is started, so make that clear to the client.
   */
  export let httpServer: http.Server | null;
  export let httpsServer: http.Server | null;

}
