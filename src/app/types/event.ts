export type AppEvent = {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    city: string;
    venue: string;
    hostedBy: string;
    attendees: Attendee[];
    hostPhotoURL: string;
}

export type Attendee = {
    id: string;
    name: string;
    photoURL: string;
}