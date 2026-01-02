export class API {
  constructor(artist, cancion) {
    this.artist = artist;
    this.cancion = cancion;
  }
  async getLyrics() {
    const url = await fetch(`https://api.lyrics.ovh/v1/
        ${this.artist}/${this.cancion}`);

    const respuesta = await url.json();

    return {
      respuesta,
    };
  }
}
