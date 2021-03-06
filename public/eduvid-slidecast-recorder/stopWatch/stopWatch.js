/**
 * Created by narendra on 5/4/15.
 */


pitana.register({
  tagName: "Stop-Watch",
  accessors: {
    autoStart: {
      type: "boolean",
      default: false
    }
  },
  methods: ["start", "stop", "pause", "resume", "getTime"],
  createdCallback: function() {
    this.watch = new StopWatchClass();
  },
  attachedCallback: function() {
    this.$.textContent = "00:00";
    if (this.$.autoStart === true) {
      this.start();
    }
  },
  pause: function() {
    this.watch.pause();
    window.clearInterval(this.id);
    this.id = undefined;
  },
  resume: function() {
    this.watch.resume();
    this.startInterval();
  },
  startInterval: function() {
    var self = this;
    this.id = window.setInterval(function() {
      self.$.textContent = self.convertToTime(self.watch.getTime());
    }, 500);
  },
  start: function() {
    this.watch.start();
    var self = this;
    if (this.id !== undefined) {
      window.clearInterval(this.id);
    }
    this.$.textContent = "00:00";
    this.startInterval();
  },
  convertToTime: function(ms) {
    var s = Math.floor(ms / 1000);
    return this.appendFrontZero(Math.floor(s / 60)) + ":" + this.appendFrontZero(s % 60);
  },
  appendFrontZero: function(n) {
    if (n < 10) {
      return "0" + n;
    } else {
      return n;
    }
  },
  stop: function() {
    this.watch.stop();
    window.clearInterval(this.id);
    this.id = undefined;
  },
  getTime: function() {
    return this.watch.getTime();
  },
  detachedCallback: function() {
    this.stop();
  }
});
