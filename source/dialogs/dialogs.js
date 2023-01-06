class Dialogs {
  constructor() {
    this.petros = new p5.Speech(); // speech synthesis object
    this.player = new p5.Speech();
    this.devil = new p5.Speech();
    this.player.setVoice("Google UK English Female");
    this.player.setLang("en-GB");
    this.petros.setVoice("Google US English");
    this.petros.setLang("en-US");
    this.devil.setVoice("Microsoft Zira Desktop - English (United States)");
    this.devil.setLang("en-US");
  }

  tell(talker, text) {
    if (talker == "devil") {
      this.devil.speak(dialogs_info[text]);
    } else if (talker == "petros") {
      this.petros.speak(dialogs_info[text]);
    } else if (talker == "player") {
      this.player.speak(dialogs_info[text]);
    } else if (talker == "informer") {
      this.petros.speak(dialogs_info[text]);
    }
  }

}
