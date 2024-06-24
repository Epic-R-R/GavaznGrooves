import {Link} from "@nextui-org/link";
import {HeartFilledIcon} from "@/components/icons";
import {siteConfig} from "@/config/site";

export const MadeWith = () => {
    return (
        <div className="w-full flex items-center justify-center py-3">
            <Link
                isExternal
                color="foreground"
                className="flex items-center gap-1 text-current"
                href={siteConfig.links.twitter}
                title="Twitter Sullivan"
            >
                <span>Made with </span>
                <HeartFilledIcon color="red"/>
                <span> By </span>
                <p className="text-foreground">Sullivan</p>
            </Link>
        </div>
    )
}
