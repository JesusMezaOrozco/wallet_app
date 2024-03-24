import Feedback from "@/components/Feedback";
import { LinearProgress } from "@mui/material";
import { ReactNode, createContext, useEffect, useState } from "react";

type TFeedback = {
  message: string;
  status: "success" | "error" | null;
};
type TFeedbackContext = {
  feedback: TFeedback;
  setFeedback: (feedback: TFeedback) => void;
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
};

export const FeedbackContext = createContext<TFeedbackContext>({
  feedback: {
    message: "",
    status: null,
  },
  setFeedback: () => {},
  isOpen: false,
  setIsOpen: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

type Props = {
  children: ReactNode;
};

export function FeedbackContextProvider({ children }: Props) {
  const [feedback, setFeedback] = useState<TFeedback>({
    message: "",
    status: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (feedback.message !== "") setIsOpen(true);
  }, [feedback]);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading && (
        <LinearProgress sx={{ position: "absolute", top: 0, width: "100%" }} />
      )}
      {children}
      {isOpen && <Feedback />}
    </FeedbackContext.Provider>
  );
}
