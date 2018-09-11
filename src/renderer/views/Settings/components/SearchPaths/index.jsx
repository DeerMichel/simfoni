import React from "react";
import { remote } from "electron";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Set } from "immutable";
import { Delete, Plus } from "react-feather";
import IconButton, { ButtonSize } from "~/components/IconButton";
import styles from "./style.scss";

const propTypes = {
    paths: ImmutablePropTypes.set,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
};
const defaultProps = {
    paths: Set(),
    onAdd: () => 0,
    onRemove: () => 0,
};

const addPathsDialog = (onAdd) => {
    const newPaths = remote.dialog.showOpenDialog({
        title: "Add search paths",
        properties: ["openDirectory", "multiSelections"],
    });
    if (newPaths) {
        onAdd(newPaths);
    }
};

const SearchPaths = ({ paths, onAdd, onRemove }) => (
    <div className={styles.searchpaths}>
        <div className={styles.title}>
            Search Paths
        </div>

        <div className={styles.container}>
            <div className={styles.header}>
                Search songs in:
                <IconButton
                    icon={Plus}
                    size={ButtonSize.SMALL}
                    onClick={() => addPathsDialog(onAdd)}
                />
            </div>

            {paths.map((path) => (
                <div className={styles.pathitem} key={path}>
                    {path}
                    <IconButton
                        icon={Delete}
                        size={ButtonSize.SMALL}
                        destructive
                        onClick={() => onRemove(path)}
                    />
                </div>
            ))}
        </div>
    </div>
);

SearchPaths.propTypes = propTypes;
SearchPaths.defaultProps = defaultProps;

export default SearchPaths;