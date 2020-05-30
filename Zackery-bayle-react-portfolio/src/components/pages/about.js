import React from 'react';

import AboutPicture from "../../../static/assets/images/desertsky.jpg";
import ProfilePicture from "../../../static/assets/images/round-white.png";

export default function() {
    return(
        <div className="content-page-wrapper">
            <div 
                className="left-column" 
                style={{
                    background: "url("+ AboutPicture + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }} 
            
            />

            <div className="right-column">
                <img src={ProfilePicture} />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante sit amet orci ultricies hendrerit. Nulla consequat orci vel tortor dictum scelerisque. Quisque nibh urna, feugiat ut lectus ut, facilisis suscipit urna. Nam laoreet tristique arcu a porta. Pellentesque vehicula nisi massa, non vulputate felis mattis et. Fusce vestibulum lacinia urna, vitae vulputate tellus tempus ut. Fusce eget lorem et diam rutrum viverra. Sed pulvinar magna lorem, in lobortis lectus euismod vel. Suspendisse nec iaculis leo. Duis porttitor libero ut pellentesque consectetur. Proin enim ex, rutrum vitae rutrum sit amet, egestas non lorem. Nullam ac augue tincidunt, blandit lacus vitae, convallis lorem. Pellentesque tincidunt nisl odio, mollis ullamcorper dui porta eu. Nam faucibus eros a finibus bibendum. Duis ac purus sed elit malesuada bibendum. Nam gravida, magna ac laoreet accumsan, risus nunc mattis velit, id finibus augue erat id mi.
                </p>
            </div>

        </div>
    );
}