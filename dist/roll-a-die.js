(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rollADie = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function verifyParams(options) {
  var numberDice = options.numberDice,
      callback = options.callback,
      element = options.element;

  if (!element) throw 'Element to render dice animation not specified!';
  if (!numberDice) throw 'Number of dice to use not specified';
  if (!callback) throw 'Provide a callback function to recieve dice values';
}

function playSound(outerContainer) {
  var played = void 0;
  var audio = document.createElement('audio');
  outerContainer.appendChild(audio);
  audio.src = '../dist/nc93322.mp3';
  played = true;
  audio.play();
}

function getFace(pips) {
  var XMLNS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(XMLNS, 'svg');
  svg.setAttribute('class', 'dice-face');
  svg.setAttribute('width', 32);
  svg.setAttribute('height', 32);

  pips.map(function (pip) {
    var circle = document.createElementNS(XMLNS, 'circle');
    Object.keys(pip).forEach(function (key) {
      return circle.setAttribute(key, pip[key]);
    });
    return circle;
  }).forEach(function (circle) {
    return svg.appendChild(circle);
  });

  return svg;
};

function appendDieContainers(dieId, element, angle) {
  var outer = document.createElement('div');
  outer.className = 'dice-outer';
  outer.id = dieId;
  element.appendChild(outer);

  var dice = document.createElement('div');
  dice.className = 'dice';
  dice.style.transform = 'rotateX(' + angle[0] + 'deg) rotateZ(' + angle[1] + 'deg)';
  outer.appendChild(dice);
  return dice;
}

function removeDieFromDOM(dieId) {
  var removeElement = document.getElementById(dieId);
  removeElement.remove();
}

var rollADie = function rollADie(options) {
  var numberDice = options.numberDice,
      callback = options.callback,
      element = options.element;

  verifyParams(options);
  var faces = 6;
  var result = [];
  playSound(element);

  var _loop = function _loop(i) {
    var dieFace = Math.floor(Math.random() * 6) + 1;
    result.push(dieFace);
    var angle = {
      1: [90, 0],
      2: [0, 90],
      3: [180, 0],
      4: [0, 0],
      5: [0, -90],
      6: [-90, 0]
    }[dieFace];
    var dieId = i + '-' + dieFace;
    var dice = appendDieContainers(dieId, element, angle);
    [[{ cx: 16, cy: 16, r: 6, fill: 'red' }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 16, cy: 16, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }], [{ cx: 8, cy: 8, r: 3 }, { cx: 24, cy: 24, r: 3 }, { cx: 8, cy: 16, r: 3 }, { cx: 24, cy: 16, r: 3 }, { cx: 8, cy: 24, r: 3 }, { cx: 24, cy: 8, r: 3 }]].map(getFace).forEach(function (face) {
      return dice.appendChild(face);
    });
    //Todo: Remove existing dice elements before appending new ones. In cases where user calls rollDice in quick succesion
    setTimeout(function () {
      return removeDieFromDOM(dieId);
    }, 3000);
  };

  for (var i = 0; i < numberDice; i++) {
    _loop(i);
  }
  if (callback) {
    callback(result);
  }
};

