class Dialogs {
  constructor() {
    var petros = new p5.Speech(); // speech synthesis object
    var player = new p5.Speech();
    var devil = new p5.Speech();
    var informer = new p5.Speech();
    player.setVoice("Google UK English Female");
    player.setLang("en-GB");
    petros.setVoice("Google US English");
    petros.setLang("en-US");
    devil.setVoice("Microsoft David Desktop - English (United States)");
    informer.setVoice("Microsoft Zira Desktop - English (United States)")
  }

  setup() {
    this.dset = loadJSON("dialogset.json");
    noLoop();
  }

  tell(talker, text) {
    if (talker == "devil") {
      devil.speak(dialogs_info[text]);
      text(dialogs_info[text], 10, 30);
    } else if (talker == "petros") {
      petros.speak(dialogs_info[text]);
      text(dialogs_info[text], 10, 30);
    } else if (talker == "player") {
      player.speak(dialogs_info[text]);
      text(dialogs_info[text], 10, 30);
    } else if (talker == "informer") {
      informer.speak(dialogs_info[text]);
      text(dialogs_info[text], 10, 30);
    }
  }

}
