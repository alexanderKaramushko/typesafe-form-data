type ExcludeNever<This> = Omit<{
  [Key in keyof This as This[Key] extends never ? never : Key]: This[Key];
}, number | symbol>;

type CreateVirtualData<Name extends string, Value> = {
  _virtualData: Record<Name, Value>
};

type UpdateVirtualData<
  VirtualData extends Record<string, unknown>,
  Name extends string,
  Value,
> = VirtualData[Name] extends string | File
  ? CreateVirtualData<Name, Value | VirtualData[Name]>
  : CreateVirtualData<Name, Value>;

class TypeSafeFormData {

  private formData!: FormData;

  constructor(form?: HTMLFormElement | undefined) {
    this.formData = new FormData(form);
  }

  /**
   * @description Type helper, will always be EMPTY
   * Don't access it directly
   */
  _virtualData = Object.freeze({});

  append<Name extends string, Value extends string | File>(name: Name, value: Value, fileName?: string | undefined) {
    this.formData.append(name, value, fileName);

    return this as this & UpdateVirtualData<this['_virtualData'], Name, Value extends string ? string : File>;
  }

  set<Name extends string, Value extends string | File>(name: Name, value: Value, fileName?: string | undefined) {
    this.formData.set(name, value, fileName);

    return this as this & UpdateVirtualData<this['_virtualData'], Name, Value extends string ? string : File>;
  }

  get<Name extends keyof ExcludeNever<this['_virtualData']>>(name: Name) {
    return this.formData.get(name) as this['_virtualData'][Name];
  }

  getAll<Name extends keyof ExcludeNever<this['_virtualData']>>(name: Name) {
    return this.formData.getAll(name) as this['_virtualData'][Name][];
  }

  has(name: keyof ExcludeNever<this['_virtualData']>) {
    return this.formData.has(name as string);
  }

  delete<Name extends keyof ExcludeNever<this['_virtualData']>>(name: Name) {
    this.formData.delete(name as string);

    return this as this & CreateVirtualData<Name, never>;
  }

  entries() {
    return this.formData.entries() as IterableIterator<[
      keyof ExcludeNever<this['_virtualData']>,
      this['_virtualData'][keyof ExcludeNever<this['_virtualData']>],
    ]>;
  }

  values() {
    return this.formData.values() as IterableIterator<this['_virtualData'][keyof ExcludeNever<this['_virtualData']>]>;
  }

  keys(): IterableIterator<keyof ExcludeNever<this['_virtualData']>> {
    return this.formData.keys() as IterableIterator<keyof ExcludeNever<this['_virtualData']>>;
  }

}

export default TypeSafeFormData;
