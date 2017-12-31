import { schema } from 'normalizr';

const translation = schema.Entity('translation');
const translationGroup = schema.Entity('translationGroup');
const word = schema.Entity('words');

word.define({translations: [translation]});
word.define({translationGroups: [translationGroup]});

translation.define({group: translationGroup});
translation.define({word});

translationGroup.define({word});