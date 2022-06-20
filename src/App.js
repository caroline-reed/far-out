import React from 'react';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas, fab);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleCredits = this.toggleCredits.bind(this);
  }

  toggleCredits = () => {
    if (document.getElementById("creditsPage").style.display === "block") {
      document.getElementById("creditsPage").style.display = "none";
      document.getElementById("openCredits").style.display = "block";
      document.getElementById("closeCredits").style.display = "none";
      document.getElementById("canvas").style.display = "block";
      document.getElementById("startPanel").style.display = "block";
    } else {
      document.getElementById("creditsPage").style.display = "block";
      document.getElementById("openCredits").style.display = "none";
      document.getElementById("closeCredits").style.display = "block";
      document.getElementById("canvas").style.display = "none";
      document.getElementById("startPanel").style.display = "none";
    }
  }

  // componentDidMount(props) {
  //   el.setState({
  //
  //   });
  //   // this.updateEl(props);
  // }


  render() {
    return (
        <div>
    			<section className="container grid" id="mainWindow">
    				<h1 className="griditem-main">FarOut</h1>

            <section id="gameWindow">
              <canvas id="canvas" className="griditem-main"
                width="800" height="400">
                Your browser does not support HTML5
              </canvas>

              <div id="creditsPage">
                <h2>CREDITS</h2>

                <div id="designDetails">
                  <h3>Game created by Caroline Reed using</h3>
                  <ul id="gameLangs">
                    <li key="lang01"><FontAwesomeIcon icon={['fab', 'html5']} />{' '}HTML5</li>
                    <li key="lang02"><FontAwesomeIcon icon={['fab', 'css3-alt']} />{' '}CSS3</li>
                    <li key="lang03"><FontAwesomeIcon icon={['fab', 'js']} />{' '}JavaScript</li>
                    <li key="lang04"><FontAwesomeIcon icon={['fab', 'react']} />{' '}React</li>
                  </ul>
                </div>

                <h3>Images Sources</h3>
                <ul id="creditsList">
                  <li key="cred1">
                    Space Probe image created by{' '}
                    <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1293175">
                    OpenClipart-Vectors</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1293175">
                    Pixabay</a>
                  </li>

                  <li key="cred2">
                    Star sky photo (background) created by{' '}
                    <a href='https://www.freepik.com/photos/star-sky'>kjpargeter</a> on <a href="https://www.freepik.com/">freepik</a>
                  </li>

                  <li key="cred3">
                    UFO image available on{' '}
                    <a href="https://www.freeiconspng.com/img/17278">freeiconspng.com</a>
                  </li>

                  <li key="cred4">
                    Stardust image created by{' '}
                    <a href="https://pixabay.com/vectors/stars-shiny-golden-christmas-152191/">
                    OpenClipart-Vectors</a> on <a href="https://www.pixabay.com/">Pixabay</a>
                  </li>

                  <li key="cred5">
                    Fireball image created by{' '}
                    <a href="https://pixabay.com/vectors/fire-flame-campfire-bonfire-warm-295155/">
                    Clker-Free-Vector-Images</a> on <a href="https://www.pixabay.com/">Pixabay</a>
                  </li>

                  <li key="cred6">
                    Donut image created by{' '}
                    <a href="https://pixabay.com/vectors/bakery-breakfast-cake-cartoon-6051314/">
                    davidswidjaja</a> on <a href="https://www.pixabay.com/">Pixabay</a>
                  </li>

                  <li key="cred7">
                    Saturn image available on{' '}
                    <a href="https://clipart.me/saturn-clip-art-42022">clipart.me</a>
                  </li>

                  <li key="cred8">
                    Cute astronaut with donut from "Game Over" page created by{' '}
                    <a href="https://www.freepik.com/free-vector/cute-astronaut-with-doughnut-cartoon-vector-icon-illustration-science-food-icon-concept-isolated-premium-vector-flat-cartoon-style_16844024.htm">
                    catalyststuff</a> on <a href="https://www.freepik.com/">freepik</a>
                  </li>
                </ul>
              </div>
            </section>

    				<section className="griditem-main" id="startPanel">
    					<button id="startButton" type="button" name="startButton">
                Start
              </button>

    					<div className="container" id="gameControls">
    						<button id="up"><FontAwesomeIcon icon={['fas', 'chevron-up']} /></button>
    						<button id="down"><FontAwesomeIcon icon={['fas', 'chevron-down']} /></button>
    						<button id="fireButton" type="button" name="fireButton">Fire</button>
                <button id="restartButton" type="button" name="restartButton">Restart</button>
                <div id="controlsXp">
        					<p><FontAwesomeIcon icon={['fas', 'chevron-up']} /> PGUP | K</p>
                  <p><FontAwesomeIcon icon={['fas', 'chevron-down']} /> PGDN | D</p>
        					<p>&#128293;FIRE | SPACEBAR </p>
        				</div>
    					</div>

              <div id="directions">
        				<p>Fly using arrow buttons [<FontAwesomeIcon icon={['fas', 'chevron-up']} />{' '}
                  <FontAwesomeIcon icon={['fas', 'chevron-down']} />]
                   or keyboard [<FontAwesomeIcon icon={['fas', 'arrow-up']} />
                  {" "}/ K, <FontAwesomeIcon icon={['fas', 'arrow-down']} /> / D].</p>
      					<p>Fire at UFOs &#128760; with "FIRE" button or SPACEBAR</p>

                <div id="eeriePoints">
                  <p> &#11088;= points{' '}|{' '}
                     &#128293; = ammo{' '}|{' '}
                     &#127849; = 1UP
                  </p>

                  <p id="eerie">...is it me, or are we moving faster?</p>
                </div>
      				</div>
    				</section>

            <section id="creditsButtonDiv">
              <button id="creditsButton"
                onClick={this.toggleCredits}>
                <span id="openCredits">Credits</span>
                <span id="closeCredits"><FontAwesomeIcon icon={['fas', 'arrow-left']} />{' '}Back</span>
              </button>
            </section>
    			</section>
        </div>
    )};
  }

export default App;
