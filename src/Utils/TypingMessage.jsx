import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function TypingMessage() {
    const fullText = "Your notes are safe and secure!";
    const [displayedText, setDisplayedText] = useState("");
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timeout;
        if (visible && displayedText.length < fullText.length) {
            timeout = setTimeout(() => {
                setDisplayedText(fullText.slice(0, displayedText.length + 1));
            }, 50); // typing speed
        } else if (displayedText.length === fullText.length) {
            timeout = setTimeout(() => {
                setVisible(false); // trigger fade out
            }, 2000); // show for 2 seconds after complete
        }

        return () => clearTimeout(timeout);
    }, [displayedText, visible]);

    return (
        <div className="text-center ">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8 }}
                        className="text-lg font-semibold text-white"
                    >
                        {displayedText}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default TypingMessage;
