import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;
import * as moment from 'moment';

export interface Edition {
  year: number;
  name: string;
  current: boolean;
  description: string;
  caption: string;
  venue: {
    name: string;
    location: keystone.Schema.Location;
  };
  date: {
    start: Date;
    end: Date;
    useProvisional: boolean;
    provisionalDate: string;
  };
  mainPhoto: keystone.Schema.CloudinaryImage;
  photos: keystone.Schema.CloudinaryImage[];
  dateString?: string;
  isoString?: string;
}

export type EditionDocument = keystone.Document<Edition>;

const Edition = new keystone.List<Edition>('Edition', {
  defaultSort: '-year',
  autokey: { from: 'name', path: 'slug', unique: true }
});

Edition.add({
  year: {type: Number, required: true, initial: true, format: '0',
    default: () => new Date().getFullYear()},
  name: { type: String, required: true, initial: true },
  current: { type: Boolean, initial: true },
  description: { type: Types.Markdown, label: 'Description (use Markdown)' },
  caption: String,
  venue: {
    name: { type: String },
    location: { type: Types.Location },
  },
  date: {
    start: { type: Date, label: 'Start date (UTC)', utc: true },
    end: { type: Date, label: 'End date (UTC)', utc: true },
    useProvisional: { type: Boolean, label: 'Use provisional date' },
    provisionalDate: {
      type: String,
      label: 'Provisional date',
      dependsOn: { 'date.useProvisional': true }
    },
  },
  mainPhoto: { type: Types.CloudinaryImage },
  photos: { type: Types.CloudinaryImages }
});

Edition.schema.virtual('dateString').get(function () {
// NOTE the use of en dash instead of hyphen in dates

  const start = moment(this.date.start);
  const end = moment(this.date.end);
 // start date must always be filled
  if (start == null) {
    return '';
  }
  if (this.date.provisional) {
// provisional date - only the month and date printed
    return start.format('MMMM YYYY');
  }
  if (end.month() === start.month()) {
   // one day only
    if (start.date() === end.date()) {
      return `${start.format('D MMMM YYYY')}`;
    }
    // multiple days in a single month
    return `${start.date()}–${end.format('D MMMM YYYY')}`;
  }
// contracted months are printed - assume that the year is the same.
  return `${start.format('D MMM')}–${end.format('D MMM YYYY')}`;
});

/**
 * ISO 8601 format for the conference dates
 */
Edition.schema.virtual('isoString').get(function () {
  const edition = this as Edition;
  const start = moment(edition.date.start);
  const end = moment(edition.date.end);
  if (this.date.provisional) {
    return start.format('YYYY-MM');
  }
  if (start.isSame(end, 'day')) {
    return start.format('YYYY-MM-DD');
  }

  return `${start.format('YYYY-MM-DD')}/${end.format('YYYY-MM-DD')}`;
});

Edition.schema.methods.getRefs = function (ref: string, filters = {}) {
  if (!(typeof ref === 'string')) {
    throw new Error('[Edition schema] Ref must be a string');
  }
  return keystone.list(ref).model.find({ ...filters, edition: this.id });
};

Edition.schema.pre('save', async function (this: EditionDocument, done) {
  if (this.isModified('current') && this.current) {
    await Edition.model.findOneAndUpdate({ current: true }, { current: false });
  }
  done();
});

Edition.relationship({ path: 'speakers', ref: 'Speaker', refPath: 'edition' });
Edition.relationship({ path: 'team-members', ref: 'TeamMember', refPath: 'edition' });
Edition.relationship({ path: 'sponsors', ref: 'Sponsor', refPath: 'edition' });
Edition.relationship({ path: 'sponsor-categories', ref: 'SponsorCategory', refPath: 'edition' });
Edition.relationship({ path: 'agenda-days', ref: 'AgendaDay', refPath: 'edition' });
Edition.defaultColumns = 'name, year, current';
Edition.register();

export default Edition;
