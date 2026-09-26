// Generated from Jam-UI I18nCore by jaml-lsp extract. Do not edit.
const commonSymbols = `[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]`;
const numberPattern = '[+-]?\\d*\\.?\\d+([Ee][+-]?\\d+)?';
const uriEncodedRegex = /(%[0-9A-Fa-f]{2})+/;
const colorPartExpr = /^\s*([+\-\*\/])\s*(.+)\s*$/;
/**
| Character Type | Unicode Range      | RegExp Pattern           | Notes                                                        |
|----------------|-------------------|--------------------------|--------------------------------------------------------------|
| Han (CJK Unified Ideographs) | \u4E00–\u9FFF | /[\u4E00-\u9FFF]/g      | Common Han characters used in Chinese, Japanese (Kanji), and Korean |
| Hiragana       | \u3040–\u309F     | /[\u3040-\u309F]/g       | Japanese syllabary for native words                          |
| Katakana       | \u30A0–\u30FF     | /[\u30A0-\u30FF]/g       | Japanese syllabary for foreign words and emphasis            |
| Hangul (Korean)| \uAC00–\uD7AF     | /[\uAC00-\uD7AF]/g       | Korean syllables (Hangul)                                    |
| Kanji (Japanese Han) | \u4E00–\u9FFF | Same as Han              | Kanji is a subset of Han characters used in Japanese         |
*/
const eastAsianRegex = /[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/g;
const inlineStyleRegex = /^\s*([a-zA-Z0-9-_.]+\s*:\s*.+)+\s*$/;
const literalObjectRegex = /^\s*(((`[^`]+`|'[^']+'|"[^"]+"|\{.+\}|\[.+\]|true|false|[+-]?\d*\.?\d+([Ee][+-]?\d+)?)(\s*,\s*)?))+\s*$/;

const Pattern = /*#__PURE__*/ Object.freeze(
    /*#__PURE__*/ Object.defineProperty(
        {
            __proto__: null,
            colorPartExpr,
            commonSymbols,
            eastAsianRegex,
            inlineStyleRegex,
            literalObjectRegex,
            numberPattern,
            uriEncodedRegex
        },
        Symbol.toStringTag,
        { value: 'Module' }
    )
);

const arrowFuncStarter = /^\s*(\(.*\)|\w+)\s*=>\s*[^\s]+/;
const traditionalFuncStarter = /^\s*function\s*(\w+\s*)?\(.*\)\s*\{/;
const attrPrefix = /^j(am)?-/;
const anyNumberMatcher = RegExp(numberPattern, 'g');
const pureNumberMatcher = RegExp('^' + numberPattern + '$');
const selectorMatcher = /(?<=(\}|^)\s*)([^{}@%]+)(?=\s*{)/g;
const decoratorMatcher = /^[\w.]+\((\s*(\(.*\)|\w+)\s*=>.+|\s*function\s*(\w+\s*)?\(.*\)\s*\{.*\}).*\)$/;

const Matcher = /*#__PURE__*/ Object.freeze(
    /*#__PURE__*/ Object.defineProperty(
        {
            __proto__: null,
            anyNumberMatcher,
            arrowFuncStarter,
            attrPrefix,
            decoratorMatcher,
            pureNumberMatcher,
            selectorMatcher,
            traditionalFuncStarter
        },
        Symbol.toStringTag,
        { value: 'Module' }
    )
);

// 字符串相关的方法
function formatValues(str, values, formatter = formatField) {
    const _dic = values;
    let _automaticIndex = 0;
    let _indexMode;
    let _result = '';
    for (let i = 0; i < str.length; ) {
        const _char = str[i];
        if ((_char === '{' || _char === '}') && str[i + 1] === _char) {
            _result += _char;
            i += 2;
            continue;
        }
        if (_char !== '{') {
            _result += _char;
            i++;
            continue;
        }
        let _end = i + 1;
        let _depth = 1;
        for (; _end < str.length; _end++) {
            if (str[_end] === '{') {
                _depth++;
            } else if (str[_end] === '}' && --_depth === 0) {
                break;
            }
        }
        if (_end === str.length) {
            _result += str.slice(i);
            break;
        }
        const _field = str.slice(i + 1, _end);
        const _placeholder = str.slice(i, _end + 1);
        i = _end + 1;
        if (_field.includes('{')) {
            throw new Error('Nested format fields are not supported');
        }
        // Existing dictionary keys take precedence, including keys containing a colon.
        if (_field.includes(':') && Object.prototype.hasOwnProperty.call(_dic, _field) && _dic[_field] !== undefined) {
            _result += String(_dic[_field]);
            continue;
        }
        const _separator = _field.indexOf(':');
        let _key = _separator < 0 ? _field : _field.slice(0, _separator);
        const _spec = _separator < 0 ? '' : _field.slice(_separator + 1);
        if (_key === '' || /^\d+$/.test(_key)) {
            const _mode = _key === '' ? 'automatic' : 'manual';
            if (_indexMode && _indexMode !== _mode) {
                throw new Error('Cannot mix automatic and manual format indexes');
            }
            _indexMode = _mode;
            if (_mode === 'automatic') {
                _key = String(_automaticIndex++);
            }
        }
        if (!Object.prototype.hasOwnProperty.call(_dic, _key) || _dic[_key] === undefined) {
            _result += _placeholder;
            continue;
        }
        _result += formatter(_dic[_key], _spec);
    }
    return _result;
}
function formatField(value, specification) {
    if (!specification) {
        return String(value);
    }
    const _match = /^(?:([\s\S])?([<>=^]))?([+ -])?(0)?(\d+)?(?:\.(\d+))?([sdf%])?$/u.exec(specification);
    if (!_match) {
        throw new Error(`Unsupported format specification: ${specification}`);
    }
    const [, fill, alignment, sign, zero, width, precision, type] = _match;
    const _numeric = typeof value === 'number';
    const _type = type || '';
    const _width = width === undefined ? 0 : Number(width);
    const _precision = precision === undefined ? undefined : Number(precision);
    const _fill = fill ?? (zero ? '0' : ' ');
    const _alignment = alignment || (_numeric ? (zero ? '=' : '>') : '<');
    if (!Number.isSafeInteger(_width) || _width > 100000 || (_precision !== undefined && (!Number.isSafeInteger(_precision) || _precision > 100))) {
        throw new RangeError('Format width must be at most 100000 and precision at most 100');
    }
    let _text;
    let _sign = '';
    if (_numeric && _type !== 's') {
        if (!_type && _precision !== undefined) {
            throw new Error('Numeric precision requires an explicit f or % format');
        }
        if (_type === 'd' && (!Number.isInteger(value) || _precision !== undefined)) {
            throw new TypeError('The d format requires an integer and does not accept precision');
        }
        const _absolute = Math.abs(value);
        _sign = value < 0 || Object.is(value, -0) ? '-' : sign === '+' ? '+' : sign === ' ' ? ' ' : '';
        if (_type === 'f' || _type === '%') {
            _text = formatFixed(_type === '%' ? _absolute * 100 : _absolute, _precision ?? 6);
            if (_type === '%') {
                _text += '%';
            }
        } else if (_type === 'd') {
            _text = formatFixed(_absolute, 0);
        } else {
            _text = String(_absolute);
        }
    } else {
        if ((_type && _type !== 's') || (_type === 's' && typeof value !== 'string') || sign || _alignment === '=') {
            throw new TypeError(`Format specification ${specification} is not valid for this value`);
        }
        _text = String(value);
        if (_precision !== undefined) {
            _text = Array.from(_text).slice(0, _precision).join('');
        }
    }
    const _padding = Math.max(0, _width - Array.from(_sign + _text).length);
    if (_alignment === '=') {
        return _sign + _fill.repeat(_padding) + _text;
    }
    _text = _sign + _text;
    if (_alignment === '<') {
        return _text + _fill.repeat(_padding);
    }
    if (_alignment === '^') {
        const _left = Math.floor(_padding / 2);
        return _fill.repeat(_left) + _text + _fill.repeat(_padding - _left);
    }
    return _fill.repeat(_padding) + _text;
}
function formatFixed(value, precision) {
    if (!Number.isFinite(value)) {
        return Number.isNaN(value) ? 'nan' : 'inf';
    }
    if (value >= 1e21) {
        return BigInt(value).toString() + (precision ? '.' + '0'.repeat(precision) : '');
    }
    let _text = value.toFixed(precision);
    // Python rounds exact halfway values to even; toFixed rounds them away from zero.
    const _halfway = value * Math.pow(2, precision + 1);
    const _lastDigit = Number(_text.slice(-1));
    if (Number.isInteger(_halfway) && _halfway % 2 === 1 && _lastDigit % 2 === 1) {
        _text = _text.slice(0, -1) + String(_lastDigit - 1);
    }
    return _text;
}

/** Split catalog options or @tr arguments without splitting quoted or nested values. */
function splitI18nValues(source, delimiter) {
    const _parts = [];
    const _stack = [];
    let _quote = '';
    let _start = 0;
    for (let i = 0; i < source.length; i++) {
        const _char = source[i];
        if (_char === '\\') {
            i++;
        } else if (_quote) {
            if (_char === _quote) {
                _quote = '';
            }
        } else if ((_char === '"' || _char === "'") && !(/[\p{L}\p{N}]/u.test(source[i - 1] || '') && /[\p{L}\p{N}]/u.test(source[i + 1] || ''))) {
            _quote = _char;
        } else if ('([{'.includes(_char)) {
            _stack.push(_char);
        } else if (')]}'.includes(_char)) {
            if (_stack.pop() !== '([{'[')]}'.indexOf(_char)]) {
                throw new SyntaxError('Unbalanced translation argument');
            }
        } else if (_char === delimiter && !_stack.length) {
            _parts.push(source.slice(_start, i).trim());
            _start = i + 1;
        }
    }
    if (_quote || _stack.length) {
        throw new SyntaxError('Unclosed translation value');
    }
    _parts.push(source.slice(_start).trim());
    return _parts;
}
function unquoteI18n(value) {
    if (value.startsWith('"')) {
        return JSON.parse(value);
    }
    if (value.startsWith("'")) {
        if (!value.endsWith("'")) {
            throw new SyntaxError('Unclosed translation string');
        }
        return value
            .slice(1, -1)
            .replace(/\\(['\\;:,])/g, '$1')
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t');
    }
    return value.replace(/\\([;:,\\])/g, '$1');
}
function isTranslationWrapper(value) {
    return typeof value === 'string' && /^@tr\([\s\S]*\)$/.test(value.trim());
}
/** Parse a recognized wrapper without resolving its values or subscribing to locale changes. */
function parseTranslationExpression(source) {
    const _parts = splitI18nValues(source.trim().slice(4, -1), ',');
    const _key = unquoteI18n(_parts.shift());
    if (!/^[\p{L}\p{N}_./-]+$/u.test(_key)) {
        throw new SyntaxError('Invalid translation key');
    }
    const _parse = (value) => {
        if (value.startsWith('@tr(')) {
            throw new SyntaxError('Nested @tr wrappers are not supported');
        }
        if (/^\{\{(?:(?!\{\{|\}\}).)*\}\}$/.test(value)) {
            return value;
        }
        if (value.startsWith('{') && value.endsWith('}')) {
            const _result = {};
            for (const _pair of value.slice(1, -1).trim() ? splitI18nValues(value.slice(1, -1), ',') : []) {
                const _parts = splitI18nValues(_pair, ':');
                if (_parts.length !== 2) {
                    throw new SyntaxError('Invalid named translation argument');
                }
                Object.defineProperty(_result, unquoteI18n(_parts[0]), { value: _parse(_parts[1]), enumerable: true, writable: true, configurable: true });
            }
            return _result;
        }
        if (value.startsWith('[') && value.endsWith(']')) {
            return value.slice(1, -1).trim() ? splitI18nValues(value.slice(1, -1), ',').map(_parse) : [];
        }
        if (/^["']/.test(value)) {
            const _text = unquoteI18n(value);
            if (isTranslationWrapper(_text)) {
                throw new SyntaxError('Nested @tr wrappers are not supported');
            }
            return _text;
        }
        if (/^(true|false|null|-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)$/i.test(value)) {
            return JSON.parse(value);
        }
        throw new SyntaxError('Translation arguments must be literals or {{bindings}}');
    };
    const _args = _parts.map(_parse);
    if (_args.length > 1 && _args[0] !== null && typeof _args[0] === 'object' && !Array.isArray(_args[0])) {
        throw new TypeError('Named translation arguments must be the only argument after the key');
    }
    return { key: _key, args: _args };
}
/** Quoting does not make binding text literal to the component binder. */
function hasTranslationBindings(expression) {
    const _hasBinding = (value) => {
        if (typeof value === 'string') {
            return /\{\{.+\}\}/.test(value);
        }
        return value !== null && typeof value === 'object' && Object.values(value).some(_hasBinding);
    };
    return expression.args.some(_hasBinding);
}
const pluralRules = new Map();
function formatMessage(template, values, locale) {
    return formatValues(template, values, (value, specification) => {
        const [_format, ..._entries] = splitI18nValues(specification, ';');
        if (!_entries.length) {
            return formatField(value, _format);
        }
        const _options = Object.create(null);
        for (const _entry of _entries) {
            const _separator = _entry.indexOf(':');
            const _key = _entry.slice(0, _separator).trim();
            if (_separator < 0 || !['zero', 'one', 'two', 'few', 'many', 'other', 'unit', 'long', 'short', 'narrow', 'none', 'display'].includes(_key)) {
                throw new SyntaxError(`Unknown translation format option: ${_entry}`);
            }
            if (_key in _options) {
                throw new SyntaxError(`Duplicate translation format option: ${_key}`);
            }
            _options[_key] = _entry.slice(_separator + 1).trim();
        }
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            throw new TypeError('Quantity formatting requires a finite number');
        }
        const _number = formatField(value, _format);
        if (!pluralRules.has(locale)) {
            pluralRules.set(locale, new Intl.PluralRules(locale));
        }
        const _category = pluralRules.get(locale).select(value);
        const _display = _options.display || 'long';
        if (!['long', 'short', 'narrow'].includes(_display)) {
            throw new SyntaxError(`Unknown quantity display: ${_display}`);
        }
        const _none = value === 0 && _options.none !== undefined;
        const _full = _options[_category] ?? _options.other ?? _options.unit ?? _options.long;
        const _label = _none ? _options.none : _display === 'long' ? (_full ?? _options.short ?? _options.narrow ?? '') : (_options[_display] ?? _options.short ?? _full ?? '');
        const _quoted = /^["']/.test(_label);
        const _text = unquoteI18n(_label);
        let _hasFormat = false;
        const _rendered = _text.replace(/%%|%([+ ]?0?\d*(?:\.\d+)?[sdf])/g, (token, spec) => {
            if (token === '%%') {
                return '%';
            }
            _hasFormat = true;
            return spec === 's' ? _number : formatField(value, spec);
        });
        if (_none || _quoted || _hasFormat) {
            return _rendered;
        }
        return _number + (_rendered ? (_display === 'narrow' ? '' : ' ') + _rendered : '');
    });
}

function defineGlobal(property, value, context = globalThis, overwrite = false) {
    if (property in context && !overwrite) {
        return;
    }
    let _placeholder = null;
    Object.defineProperty(context, property, {
        get: () => {
            if (_placeholder === null) {
                _placeholder = value();
            }
            return _placeholder;
        }
    });
}

var State;
(function (State) {
    State['ready'] = '=rEaDy=';
    State['pushed'] = '=pUsHeD=';
    State['initial'] = '=iNiTiAl=';
    State['updated'] = '=uPdAtEd=';
    State['expired'] = '=eXpIrEd=';
    State['deleted'] = '=dElEtEd=';
    State['invalid'] = '=iNvAlId=';
    State['sliced'] = '=sLiCeD=';
    State['confirmed'] = '=cOnFiRmEd=';
    State['registered'] = '=rEgIsTeReD=';
    State['timeout'] = '=tImEoUt=';
    State['original'] = '=oRiGiNaL=';
})(State || (State = {}));
var MsgrRole;
(function (MsgrRole) {
    MsgrRole['observer'] = 'obsv';
    MsgrRole['publisher'] = 'pubr';
    MsgrRole['subscriber'] = 'subr';
    MsgrRole['requester'] = 'reqr';
    MsgrRole['listener'] = 'lsnr';
    MsgrRole['messenger'] = 'msgr';
    MsgrRole['responder'] = 'resp';
    MsgrRole['watcher'] = 'wchr';
    MsgrRole['broker'] = 'brok';
})(MsgrRole || (MsgrRole = {}));
var Constants;
(function (Constants) {
    Constants['nothing'] = '=nOtHiNg=';
    Constants['everything'] = '=eVeRyThInG=';
    Constants['anything'] = '=aNyThInG=';
    Constants['none'] = '=nOnE=';
    Constants['everyone'] = '=eVeRyOnE=';
    Constants['anyone'] = '=aNyOnE=';
    Constants['empty'] = '';
    Constants['register'] = '=rEgIsTeR=';
    Constants['unknown'] = '=uNkNoWn=';
    Constants['placeholder'] = '=pLaCeHoLdEr=';
    Constants['default'] = '=dEfAuLt=';
    Constants['message'] = '=mEsSaGe=';
    Constants['jaml'] = 'JAML\u00AE';
    Constants['jamui'] = 'JAM-UI\u00AE';
    Constants['jamlogo'] = '<jam-indicator styles="indicator.jaml">JAML\u00AE</jam-indicator>';
    Constants['jamuilogo'] = '<jam-indicator styles="indicator.jamui">JAM-UI\u00AE</jam-indicator>';
    Constants['a2z'] = 'abcdefghijklmnopqrstuvwxyz';
    Constants['A2Z'] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    Constants['a2Z'] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    Constants['a2z0'] = 'abcdefghijklmnopqrstuvwxyz0123456789';
    Constants['A2Z0'] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    Constants['a2Z0'] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    Constants['ascs'] = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
})(Constants || (Constants = {}));
var CommandRole;
(function (CommandRole) {
    CommandRole['asBridge'] = '=aSbRiDgE=';
    CommandRole['commander'] = '=cOmMaNdEr=';
    CommandRole['commandee'] = '=cOmMaNdEe=';
})(CommandRole || (CommandRole = {}));
var Todo;
(function (Todo) {
    // data
    Todo['toDelete'] = '=tOdElEtE=';
    Todo['toUpdate'] = '=tOuPdAtE=';
    // messenger
    Todo['toPub'] = '=tOpUb=';
    Todo['toRemove'] = '=tOrEmOvE=';
    Todo['toSub'] = '=tOsUb=';
    Todo['toUnsub'] = '=tOuNsUb=';
    Todo['toConfirm'] = '=tOcOnFiRm=';
    Todo['toBridge'] = '=tObRiDgE=';
    // message
    Todo['callback'] = '=cAlLbAcK=';
    Todo['toFetch'] = '=tOfEtCh=';
    // others
    Todo['toDestroy'] = '=tOdEsTrOy=';
    Todo['doNothing'] = '=dOnOtHiNg=';
    Todo['toAppend'] = '=tOaPpEnD=';
})(Todo || (Todo = {}));
var SortType;
(function (SortType) {
    SortType['ascendabs'] = 'ascendabs';
    SortType['descendabs'] = 'descendabs';
    SortType['ascend'] = 'ascend';
    SortType['descend'] = 'descend';
    SortType['none'] = 'none';
})(SortType || (SortType = {}));
var AlignType;
(function (AlignType) {
    AlignType['center'] = 'center';
    AlignType['right'] = 'right';
    AlignType['left'] = 'left';
})(AlignType || (AlignType = {}));
var Threshold;
(function (Threshold) {
    Threshold[(Threshold['doherty'] = 400)] = 'doherty';
    Threshold[(Threshold['maxRequestTimeout'] = 60000)] = 'maxRequestTimeout';
})(Threshold || (Threshold = {}));
var Duration;
(function (Duration) {
    Duration[(Duration['smoothScroll'] = 700)] = 'smoothScroll';
})(Duration || (Duration = {}));
const constantExports = {
    State,
    MsgrRole,
    Constants,
    CommandRole,
    Todo,
    SortType,
    AlignType,
    Pattern,
    Matcher
};
(() => {
    defineGlobal('jar', () => constantExports);
})();

var type = (arg) => arg;
var types = {
    array: type('array'),
    string: type('string'),
    regexp: type('regexp'),
    number: type('number'),
    symbol: type('symbol'),
    boolean: type('boolean'),
    any: type('any'),
    dictionary: type('dictionary'),
    function: type('function'),
    dictionaryOrString: type('dictionaryOrString'),
    dictionaryOrBoolean: type('dictionaryOrBoolean'),
    numberOrString: type('numberOrString'),
    booleanOrString: type('booleanOrString'),
    functionOrString: type('functionOrString'),
    functionOrNumber: type('functionOrNumber'),
    functionOrAny: type('functionOrAny'),
    booleanOrNumber: type('booleanOrNumber'),
    arrayOrString: type('arrayOrString'),
    booleanOrArray: type('booleanOrArray'),
    date: type('date'),
    promise: type('promise'),
    promiseOrFunction: type('promiseOrString')
};
var Type = (arg) => type(arg);
Object.assign(Type, types);

// object 相关的处理方法
function nullOrUndefined(o) {
    return o === undefined || o === null;
}
function isPOO(o) {
    if (nullOrUndefined(o) || typeof o !== 'object' || Array.isArray(o)) {
        return false;
    }
    const _proto = Object.getPrototypeOf(o);
    return _proto === null || _proto === Object.prototype;
}

function canonicalLocale(value) {
    return Intl.getCanonicalLocales(value)[0];
}
/** The shared synchronous catalog engine; loading and notifications belong to its host. */
class I18nCore {
    catalogs = new Map();
    fallbackLocale;
    defaultMessages;
    constructor(options = {}) {
        this.fallbackLocale = canonicalLocale(options.fallbackLocale ?? 'en');
        this.defaultMessages = { ...options.defaultMessages };
        this.catalogs.set('en', new Map(Object.entries(this.defaultMessages)));
    }
    setFallbackLocale(value) {
        this.fallbackLocale = canonicalLocale(value);
    }
    localeChain(value) {
        const _parts = new Intl.Locale(canonicalLocale(value)).baseName.split('-');
        const _chain = [];
        while (_parts.length) {
            _chain.push(_parts.join('-'));
            _parts.pop();
        }
        if (!_chain.includes(this.fallbackLocale)) {
            _chain.push(this.fallbackLocale);
        }
        return _chain;
    }
    registerTranslations(language, messages) {
        const _locale = canonicalLocale(language);
        const _entries = new Map();
        const _visit = (value, path) => {
            if (typeof value === 'string') {
                _entries.set(path, value);
            } else if (isPOO(value)) {
                Object.entries(value).forEach(([key, child]) => _visit(child, path ? `${path}.${key}` : key));
            } else {
                throw new TypeError(`Translation ${path} must be a string or dictionary`);
            }
        };
        if (!isPOO(messages)) {
            throw new TypeError('A translation catalog must be a dictionary');
        }
        _visit(messages, '');
        const _catalog = this.catalogs.get(_locale) ?? new Map();
        _entries.forEach((value, key) => _catalog.set(key, value));
        this.catalogs.set(_locale, _catalog);
    }
    hasTranslation(language, key) {
        return this.catalogs.get(canonicalLocale(language))?.has(key) ?? false;
    }
    resolve(key, locale) {
        for (const language of this.localeChain(locale)) {
            const _message = this.catalogs.get(language)?.get(key);
            if (_message !== undefined) {
                return { message: _message, locale: language };
            }
        }
        const _default = this.defaultMessages[key];
        return typeof _default === 'string' ? { message: _default, locale: 'en' } : undefined;
    }
    translate(key, values = [], locale = 'en') {
        const _resolved = this.resolve(key, locale);
        return _resolved ? formatMessage(_resolved.message, values, _resolved.locale) : key;
    }
}

export { I18nCore, canonicalLocale, hasTranslationBindings, isTranslationWrapper, parseTranslationExpression };
