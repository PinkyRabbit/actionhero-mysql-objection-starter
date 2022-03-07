/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-import",
        "eslint-plugin-jsdoc",
        "eslint-plugin-jest",
        "eslint-plugin-security",
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "Object": {
                        "message": "Avoid using the `Object` type. Did you mean `object`?"
                    },
                    "Function": {
                        "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                    },
                    "Boolean": {
                        "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
                    },
                    "Number": {
                        "message": "Avoid using the `Number` type. Did you mean `number`?"
                    },
                    "String": {
                        "message": "Avoid using the `String` type. Did you mean `string`?"
                    },
                    "Symbol": {
                        "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
                    }
                }
            }
        ],
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                "path": "always",
                "types": "prefer-import",
                "lib": "always"
            }
        ],
        "@typescript-eslint/typedef": "off",
        "@typescript-eslint/unified-signatures": "error",
        "complexity": "off",
        "no-shadow": "off",
        "constructor-super": "error",
        "dot-notation": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-denylist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "import/no-internal-modules": "off",
        "import/order": "off",
        "jest/no-focused-tests": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",
        "jsdoc/newline-after-description": "error",
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": [
            "error",
            {
                "code": 150
            }
        ],
        "max-statements": [
            "error",
            100
        ],
        "new-parens": "error",
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-empty": "error",
        "no-empty-function": "error",
        "no-eval": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "off",
        "no-invalid-regexp": "error",
        "no-invalid-this": "off",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-regex-spaces": "error",
        "no-restricted-syntax": [
            "error",
            {
                "message": "Forbidden call to document.cookie",
                "selector": "MemberExpression[object.name=\"document\"][property.name=\"cookie\"]"
            }
        ],
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-use-before-define": "off",
        "no-var": "error",
        "no-warning-comments": [
            "error",
            {
                "location": "anywhere",
                "terms": [
                    "BUG",
                    "HACK",
                    "FIXME",
                    "LATER",
                    "LATER2",
                    "TODO"
                ]
            }
        ],
        "no-with": "error",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-const": "error",
        "quotes": "off",
        "radix": "error",
        "security/detect-non-literal-fs-filename": "error",
        "security/detect-non-literal-require": "error",
        "security/detect-possible-timing-attacks": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                "markers": [
                    "/"
                ]
            }
        ],
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "chai-prefer-contains-to-index-of": true,
                    "chai-vague-errors": true,
                    "function-name": true,
                    "import-name": true,
                    "informative-docs": true,
                    "insecure-random": true,
                    "jquery-deferred-must-complete": true,
                    "mocha-no-side-effect-code": true,
                    "mocha-unneeded-done": true,
                    "no-backbone-get-set-outside-model": true,
                    "no-disable-auto-sanitization": true,
                    "no-http-string": [
                        true,
                        "http://www.example.com/?.*",
                        "http://localhost:?.*"
                    ],
                    "no-inner-html": true,
                    "no-jquery-raw-elements": true,
                    "no-single-line-block-comment": true,
                    "no-string-based-set-immediate": true,
                    "no-string-based-set-interval": true,
                    "no-string-based-set-timeout": true,
                    "no-typeof-undefined": true,
                    "no-unnecessary-local-variable": true,
                    "no-unnecessary-override": true,
                    "no-unsupported-browser-code": true,
                    "no-useless-files": true,
                    "prefer-type-cast": true,
                    "promise-must-complete": true,
                    "use-named-parameter": true,
                    "use-simple-attributes": true
                }
            }
        ]
    }
};