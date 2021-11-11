import React from 'react'
import { SidebarContainer, CloseIcon, Icon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElement';

const Sidebar = ( {isOpen, toggle} ) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick = {toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to = "home" onClick={toggle}>Home</SidebarLink>
                    <SidebarLink to = "discover" onClick={toggle}>Discover</SidebarLink>
                    <SidebarLink to = "signup" onClick={toggle}>Sign Up</SidebarLink>
                    <SidebarLink to = "ourteam" onClick={toggle}>Our Team</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to = "/signin">Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        
        </SidebarContainer>
    )
}

export default Sidebar;
