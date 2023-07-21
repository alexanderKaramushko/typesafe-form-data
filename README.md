## The wrapper around FormData to bring typesafety based on Fluent interface (method chaining).

### Problem

```ts
const formData = new FormData();

formData.append('one', 'value');

// typechecking just passes without errors
formData.get('two');
```

### Solution

```ts
import TypeSafeFormData from 'typesafe-form-data';

const data1 = formData.append('one', 'value');

// TS will throw error that there's no such property
formData.get('two');

const data2 = formData
  .append('one', 'value')
  .delete('one');

// TS will throw error that there's no such property
formData.get('one');
```

### Known issues

Property deletion won't react on a property restoration:

```ts
import TypeSafeFormData from 'typesafe-form-data';

const data2 = formData
  .append('one', 'value')
  .delete('one')
  .append('one', 'value');

// TS will throw error that there's no such property
formData.get('one');
```

A property overwrite will accumulate previous types:

```ts
import TypeSafeFormData from 'typesafe-form-data';

const data2 = formData
  .append('one', 'value')
  .set('one', new File([], 'name 2'))

// type will be string | File
const value = formData.get('one');
```
