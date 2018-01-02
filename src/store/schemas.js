import { schema } from 'normalizr';

export const translationDictum = new schema.Entity('translationDictum');
export const translationDictumGroup = new schema.Entity('translationDictumGroup');
export const originalDictum = new schema.Entity('originalDictum');

originalDictum.define({translations: [translationDictum]});
originalDictum.define({translation_groups: [translationDictumGroup]});

translationDictum.define({group: translationDictumGroup});
translationDictum.define({original: originalDictum});

translationDictumGroup.define({originalDictum});
translationDictumGroup.define({translations: [translationDictum]});

export const schemas = {
    'translationDictum': translationDictum,
    'ranslationDictumGroup': translationDictumGroup,
    'originalDictum': originalDictum,
}