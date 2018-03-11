import React from 'react';
import ContactForm from './mail/ContactForm';


class Footer extends React.Component {
    
    render() {
        
        return (
            <div className='Footer'>
                <footer class="page-footer blue-grey darken-4">
                <h3 class="center" id="contactMe">Contact Me</h3>
                <div class="container">
                  <ContactForm/>
                </div>
                <br/>
              </footer>
        </div>
        )
    }
}

export default Footer;