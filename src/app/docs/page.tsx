import { redirect } from "next/navigation";

export default function Redirect() {
    const isServer = typeof window === "undefined";

    if (isServer) {
            redirect("/docs/started");
    }
    return null;
}
