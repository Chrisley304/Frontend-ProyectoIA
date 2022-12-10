import React from "react";
import { Modal, Loading} from "@nextui-org/react";

export const LoadingModal = ({visible}) => {

    return (
        <Modal
            aria-labelledby="loading-modal"
            open={visible}
            preventClose
            css={{ w: "fit-content", marginLeft: "auto", marginRight: "auto" }}
        >
            <Modal.Body>
                <Loading />
            </Modal.Body>
        </Modal>
    );
};
