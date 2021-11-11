import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Introduction from '../components/Home'
import InfoSection from '../components/InfoSection'
import { homeObject1, homeObject2} from '../components/InfoSection/data'
import Functions from '../components/Functions'
import Footer from '../components/Footer'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <>
            <Sidebar isOpen={isOpen} toggle = {toggle}/>
            <Navbar toggle={toggle} />
            <Introduction />
            <InfoSection {...homeObject1} />
            <Functions />
            <InfoSection {...homeObject2} />
            <Footer />
        </>
    );
};

export default Home
