import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Info} from "@mui/icons-material";

const InfoPopup = () => (
  <Popup trigger={<button><Info sx={{width: 30, height: 30}} className={"text-primary rounded-full"}/></button>} modal position="right center">
    <div className={"p-3 rounded-md"}>
        <div>
            <h2 className={"text-xl"}>What is the Pret Subscription?</h2>
            <br/>
            <div  className={"text-left"}>
                <p><a className={"underline"} href={"https://www.pret.co.uk/en-GB"}>Pret A Manger</a> is a chain of coffee shops, mostly based in London. During the Pandemic they announced the <a className={"underline"} href={"https://www.pret.co.uk/en-GB/pretcoffeesub"}>Pret Coffee Subscription</a>, a £25 per month service that entitles you to 5 freshly made drinks a day. For people who drink <strong>a lot</strong> of coffee, this is a great deal.</p>
                <p>There are some stipulations with this subscription. Namely, you must wait 30 minutes between each drink that you get.</p>
            </div>

        </div>
        <br/>
        <h2 className={"text-xl"}>And what the heck is this app?</h2>
        <br/>
        <div className={"text-left"}>
            <p>If you were to share a single Pret Subscription with other people (something that Pret expressly disallows you from doing), this 30-minute cooling-off period presents some problems.</p>

            <p>You must inform each other when you are getting a coffee, so that the other sharers do not try and get a coffee with the subscription during the half-hour break. It's also a pain to coordinate who will get the next coffee, especially during a busy workday.</p>

            <p>This website aims to make it easier to share and coordinate the Pret Coffee Subscription with multiple people. It includes a timer that counts down until the subscription can be used again, a reservation button to inform others that you want the next coffee, and a counter that records the number of drinks you've had that day.</p>

            <p>This was made as a bit of fun. Feel free to give me feedback, or let me know if you have any use for it!</p>
        </div>

    </div>
  </Popup>
);

export default InfoPopup