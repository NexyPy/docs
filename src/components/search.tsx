import { SearchIcon } from "lucide-react";

function Search() {
    return (
        <button  className=" flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1.5 bg-gray-100 hover:bg-muted transition-colors duration-300">
            <SearchIcon size={14} />
            <code className=" text-sm tracking-tighter font-medium">ctrl k</code>
        </button>
    );
}

export default Search;