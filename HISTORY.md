# History

## v3.1.0 2019 September 10

-   Updated [base files](https://github.com/bevry/base) and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Updated dependencies

## v3.0.0 2018 January 26

-   Converted from CoffeeScript to ESNext
-   Uses [Editions](https://github.com/bevry/editions) to automatically select the appropriate edition for your environment
-   Fixed setting values in which a parent may be undefined
    -   Before you would get `TypeError: Cannot read property 'set' of undefined`
    -   As this changes functionality, it is a new major
-   Updated dependencies
-   Updated base files

## v2.1.0 2013 April 10

-   Removed explicit support for `attributes` and added getter `get(key)` and setter `set(attrs,opts)` support instead
-   Changed `onlyIfEmpty` argument on `setDeep` into an `opts` object

## v2.0.0 2013 March 27

-   Split away from [bal-util](https://github.com/balupton/bal-util)