export const EXPAND_CHANGE = 'EXPAND_CHANGE';
export const expandChange = field => (
    {
        type: EXPAND_CHANGE,
        field,
    }
);

export const FIELD_CHANGE = 'FIELD_CHANGE';
export const fieldChange = (field, value) => (
    {
        type: FIELD_CHANGE,
        field,
        value,
    }
);

export const LABEL_CHANGE = 'LABEL_CHANGE';
export const labelChange = (field, value, notes) => (
    {
        type: LABEL_CHANGE,
        field,
        value,
        notes,
    }
);
