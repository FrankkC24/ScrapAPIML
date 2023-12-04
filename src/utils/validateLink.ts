export const validateSpotifyLink = (link: string): { isValid: boolean; message: string; spotifyInviteLink: string } => {

    const spotifyLinkRegex: RegExp = /https:\/\/www\.spotify\.com\/[a-z]{2}\/family\/join\/.*/;
    const match = link.match(spotifyLinkRegex);

    if (!match?.[0]) {
        return { isValid: false, message: 'No se encontró un enlace de invitación de Spotify válido.', spotifyInviteLink: 'Enlace no definido/ingresado.' };
    }

    return { isValid: true, message: 'Enlace de Spotify válido.', spotifyInviteLink: match[0] };
};

