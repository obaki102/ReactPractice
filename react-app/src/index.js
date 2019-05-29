import React from "react";
import ReactDOM from "react-dom";

const element = <h1> Hello World </h1>;

console.log(element);
ReactDOM.render(element, document.getElementById("root"));

function StopWatch() {
  let duration = 0;
  let stopFlag = false;

  this.start = function() {
    if (duration > 0) {
      throw new Error("Stopwatch already started");
    } else {
      while (stopFlag) {
        duration++;
      }
    }
  };

  this.stop = function() {
    stopFlag = true;
  };

  Object.defineProperty(this, "default", {
    get: function() {
      return duration;
    }
  });

  this.reset = function() {
    duration = 0;
    stopFlag = false;
  };
}

const sw = new StopWatch();
sw.start();
console.log(sw.duration);
