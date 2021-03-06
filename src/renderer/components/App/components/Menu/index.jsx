import React from "react";
import {
    Disc,
    List,
    Settings,
    User,
} from "react-feather";
import styles from "./style.scss";
import MenuItem from "./components/MenuItem";
import Views from "~/constants/Views";

// later: make resizable?

const isActive = (location, view) => location.pathname.startsWith(view);

const Menu = ({
    show = true,
    onNavigate = {},
    location = { pathname: "" },
}) => (
    <div className={styles.menu}>
        <div className={(show) ? styles.container : styles.hidden}>

            <div className={styles.section}>
                <span className={styles.divider}>
                    Collections
                </span>
                <MenuItem
                    text="Artists"
                    icon={<User size={18} />}
                    onClick={onNavigate.artists}
                    active={isActive(location, Views.ARTISTS)}
                />
                <MenuItem
                    text="Albums"
                    icon={<Disc size={18} />}
                    onClick={onNavigate.albums}
                    active={isActive(location, Views.ALBUMS)}
                />
                <MenuItem
                    text="Songs"
                    icon={<List size={18} />}
                    onClick={onNavigate.songs}
                    active={isActive(location, Views.SONGS)}
                />
                <MenuItem
                    text="Settings"
                    icon={<Settings size={18} />}
                    onClick={onNavigate.settings}
                    active={isActive(location, Views.SETTINGS)}
                />
            </div>

            <div className={styles.section}>
                <span className={styles.divider}>
                    Playlists
                </span>
                <MenuItem text="Me, Myself & I" />
                <MenuItem text="New Songs" />
                <MenuItem text="Often Played" />
                <MenuItem text="Christian Mix" />
                <MenuItem text="Christmas" />
                <MenuItem text="Roadtrip" />
            </div>

        </div>
    </div>
);

export default Menu;
