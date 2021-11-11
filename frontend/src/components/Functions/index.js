import React from 'react';
import Icon1 from '../../images/add_friends.svg';
import Icon2 from '../../images/memories.svg';
import Icon3 from '../../images/task.svg';
import Icon4 from '../../images/emails.svg';
import { FunctionsContainer, FunctionsH1, FunctionsWrapper, FunctionsCard, FunctionsH2, FunctionsP, FunctionsIcon } from './FunctionsElement';

const Functions = () => {
    return (
        <>
           <FunctionsContainer id='functions'>
                <FunctionsH1>Our Functions</FunctionsH1>
                <FunctionsWrapper>
                    <FunctionsCard>
                        <FunctionsIcon src={Icon1}/>
                        <FunctionsH2>Edit Your Contacts</FunctionsH2>
                        <FunctionsP>Alety allows you to insert or delet multiple contacts at one time, so you don't need to do it one by one!</FunctionsP>
                    </FunctionsCard>
                    <FunctionsCard>
                        <FunctionsIcon src={Icon2}/>
                        <FunctionsH2>Record Your Events</FunctionsH2>
                        <FunctionsP>Alety allows you to keep a record of your events so that you will never forget to meet up with your friends!</FunctionsP>
                    </FunctionsCard>
                    <FunctionsCard>
                        <FunctionsIcon src={Icon3}/>
                        <FunctionsH2>Set Up a Reminder</FunctionsH2>
                        <FunctionsP>Afraid of missing an event? Alety got you back! Set up a reminder to remind yourself when the date is approaching! </FunctionsP>
                    </FunctionsCard>
                    <FunctionsCard>
                        <FunctionsIcon src={Icon4}/>
                        <FunctionsH2>Send Emails</FunctionsH2>
                        <FunctionsP>An amazing idea comes up in your mind suddenly and want to inform your friends straight away? </FunctionsP>
                    </FunctionsCard>
                </FunctionsWrapper>
            </FunctionsContainer> 
        </>
    )
}

export default Functions
