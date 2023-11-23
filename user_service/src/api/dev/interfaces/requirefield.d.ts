interface FieldValue {
    value?: string | number | boolean | { [key: string]: FieldValue };
}
  
interface RequiredFields {
    body?: { [key: string]: FieldValue };
    query?: { [key: string]: FieldValue };
    params?: { [key: string]: FieldValue };
}