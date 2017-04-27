import * as keystone from 'keystone';
const Types = keystone.Field.Types;

export interface StaticPage {
  name: string;
  route: string;
  active: boolean;
  showInMenu: boolean;
  menuOrder: number;
  content: string;
}

const StaticPage = new keystone.List<StaticPage>('StaticPage', {
  map: { name: 'name' },
  autokey: { from: 'name', path: 'slug', unique: true },
  defaultSort: '-name',
});

StaticPage.add({
  name: {type: String, required: true, initial: true},
  route: {type: String},
  active: Boolean,
  showInMenu: Boolean,
  menuOrder: {type: Number, dependsOn: {showInMenu: true}, default: 0},
  content: {type: Types.Html, wysiwyg: false},
});

StaticPage.register();

export default StaticPage;
