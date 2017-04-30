import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface TeamMember {
  name: string;
  position: string;
  occupation: string;
  photo: keystone.Schema.CloudinaryImage;
  description: string;
  email: string;
  linkedin: string;
  edition: keystone.Schema.Relationship;
}

const TeamMember = new keystone.List<TeamMember>('TeamMember', {
    map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true,
  sortContext: 'Edition:team-members',
});

TeamMember.add({
  name: {type: String, required: true, initial: true},
  position: {type: String},
  occupation: {type: String},
  photo: {type: Types.CloudinaryImage, width: 400, height: 400},
  description: {type: Types.Html, wysiwyg: true},
  email: {type: Types.Email},
  linkedin: {type: Types.Url},
  // related to edition
  edition: {type: Types.Relationship, ref: 'Edition', many: true},
});

TeamMember.defaultColumns = 'name, position, edition';
TeamMember.register();

export default TeamMember;
