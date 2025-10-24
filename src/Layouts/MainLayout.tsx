import {Outlet} from "react-router";
import {HeaderComponent} from "../Components/HeaderComponent/HeaderComponent.tsx";

export const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};