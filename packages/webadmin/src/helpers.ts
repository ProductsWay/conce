export function isArrayString(value: any) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function convertToArrayValues<T>(
  values:
    | Array<T>
    | Array<{
        value: T;
        label: string;
      }>
) {
  if (isArrayString(values)) {
    return values;
  }

  return Array.isArray(values) ? values.map((item) => (item as any).value) : values;
}

export function convertToSelectedValue<T>(
  selectedItem:
    | T
    | {
        value: T;
        label: string;
      }
    | null
    | undefined
) {
  if (typeof selectedItem === "object" && !!selectedItem) {
    return (selectedItem as any).value;
  }

  return selectedItem;
}
