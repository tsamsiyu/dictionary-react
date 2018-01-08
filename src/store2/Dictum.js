import { types } from 'mobx-state-tree';

export const TranslationDictum = types.model('TranslationDictum', {
    id: types.identifier(),
    spelling: types.string,
    origin: () => types.reference(OriginalDictum),
});

export const TranslationGroup = types.model('TranslationGroup', {
    id: types.identifier(),
    explanation: types.string,
    translations: types.array(TranslationDictum),
});

export const OriginalDictum = types.model('OriginalDictum', {
    id: types.identifier(),
    spelling: types.string,
    translations: types.array(TranslationDictum),
    groups: types.array(TranslationGroup),
});