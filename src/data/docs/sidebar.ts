const GET_STARTED = [
    {  
        id :1,
        title : "Introduction",
        link : "/introduction"
    },
    
    {
        id : 2,
        title : "Installation",
        link : ""    
    },
    {
        id : 3,
        title : "Créer un projet",
        link : "/new_project"
    },
    {
        id : 4,
        title : "Structure du projet",
        link:"/structure"
    }
];


const BASICS = [
    // {
    //     id: 1,
    //     title: "Routing",
    //     link: "/routing"
    // },
    {
        id: 2,
        title: "Controllers",
        link: "/controllers"
    },
    // {
    //     id: 3,
    //     title: "Middleware",
    //     link: "/middleware"
    // },
    {
        id: 4,
        title: "Body Parser",
        link: "/body-parser"
    },
    {
        id: 5,
        title: "Request",
        link: "/request"
    },
    {
        id: 6,
        title: "Response",
        link: "/response"
    },
    {
        id: 7,
        title: "Validation",
        link: "/validation"
    },
    {
        id: 8,
        title: "File Upload",
        link: "/file-upload"
    },
    {
        id: 9,
        title: "Session",
        link: "/session"
    },
    {
        id: 10,
        title: "Cookies",
        link: "/cookies"
    },
    {
        id: 11,
        title: "Exception",
        link: "/exception"
    }
];

const DATABASES = [
    {
        id: 1,
        title: "Introduction",
        link: ""
    },
    {
        id: 2,
        title: "Prisma",
        link: "/prisma"
    },
    {
        id: 3,
        title: "SQLAlchemy",
        link: "/sql_alchemy"
    },
    {
        id: 4,
        title: "SQLModel",
        link: "/sqlmodel"
    }
];

const AUTH = [
    {
        id: 1,
        title: "Introduction",
        link: "/intro"
    },
    {
        id: 2,
        title: "JWT",
        link: "/jwt"
    },
    {
        id: 3,
        title: "OAuth",
        link: "/oauth"
    }
];

const SECURITY = [
    {
        id: 1,
        title: "CORS",
        link: "/cors"
    },
    {
        id: 2,
        title: "CSRF Protection",
        link: "/csrf"
    },
    {
        id: 3,
        title: "Rate Limiting",
        link: "/rate-limit"
    }
];

const VIEWS = [
    {
        id: 1,
        title: "Templates",
        link: "/templates"
    },
    {
        id: 2,
        title: "Static Files",
        link: "/static"
    },
    {
        id: 3,
        title: "Jinja2",
        link: "/jinja"
    }
];

const WEBSOCKETS = [
    {
        id: 1,
        title: "Setup",
        link: "/setup"
    },
    {
        id: 2,
        title: "Events",
        link: "/events"
    },
    {
        id: 3,
        title: "Rooms",
        link: "/rooms"
    }
];

const TESTING = [
    {
        id: 1,
        title: "Unit Tests",
        link: "/unit"
    },
    {
        id: 2,
        title: "Integration Tests",
        link: "/integration"
    },
    {
        id: 3,
        title: "Mocking",
        link: "/mocking"
    }
];

const CLI = [
    {
        id: 1,
        title: "Introction",
        link: "/intro"
    },
    {
        id: 2,
        title: "new",
        link: "/custom"
    },
    {
        id: 3,
        title: "serve",
        link: "/run"
    }
];


const DEPLOYMENT = [
    {
        id: 1,
        title: "Production",
        link: "/production"
    },
    {
        id: 2,
        title: "Docker",
        link: "/docker"
    },
    {
        id: 3,
        title: "CI/CD",
        link: "/cicd"
    }
];
const COMMUNITY = [
    {
        id: 1,
        title: "Guide de contribution",
        link: "/contributing"
    }
]
// SIDE BAR
const SIDE_BAR = [
    {
        label: "Commencer",
        link : "/docs/started",
        children : GET_STARTED
    },
    // {
    //     label: "Concepts",
    //     link : "/docs/concepts",
    //     children : CONCEPTS
    // },
    {
        label: "Basics",
        link : "/docs/basics",
        children : BASICS
    },
    {
        label: "Database",
        link : "/docs/database",
        children : DATABASES
    },
    {
        label: "Authentification",
        link : "/docs/authentification",
        children : AUTH
    },
    {
        label: "Security",
        link : "/docs/security",
        children : SECURITY
    },
    {
        label: "Views",
        link : "/docs/views",
        children : VIEWS
    },
    {
        label: "WebSockets",
        link : "/docs/websockets",
        children : WEBSOCKETS
    },
    {
        label: "Testing",
        link : "/docs/testing",
        children : TESTING
    },
    {
        label: "CLI",
        link : "/docs/cli",
        children : CLI
    },
    {
        label: "Deploiment",
        link : "/docs/deploy",
        children : DEPLOYMENT
    },
    {
        label: "communauté",
        link : "/docs/community",
        children : COMMUNITY
    }
];

export {SIDE_BAR}
