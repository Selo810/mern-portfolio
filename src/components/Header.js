import React from 'react';


class Nav extends React.Component {
    
    render() {
        
        return (
            <div className='Header'>
                <div class="carousel carousel-slider center blue-grey lighten-4" data-indicators="true">
                
                <div class="carousel-fixed-item center">
                
                  <a class="btn waves-effect white grey-text darken-text-2" href="#contactMe">Contact Me</a>
                </div>
                <div class="black-text" href="#one!">
                <img src="https://s3.amazonaws.com/loserigne.com-files/portfolio-profile.png" height={200} alt="" class="circle"/>
                  <h4>Serigne Lo</h4>
                  
                  <h5 class='header grey-text text-darken-3'>Software Developer <br/> Advantage Platform Services, Inc.</h5>
                  
                </div>
              </div>
            </div>
        )
    }
}

export default Nav;