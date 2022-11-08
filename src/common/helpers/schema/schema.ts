import concat from 'lodash/concat';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';

export function mergeSchemas(...schemas) {
  const fieldsets = [];
  let properties = {};
  let required = [];

  map(schemas, (schema) => {
    map(schema.fieldsets, (fieldset) => {
      // Find fieldset
      const index = findIndex(fieldsets, (entry) => entry.id === fieldset.id);
      // Check if already exists
      if (index !== -1) {
        // Append fields
        fieldsets[index].fields = [
          ...fieldsets[index].fields,
          ...fieldset.fields,
        ];
      } else {
        // Add new fieldset
        fieldsets.push(fieldset);
      }
    });
    properties = {
      ...properties,
      ...schema.properties,
    };
    if (schema.required) {
      required = concat(required, schema.required);
    }
  });

  return {
    fieldsets,
    properties,
    required,
  };
}
