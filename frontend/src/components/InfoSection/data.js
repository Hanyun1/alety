import discoverSVG from '../../images/discover.svg'
import signUp from '../../images/sign_up.svg'

export const homeObject1 = {
    id: 'discover',
    btn: "functions",
    lightBackground: false,
    lightText: true,
    lightTextDescription: true,
    topLine: 'Explore Alety',
    headline:  'Alety is not as simple as a CRM',
    description: "Alety doesn't just help to organie your contacts, it also helps to track your activities, send emails to your contacts, set up a reminder and many more! More functionalities are awaiting your discovery!",
    buttonLabel: 'Learn More',
    imgStart: true,
    dark: true,
    primary: true,
    darkText: false,
    img: discoverSVG,
    alt: 'add friends'
};

export const homeObject2 = {
    id: 'getStarted',
    btn: "home",
    lightBackground: true,
    lightText: false,
    lightTextDescription: false,
    topLine: 'Start Using Our CRM now',
    headline:  "Haven't got an account yet? Sign up now!",
    description: "We keep your privacy secure so there is nothing to worry about. Click the Get Started icon below to start!",
    buttonLabel: 'Get Started',
    imgStart: true,
    dark: false,
    primary: false,
    darkText: true,
    img: signUp,
    alt: 'sign up image'
};

