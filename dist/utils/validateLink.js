"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSpotifyLink = void 0;
const validateSpotifyLink = (link) => {
    const spotifyLinkRegex = /https:\/\/www\.spotify\.com\/[a-z]{2}\/family\/join\/.*/;
    const match = link.match(spotifyLinkRegex);
    if (!match?.[0]) {
        return { isValid: false, message: 'No se encontró un enlace de invitación de Spotify válido.', spotifyInviteLink: 'Enlace no definido/ingresado.' };
    }
    return { isValid: true, message: 'Enlace de Spotify válido.', spotifyInviteLink: match[0] };
};
exports.validateSpotifyLink = validateSpotifyLink;
//# sourceMappingURL=validateLink.js.map