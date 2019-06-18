export type Urls = {
    facebookUrl: string;
    githubUrl: string;
    instagramUrl: string;
    linkedinUrl: string;
    bylawUrl: string;
    privacyPolicyUrl: string;
}

type ContentControl = {
    showSpeakers: boolean;
    showSponsors: boolean;
    showAgenda: boolean;
    ticketsOnSale: boolean;
} & Urls;

export default ContentControl;
