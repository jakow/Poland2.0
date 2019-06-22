export type TicketControl = {
    onSale: boolean;
    salesDate: string;
    description: string;
    showCountdown: boolean;
}

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
    showPreviousSponsors: boolean;
    showAgenda: boolean;
    ticketControl: TicketControl;
} & Urls;

export default ContentControl;
