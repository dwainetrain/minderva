"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const fi_1 = require("react-icons/fi");
/* Audio playback component */
const PlayAudio = ({ side, source, type = 'link' }) => {
    const playAudio = (side) => {
        const audioURL = document.getElementsByClassName(side)[0];
        // audioURL.playbackRate = 0.5;
        audioURL.play();
    };
    return (react_1.default.createElement("figure", null,
        react_1.default.createElement("audio", { className: side, src: source },
            "Your browser does not support the",
            react_1.default.createElement("code", null, "audio"),
            " element."),
        type === 'button' ?
            react_1.default.createElement(react_2.Button, { variant: "link", size: "md", onClick: () => playAudio(side) },
                react_1.default.createElement(react_2.Box, { as: fi_1.FiVolume2, size: "24px", mr: 3 }),
                react_1.default.createElement(react_2.Text, null, "Play Audio"))
            : react_1.default.createElement(react_2.Button, { variant: "link", size: "md", onClick: () => playAudio(side) },
                react_1.default.createElement(react_2.Box, { as: fi_1.FiVolume2, size: "24px", mr: 3 }))));
};
exports.default = PlayAudio;
//# sourceMappingURL=PlayAudio.js.map