import { redirect } from "next/navigation";

const HomePage = () => {
    const isServer = typeof window === "undefined";

    if (isServer) {
            redirect("/docs/started");
    }
    return null;
};

export default HomePage;
