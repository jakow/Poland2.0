/* tslint:disable:max-classes-per-file */
declare module 'keystone' {
  import mongoose from 'mongoose';
  import KeystoneUtils from 'keystone-utils';
  
  export interface Options { 
  }
  
  export module Schema {
    export type Relationship = mongoose.Schema.Types.ObjectId | mongoose.Schema.Types.ObjectId[];
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
        scale(width: number, height: number, options: CloudinaryOptions): string;
        fit(width: number, height: number, options: CloudinaryOptions): string;
        lfit(width: number, height: number, options: CloudinaryOptions): string;
        limit(width: number, height: number, options: CloudinaryOptions): string;
        fill(width: number, height: number, options: CloudinaryOptions): string;
        crop(width: number, height: number, options: CloudinaryOptions): string;
        pad(width: number, height: number, options: CloudinaryOptions): string;
        lpad(width: number, height: number, options: CloudinaryOptions): string;
        thumbnail(width: number, height: number, options: CloudinaryOptions): string;
      }
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
        googleLookup(region: string, update: 'overwrite' | boolean, callback: (err: string, location: {}, result: {}) => void  ): void;
        
      }
    }
    export type LngLat = [number, number];
  }
  
  export class Field  {
    public static Types: {
      AzureFile:        Field.FieldType;
      Boolean:          Field.FieldType;
      CloudinaryImage:  Field.FieldType;
      CloudinaryImages: Field.FieldType;
      Code:             Field.FieldType;
      Color:            Field.FieldType;
      Date:             Field.FieldType;
      DateArray:        Field.FieldType;
      Datetime:         Field.FieldType;
      Email:            Field.FieldType;
      Embedly:          Field.FieldType;
      File:             Field.FieldType;
      GeoPoint:         Field.FieldType;
      Html:             Field.FieldType;
      Key:              Field.FieldType;
      LocalFile:        Field.FieldType;
      LocalFiles:       Field.FieldType;
      Location:         Field.FieldType;
      Markdown:         Field.FieldType;
      Money:            Field.FieldType;
      Name:             Field.FieldType;
      Number:           Field.FieldType;
      Url:              Field.FieldType;
      NumberArray:      Field.FieldType;
      Password:         Field.FieldType;
      Relationship:     Field.FieldType;
      S3File:           Field.FieldType;
      Select:           Field.FieldType;
      Text:             Field.FieldType;
      TextArray:        Field.FieldType;
      Textarea:         Field.FieldType;
    };
    
  }
  
  export module Field {
    export interface Options {
      type: List.ModelType;
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
    
    export interface FieldType {
      updateItem: (item: any, data: any, callback: () => void) => void;
    }
  }
  
  export class List<T extends mongoose.Document> {
    constructor(name: string, opt?: List.Options<T>);
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
    * instance of @type {(FieldType|Field.Options)}
    */
    public add(...fields: Array<List.FieldMap | string>): void;
    
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
    public paginate(options: List.PaginationOptions): mongoose.DocumentQuery<T[], T>;
    
  }
  
  module List {
    export interface PaginationOptions {
      page: number;
      erPage: number;
      maxPages: number;
    }
    export type ModelType = Field.FieldType | StringConstructor | NumberConstructor | DateConstructor | BooleanConstructor;
    
    export interface FieldMap {
      [key: string]: ModelType | Field.Options | FieldMap; // handle nested types
    }
    export interface Options<T extends mongoose.Document> {
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
    export interface RelationshipOptions {
      ref: string;
      path: string;
      refPath: string;
    }
  }
  
  export function list<T extends mongoose.Document>(name: string): List<T>;
  export function set<T>(key: string, value: T): void;
  export function get<T>(key: string): T;
  export function init(options: Options): void;
  // export function import(what: string): void;
  export function start(): void;
  export const utils: KeystoneUtils;
  export const content: {editable: {}}; // TODO typings for content
  export const  security: {crsf: {}}; // TODO typings for securitfunction readonly List: typeof Keystone.List;
  
}