module.exports = rollADie;

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9yb2xsLWEtZGllLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsU0FBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQUEsTUFDckIsVUFEcUIsR0FDYSxPQURiLENBQ3JCLFVBRHFCO0FBQUEsTUFDVCxRQURTLEdBQ2EsT0FEYixDQUNULFFBRFM7QUFBQSxNQUNDLE9BREQsR0FDYSxPQURiLENBQ0MsT0FERDs7QUFFN0IsTUFBSSxDQUFDLE9BQUwsRUFBYyxNQUFNLGlEQUFOO0FBQ2QsTUFBSSxDQUFDLFVBQUwsRUFBaUIsTUFBTSxxQ0FBTjtBQUNqQixNQUFJLENBQUMsUUFBTCxFQUFlLE1BQU0sb0RBQU47QUFDaEI7O0FBRUQsU0FBUyxTQUFULENBQW1CLGNBQW5CLEVBQW1DO0FBQ2pDLE1BQUksZUFBSjtBQUNBLE1BQU0sUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDtBQUNBLGlCQUFlLFdBQWYsQ0FBMkIsS0FBM0I7QUFDQSxRQUFNLEdBQU4sR0FBWSxxQkFBWjtBQUNBLFdBQVMsSUFBVDtBQUNBLFFBQU0sSUFBTjtBQUNEOztBQUVELFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUF1QjtBQUNyQixNQUFNLFFBQVEsNEJBQWQ7QUFDQSxNQUFNLE1BQU0sU0FBUyxlQUFULENBQXlCLEtBQXpCLEVBQWdDLEtBQWhDLENBQVo7QUFDQSxNQUFJLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsV0FBMUI7QUFDQSxNQUFJLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsRUFBMUI7QUFDQSxNQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsRUFBM0I7O0FBRUEsT0FBSyxHQUFMLENBQVMsVUFBVSxHQUFWLEVBQWU7QUFDdEIsUUFBTSxTQUFTLFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQyxRQUFoQyxDQUFmO0FBQ0EsV0FBTyxJQUFQLENBQVksR0FB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LFdBQUwsQ0FBaUIsSUFBakIsQ0FBUjtBQUFBLEtBUHZCO0FBUUE7QUFDQSxlQUFXO0FBQUEsYUFBTSxpQkFBaUIsS0FBakIsQ0FBTjtBQUFBLEtBQVgsRUFBMEMsSUFBMUM7QUE3QmdDOztBQU9sQyxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBcEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFBQSxVQUE1QixDQUE0QjtBQXVCcEM7QUFDRCxNQUFJLFFBQUosRUFBYztBQUNaLGFBQVMsTUFBVDtBQUNEO0FBQ0YsQ0FsQ0Q7O0FBb0NBLE9BQU8sT0FBUCxHQUFpQixRQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdmVyaWZ5UGFyYW1zKG9wdGlvbnMpIHtcbiAgY29uc3QgeyBudW1iZXJEaWNlLCBjYWxsYmFjaywgZWxlbWVudCB9ID0gb3B0aW9ucztcbiAgaWYgKCFlbGVtZW50KSB0aHJvdyAnRWxlbWVudCB0byByZW5kZXIgZGljZSBhbmltYXRpb24gbm90IHNwZWNpZmllZCEnXG4gIGlmICghbnVtYmVyRGljZSkgdGhyb3cgJ051bWJlciBvZiBkaWNlIHRvIHVzZSBub3Qgc3BlY2lmaWVkJztcbiAgaWYgKCFjYWxsYmFjaykgdGhyb3cgJ1Byb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvbiB0byByZWNpZXZlIGRpY2UgdmFsdWVzJztcbn1cblxuZnVuY3Rpb24gcGxheVNvdW5kKG91dGVyQ29udGFpbmVyKSB7XG4gIGxldCBwbGF5ZWQ7XG4gIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbiAgb3V0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoYXVkaW8pO1xuICBhdWRpby5zcmMgPSAnLi4vZGlzdC9uYzkzMzIyLm1wMyc7XG4gIHBsYXllZCA9IHRydWU7XG4gIGF1ZGlvLnBsYXkoKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmFjZShwaXBzKSB7XG4gIGNvbnN0IFhNTE5TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoWE1MTlMsICdzdmcnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGljZS1mYWNlJyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMzIpO1xuICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMik7XG5cbiAgcGlwcy5tYXAoZnVuY3Rpb24gKHBpcCkge1xuICAgIGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhYTUxOUywgJ2NpcmNsZScpO1xuICAgIE9iamVjdC5rZXlzKHBpcCkuZm9yRWFjaChrZXkgPT4gY2lyY2xlLnNldEF0dHJpYnV0ZShrZXksIHBpcFtrZXldKSk7XG4gICAgcmV0dXJuIGNpcmNsZTtcbiAgfSkuZm9yRWFjaChjaXJjbGUgPT4gc3ZnLmFwcGVuZENoaWxkKGNpcmNsZSkpO1xuXG4gIHJldHVybiBzdmc7XG59O1xuXG5mdW5jdGlvbiBhcHBlbmREaWVDb250YWluZXJzKGRpZUlkLCBlbGVtZW50LCBhbmdsZSkge1xuICBjb25zdCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBvdXRlci5jbGFzc05hbWUgPSAnZGljZS1vdXRlcic7XG4gIG91dGVyLmlkID0gZGllSWQ7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuXG4gIGNvbnN0IGRpY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGljZS5jbGFzc05hbWUgPSAnZGljZSc7XG4gIGRpY2Uuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHthbmdsZVswXX1kZWcpIHJvdGF0ZVooJHthbmdsZVsxXX1kZWcpYDtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoZGljZSk7XG4gIHJldHVybiBkaWNlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEaWVGcm9tRE9NKGRpZUlkKSB7XG4gIGNvbnN0IHJlbW92ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWVJZCk7XG4gIHJlbW92ZUVsZW1lbnQucmVtb3ZlKCk7XG59XG5cbmNvbnN0IHJvbGxBRGllID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgY29uc3QgeyBudW1iZXJEaWNlLCBjYWxsYmFjaywgZWxlbWVudCB9ID0gb3B0aW9ucztcbiAgdmVyaWZ5UGFyYW1zKG9wdGlvbnMpO1xuICBjb25zdCBmYWNlcyA9IDY7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICBwbGF5U291bmQoZWxlbWVudCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJEaWNlOyBpKyspIHtcbiAgICBjb25zdCBkaWVGYWNlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xuICAgIHJlc3VsdC5wdXNoKGRpZUZhY2UpO1xuICAgIGNvbnN0IGFuZ2xlID0ge1xuICAgICAgMTogWzkwLCAwXSxcbiAgICAgIDI6IFswLCA5MF0sXG4gICAgICAzOiBbMTgwLCAwXSxcbiAgICAgIDQ6IFswLCAwXSxcbiAgICAgIDU6IFswLCAtOTBdLFxuICAgICAgNjogWy05MCwgMF0sXG4gICAgfVtkaWVGYWNlXTtcbiAgICBjb25zdCBkaWVJZCA9IGAke2l9LSR7ZGllRmFjZX1gO1xuICAgIGNvbnN0IGRpY2UgPSBhcHBlbmREaWVDb250YWluZXJzKGRpZUlkLCBlbGVtZW50LCBhbmdsZSk7XG4gICAgW1xuICAgICAgW3sgY3g6IDE2LCBjeTogMTYsIHI6IDYsIGZpbGw6ICdyZWQnIH1dLFxuICAgICAgW3sgY3g6IDgsIGN5OiA4LCByOiAzIH0sIHsgY3g6IDI0LCBjeTogMjQsIHI6IDMgfV0sXG4gICAgICBbeyBjeDogOCwgY3k6IDgsIHI6IDMgfSwgeyBjeDogMTYsIGN5OiAxNiwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDI0LCByOiAzIH1dLFxuICAgICAgW3sgY3g6IDgsIGN5OiA4LCByOiAzIH0sIHsgY3g6IDI0LCBjeTogMjQsIHI6IDMgfSwgeyBjeDogOCwgY3k6IDI0LCByOiAzIH0sIHsgY3g6IDI0LCBjeTogOCwgcjogMyB9XSxcbiAgICAgIFt7IGN4OiA4LCBjeTogOCwgcjogMyB9LCB7IGN4OiAxNiwgY3k6IDE2LCByOiAzIH0sIHsgY3g6IDI0LCBjeTogMjQsIHI6IDMgfSwgeyBjeDogOCwgY3k6IDI0LCByOiAzIH0sIHsgY3g6IDI0LCBjeTogOCwgcjogMyB9XSxcbiAgICAgIFt7IGN4OiA4LCBjeTogOCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDI0LCByOiAzIH0sIHsgY3g6IDgsIGN5OiAxNiwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDE2LCByOiAzIH0sIHsgY3g6IDgsIGN5OiAyNCwgcjogMyB9LCB7IGN4OiAyNCwgY3k6IDgsIHI6IDMgfV1cbiAgICBdLm1hcChnZXRGYWNlKS5mb3JFYWNoKGZhY2UgPT4gZGljZS5hcHBlbmRDaGlsZChmYWNlKSk7XG4gICAgLy9Ub2RvOiBSZW1vdmUgZXhpc3RpbmcgZGljZSBlbGVtZW50cyBiZWZvcmUgYXBwZW5kaW5nIG5ldyBvbmVzLiBJbiBjYXNlcyB3aGVyZSB1c2VyIGNhbGxzIHJvbGxEaWNlIGluIHF1aWNrIHN1Y2Nlc2lvblxuICAgIHNldFRpbWVvdXQoKCkgPT4gcmVtb3ZlRGllRnJvbURPTShkaWVJZCksIDMwMDApO1xuICB9XG4gIGlmIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcm9sbEFEaWU7XG4iXX0=
