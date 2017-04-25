declare module 'keystone-utils' {
  /**
  * Determines if `arg` is a export function.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isFunction(arg: any): boolean;
  /**
  * Determines if `arg` is an object.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isObject(arg: any): boolean;
  /**
  * Determines if `arg` looks like a valid mongo ObjectId
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isValidObjectId(arg: any): boolean;
  /**
  * Determines if `arg` is an array.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isArray(arg: any): boolean;
  /**
  * Determines if `arg` is a date.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isDate(arg: any): boolean;
  /**
  * Determines if `arg` is a string.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isString(arg: any): boolean;
  /**
  * Determines if `arg` is a number.
  *
  * @param {Object|Array|String|Function|RegExp|any} arg
  * @return {Boolean}
  * @api public
  */
  export function isNumber(arg: any): boolean;
  
  /**
  * Make sure an email address looks valid.
  * May cause false-negatives in extremely rare cases, see
  * http://www.regular-expressions.info/email.html
  *
  * @param {String} str
  * @return {String}
  * @api public
  */
  export function isEmail(arg: string): boolean;
  
  /**
  * Determines if `arg` is a base64 encoded data URI.
  *
  * @param {String} arg
  * @return {Boolean}
  * @api public
  */
  export function isDataURL(arg: string): boolean;
  
  /**
  * Applies options to a defaults object.
  *
  * @param {Object} defaults (will be modified by reference)
  * @param {Object} options (will be assigned)
  * @return {Object} merged defaults and options
  * @api public
  */
  export function options(defaults: {}, ops: {}): {};
  
  /**
  * Creates a map of options
  *
  * @param {Array} options
  * @param {String} property to map
  * @param {Boolean} clone the options?
  * @return {Object} the map object
  * @api public
  */
  export function optionsMap(arr: Array<{}>, property: string, clone?: boolean): {};
  /**
  * No operation
  */
  export function noop(): void;
  
  /**
  * Defers a export function invocation with `process.nextTick()` and invokes it with
  * the rest of the arguments. Less Zalgo with less code.
  *
  * @param {Function} export function to call
  */
  export function defer(fn: (...args: any[]) => any): void;
  
  /**
  * Recursively binds method properties of an object to a scope
  * and returns a new object containing the bound methods
  *
  * @param {Object} object with method properties, can be nested in other objects
  * @param {Object} scope to bind as `this`
  * @return {Object} a new object containing the bound methods
  * @api public
  */
  export function bindMethods(obj: {}, scope: {}): {};
  
  /**
  * Generates a 'random' string of characters to the specified length.
  *
  * @param {Number or Array}   len      the length of string to generate, can be a range (Array), Defaults to 10.
  * @param {String}            chars    characters to include in the string, defaults to
  * `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`
  * @return {String}
  * @api public
  */
  export function randomString(len: number | number[]): string;
  
  /**
  * Converts a string to a number, accepting human-friendly input, e.g.
  * - 1,432
  * - $1432
  * - 2.5
  *
  * @param {String} input
  * @return {Number} number
  * @api public
  */
  export function number(str: string): number;
  
  /**
  * Escapes a string to be safely converted to a regular expression
  *
  * @param {String} string
  * @return {String} escaped string
  * @api public
  */
  export function escapeRegExp(str: string): string;
  
  /**
  * Escapes a string to be safely used as a literal Javascript string
  *
  * @param {String} string
  * @return {String} escaped string
  * @api public
  */
  export function escapeString(str: string): string;
  
  /**
  * Strips diacritics from a string, replacing them with their simple equivalents
  *
  * @param {String} string
  * @return {String} stripped string
  * @api public
  */
  export function stripDiacritics(str: string): string;
  
  /**
  * Transliterates Russian and Ukrainian words from cyrillic to latin.
  *
  * @param  {String} word
  * @return {String} transliterated word
  * @api public
  */
  export function transliterate(str: string): string;
  
  /**
  * Generates a slug from a string. Word breaks are hyphenated.
  *
  * You can optionally provide a custom separator.
  *
  * @param {String} str
  * @param {String} sep (defaults to '-')
  * @param {Object} options (defaults to {})
  * @return {String} slug
  * @api public
  */
  export function  slug(str: string, sep?: string, options?: {}): string;
  
  /**
  * Converts a string to its singular form
  *
  * @param {String} str
  * @return {String} singular form of str
  * @api public
  */
  export function singular(str: string): string;
  
  /**
  * Displays the singular or plural of a string based on a number
  * or number of items in an array.
  *
  * If arity is 1, returns the plural form of the word.
  *
  * @param {String} count
  * @param {String} singular string
  * @param {String} plural string
  * @return {String} singular or plural, * is replaced with count
  * @api public
  */
  export function plural(count: number |string | {}, singular: string, plural: string): string;
  /**
  * Converts the first letter in a string to uppercase
  *
  * @param {String} str
  * @return {String} Str
  * @api public
  */
  export function upcase(str: string): string;
  
  // TODO rest of the stuff
}