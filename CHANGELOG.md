## 2.2.0
- New action/reducer pair `setUserData` for putting user data into state

## 2.1.0
- New action/reducer pair `hydrateState` for preloading the state with a given day/exercise structure
- Bugfix for an exercise title that went missing during updates

## 2.0.0
- Use [immutable.js](https://facebook.github.io/immutable-js/) instead of plain javascript objects. Potentially breaking change is that Arrays are now Lists and elements can't be read using `list[idx]`. The way to get an element out of an Immutable List is `list.get(idx)`.

  ### 2.0.1
  - Internal rewrite using [redux-saga](https://github.com/yelouafi/redux-saga)

  ### 2.0.2
  - Bugfixes

  ### 2.0.3
  - Keep number of sets when updating days

## 1.2.0
- Support adding new exercises

## 1.1.0
- Can mark exercises as finished

  ### 1.1.1
  - Fix off by one error in days state

  ### 1.1.2
  - Bugfix: No longer resets all other exercises when editing

  ### 1.1.3
  - Bugfix: Fix crash when marking exercise complete

## 1.0.0
- First release

  ### 1.0.1
  - Fix absolute path in import bug
