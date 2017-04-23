/* tslint:disable:max-classes-per-file */
declare module 'keystone' {
  import * as mongoose from 'mongoose';

  function list<T extends mongoose.Document>(name: string): List<T>;  

  interface ExtendedType {
    updateItem: (item: any, data: any, callback: () => void) => void;
  }

  export class Field {
    public static Types: {
      AzureFile: ExtendedType;
      Boolean: ExtendedType;
      CloudinaryImage: ExtendedType;
      CloudinaryImages: ExtendedType;
      Code: ExtendedType;
      Color: ExtendedType;
      Date: ExtendedType;
      DateArray: ExtendedType;
      Datetime: ExtendedType;
      Email: ExtendedType;
      Embedly: ExtendedType;
      File: ExtendedType;
      GeoPoint: ExtendedType;
      Html: ExtendedType;
      Key: ExtendedType;
      LocalFile: ExtendedType;
      LocalFiles: ExtendedType;
      Location: ExtendedType;
      Markdown: ExtendedType;
      Money: ExtendedType;
      Name: ExtendedType;
      Number: ExtendedType;
      NumberArray: ExtendedType;
      Password: ExtendedType;
      Relationship: ExtendedType;
      S3File: ExtendedType;
      Select: ExtendedType;
      Text: ExtendedType;
      TextArray: ExtendedType;
      Textarea: ExtendedType;
      Url: ExtendedType;
    };
  }
  
  type FieldType = ExtendedType | StringConstructor | NumberConstructor | DateConstructor | BooleanConstructor;
  
  export interface FieldOptions {
    type: FieldType;
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

  export interface ListFieldMap {
    [key: string]: FieldType | FieldOptions | ListFieldMap; // handle nested types
  }

  export interface RelationshipOptions {
    ref: string;
    path: string;
    refPath: string;
  }

  export interface ListOptions<T extends mongoose.Document> {
    drilldown?: string;
    inherits?: List<T>;
    sortable?: boolean;
    sortContext?: string;
    searchFields?: string; // space delimited field names
    defaultSort?: string;
    defaultColumns?: string;
    track?: boolean | {createdAt?: boolean | string, createdBy?: boolean | string, updatedAt?: boolean | string, updatedBy?: boolean | string}
    label?: string;
    path?: string;
    map?: {name: string};
    singular?: string;
    plural?: string;
    schema?: {};
    autokey?: {from: string, path: string, unique?: boolean, fixed?: boolean},
    noedit?: boolean;
    nocreate?: boolean;
    nodelete?: boolean;
    hidden?: boolean;

  }

  export interface PaginateOptions {
    page: number;
    perPage: number;
    maxPages: number;
  }

  export class List<T extends mongoose.Document> {
    constructor(name: string, opt: ListOptions<T>);
    public model: mongoose.Model<T>;
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
    // main methods from documentation
    /**
     * 
     * @param fields An object containing the fields of this model, each is an
     * instance of @type {(FieldType|FieldOptions)}
     */
    public add(fields: ListFieldMap): void;
    
    /**
     * @param rel the object containing the ref, path and refPath for the definition
     * of this relationship.
     */
    public relationship(rel: RelationshipOptions): void;
    /**
     * 
     */
    public register(): void;
    /**
     * @param options that dictate the current `page`, results `perPage` and `maxPages'
     * @return a paginated mongoose document query that can be chained with subsequent
     * query operations.
     */
    public paginate(options: PaginateOptions): mongoose.DocumentQuery<T[], T>;

  

  }

  export type Relationship = mongoose.Schema.Types.ObjectId | mongoose.Schema.Types.ObjectId[];

  namespace Cloudinary {
    export interface Options {
      transformation: string;
    }
    export interface Image {
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
        tag(options: Options);
        src(options: Options);
        scale(width: number, height: number, options: Options): string;
        fit(width: number, height: number, options: Options): string;
        lfit(width: number, height: number, options: Options): string;
        limit(width: number, height: number, options: Options): string;
        fill(width: number, height: number, options: Options): string;
        crop(width: number, height: number, options: Options): string;
        pad(width: number, height: number, options: Options): string;
        lpad(width: number, height: number, options: Options): string;
        thumbnail(width: number, height: number, options: Options): string;
      }
    }
  }
  


}
