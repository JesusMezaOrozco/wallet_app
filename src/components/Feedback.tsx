import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
import { FeedbackContext } from "@/providers/FeedbackProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Feedback() {
  const { isOpen, setIsOpen, feedback } = useContext(FeedbackContext);
  const handleClose = () => setIsOpen(false);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <img
            src="/images/x.svg"
            alt="close"
            className="absolute right-6 top-6 hover:cursor-pointer"
            width={16}
            height={16}
            onClick={handleClose}
          />
          <img
            src="/images/bank_note.png"
            alt="icon"
            className="m-auto mt-[30px]"
          />
          <p
            className={`${feedback.status === "success" ? "text-blue-1" : "text-red"} text-center text-[20px] font-medium`}
          >
            {feedback.status === "success"
              ? "Transacción exitosa :)"
              : "Hubo un error :("}
          </p>
          <p className="text-center mt-10">{feedback.message}</p>
        </Box>
      </Fade>
    </Modal>
  );
}
