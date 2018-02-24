import React from 'react';


class Nav extends React.Component {
    
    render() {
        
        return (
            <div className='Header'>
                <div class="carousel carousel-slider center blue-grey lighten-2" data-indicators="true">
                <div class="carousel-fixed-item center">
                  <a class="btn waves-effect white grey-text darken-text-2" href="#contactMe">Contact Me</a>
                </div>
                <div class="white-text" href="#one!">
                <img src="http://loserigne.me/images/profile.png" height={200} alt="" class="circle"/>
                  <h3>Serigne Lo</h3>
                  <p class="">Software Developer.</p>
                </div>
              </div>
            </div>
        )
    }
}

export default Nav;