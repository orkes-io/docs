import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import styles from "./AccordionWithImg.module.css";
function AccordionWithImg({ data }) {
    const [currentDropdown, setCurrentDropdown] = useState(null);
    const handleDropdown = (item) => {
        if (currentDropdown && currentDropdown.title == item.title) {
            setCurrentDropdown(null);
            return;
        }
        setCurrentDropdown(item);
    };
    return (
        <div>
            <div className="row margin-vert--lg">
                <div className="col">
                    {data &&
                        data.map((item, index) => (
                            <div
                                className={styles.singleAccordion}
                                key={index}
                                onClick={() => handleDropdown(item)}
                            >
                                <div className={styles.header}>
                                    <div
                                        className={
                                            currentDropdown &&
                                            currentDropdown.title == item.title
                                                ? styles.titleActive
                                                : ""
                                        }
                                    >
                                        {item.title}
                                    </div>
                                    <div className={styles.arrowIcon}>
                                        <FontAwesomeIcon
                                            style={{
                                                fontSize: 20,
                                                color: "#828282",
                                            }}
                                            icon={
                                                currentDropdown &&
                                                currentDropdown.title ==
                                                    item.title
                                                    ? faAngleUp
                                                    : faAngleDown
                                            }
                                        />
                                    </div>
                                </div>
                                {currentDropdown &&
                                    currentDropdown.title == item.title && (
                                        <div>{item.description}</div>
                                    )}
                            </div>
                        ))}
                </div>
                <div className="col">
                    <div className={styles.imageCol}>
                        {currentDropdown !== null && (
                            <img src={currentDropdown.image} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionWithImg;
