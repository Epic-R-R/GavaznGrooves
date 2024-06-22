import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface Station {
    name: string;
    picture: string;
    videoId: string;
}

export interface Category {
    name: string;
    stations: Station[];
}
