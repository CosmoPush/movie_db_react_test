import { FC } from "react";
import {Outlet} from "react-router";

export const AuthorizationLayout: FC = () => {
    return (
        <div>
            <Outlet/>

        </div>
    );
};