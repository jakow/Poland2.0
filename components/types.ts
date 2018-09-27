import {
  SpeakerCategory,
  Speaker as SpeakerModel,
  SponsorCategory as SponsorCategoryModel,
  Sponsor as SponsorModel,
  TeamMember as TeamMemberModel
} from '../models';

type MarkdownDescription = { description: { md: string } };
export type Speaker = (SpeakerModel & MarkdownDescription);
export type SpeakerCategories = (SpeakerCategory & { speakers: Speaker[] })[];
export type Sponsor = (SponsorModel & MarkdownDescription);
export type SponsorCategories = (SponsorCategoryModel & { sponsors: Sponsor[] })[];
export type TeamMember = (TeamMemberModel & MarkdownDescription);
