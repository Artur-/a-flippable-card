/**
`<flippable-card>` is a game card element. The card can be flipped showing its back or front face. The front face shows an image.

Example:

    <flippable-card back="https://upload.wikimedia.org/wikipedia/commons/8/87/Card_back_05.svg" front="https://media.apnarm.net.au/media/images/2018/12/13/b881722048z1_20181213203522_000g7l1btgf33-0-jx1usssqa0wjz8wbgr2.jpg"></flippable-card>

@demo demo/index.html
*/
import { html } from "../@polymer/polymer/polymer-legacy.js";

import { PolymerElement } from "../@polymer/polymer/polymer-element.js";
class ImageCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          font-size: 34px;
          height: 264px; /* 88 * 3 */
          width: 186px; /* 62 * 3 */

          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Chrome/Safari/Opera */
          -khtml-user-select: none; /* Konqueror */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently not supported by any browser */
        }

        :host * {
          box-sizing: border-box;
        }

        #container {
          position: relative;
          height: 100%;
          width: 100%;

          /* entire container, keeps perspective */
          perspective: 1000px;
        }

        #front,
        #back {
          /* flip speed goes here */
          transition: transform 0.6s;
        }

        #back {
          /* back, initially hidden pane */
          transform: rotateY(-180deg);
        }

        /* flip the pane when hovered */
        :host([unrevealed]) #back {
          transform: rotateY(0deg);
        }
        :host([unrevealed]) #front {
          transform: rotateY(180deg);
        }

        #front,
        #back {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        #front,
        #back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          border-radius: 4%;
          background: #fff;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          top: 0;
          left: 0;
        }
        .highlighted #front {
          background-color: rgba(255, 150, 150, 1);
        }
        #back {
          padding: 4%;
        }

        #back-draw {
          height: 100%;
          width: 100%;
          border-radius: 4%;
          background-color: #8fa0b5;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: 50%;
        }

        /* front pane, placed above back */
        #front {
          z-index: 2;
          /* for firefox 31 */
          transform: rotateY(0deg);
          border: 1px solid grey;
        }

        .reversed {
          transform: rotateZ(180deg);
        }

        .figure {
          width: 100%;
          height: 100%;
        }
      </style>

      <div id="container">
        <div id="front">
          <img class="figure" src="[[front]]" />
        </div>
        <div id="back">
          <img class="figure" src="[[back]]" />
        </div>
      </div>
    `;
  }

  static get is() {
    return "flippable-card";
  }

  static get properties() {
    return {
      /* Tells whether the card show its front or back face. */
      unrevealed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /* Tells whether the card is highlighted ("selected") or not. */
      highlighted: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "_highlightedChanged"
      },
      back: {
        type: String,
        value:
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Card_back_05.svg"
      },
      front: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this._flip = this.flip.bind(this);
  }

  flip() {
    this.unrevealed = !this.unrevealed;
    return new Promise((resolve, reject) => {
      this.shadowRoot
        .querySelector("#back")
        .addEventListener("transitionend", e => {
          resolve();
        });
    });
  }

  _highlightedChanged(highlighted) {
    this.$.container.classList.toggle("highlighted", highlighted);
  }
}

customElements.define(ImageCard.is, ImageCard);
