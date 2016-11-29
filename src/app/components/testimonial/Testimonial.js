import React from "react"
import { connect } from "react-redux";
import "./testimonial.scss"

class Testimonial extends React.Component {
	render() {
		return(
			<div className="testimonial-container">
				<div className="testimonial-wrapper">
					<p>Kris Sorbie, Redken Education Artistic Director and President
					of Kris Sorbie, Inc. has been recognized for many years as a 
					world-renowned leader in cutting-edge hair color techniques such
					as Ombré and, as an expert in the ﬁeld of long hair and 
					up-styling. She is one of the most sought-after, inﬂuential 
					color experts and educators in the hairdressing industry today.
					</p>
					<p>In 2014 she was named ‘Icon of Color’ for being the originator
					of Ombré color techniques; a prestigious honor awarded 
					to her for the ﬁrst time by Intercoiffure USA. The two-time 
					Master Stylist Winner, seven-time Nominee and Finalist of the 
					prestigious North American Hairstyling Awards (NAHA) has been 
					Lead Stylist on many New York and LA Fashion Week shows, a 
					guest speaker at TeenVogue Fashion University and for several 
					years, board member and judge for NAHA as well as many other 
					international industry awards.
					</p>
					<p>Kris has been described as passionate, creative, innovative 
					and a master. Her commitment to education drives her to travel 
					the globe to inspire stylists to create, re-imagine and push 
					themselves to the next level, all while maintaining her 
					professionalism, unique perspective and sense of humor. 
					Inventive, positive, detailed and fearless, she challenges 
					salon owners, stylists and students to see themselves and 
					the industry in new ways so they can re-deﬁne and expand their brand.
					</p>
					<p>Her education techniques are extremely powerful; stylists 
					improve their skill set, enhance their consultation skills, 
					boost retail sales and in turn their bottom line.
					</p>
					<p>This “magician of hair artistry” is clearly, one of the most 
					dynamic and inﬂuential hair stylists in the world.
					</p>
				</div>
			</div>
		);
	}
}

export default Testimonial