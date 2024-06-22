import {Link} from "@nextui-org/link";
import {HeartFilledIcon} from "@/components/icons";

export const MadeWith = () => {
    return (
        <div className="w-full flex items-center justify-center py-3">
            <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://gavazn.life"
                title="Homepage"
            >
                <span className="text-default-600">Made with </span>
                <HeartFilledIcon color="red"/>
                <span className="text-default-600"> By </span>
                <p className="text-foreground">Sullivan</p>
            </Link>
        </div>
    )
}
